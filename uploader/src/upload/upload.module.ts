import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { tmpdir } from 'os';

@Module({
  imports: [MulterModule.register({ dest: tmpdir() })],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
