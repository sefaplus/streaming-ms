import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { MinioService } from 'nestjs-minio-client';
import { tmpdir } from 'os';
import { sharedConfig } from 'shared';
import { kafkaConfig } from 'src/kafka/kafka.config';
import { Readable } from 'stream';
import { ReadStream } from 'typeorm/platform/PlatformTools';

@Controller('upload')
export class UploadController {
  @Client(kafkaConfig)
  private readonly kafkaClient: ClientKafka;

  constructor(private readonly minioService: MinioService) {}

  @Post('video')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: tmpdir(),
        filename: (_, __, cb) => cb(null, randomUUID()),
      }),
      dest: tmpdir(),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filename = randomUUID();

    await this.minioService.client.putObject(
      'pending-transcode',
      filename,
      createReadStream(file.path),
    );

    this.kafkaClient.send(sharedConfig.kafka.toTranscodeEventName, {
      filename,
      timestamp: Date.now(),
    });
  }
}
