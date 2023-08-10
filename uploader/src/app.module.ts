import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidedMinioModule } from 'shared';
import { UploadedVideo } from './upload/entities/upload.entity';
import { kafkaConfig } from './kafka/kafka.config';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: 'transcode_db',
          username: configService.getOrThrow('DB_USER'),
          password: configService.getOrThrow('DB_PASSWORD'),
          database: configService.getOrThrow('DB_DATABASE'),
          port: 5432,
          entities: [UploadedVideo],
        };
      },
    }),
    ClientsModule.register([{ ...kafkaConfig, name: 'KAFKA_CONNECTION' }]),
    ProvidedMinioModule,
    UploadModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
