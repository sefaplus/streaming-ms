import { Inject, Module, forwardRef } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MinioModule, MinioService } from "nestjs-minio-client";

/**
 * Configured MinIO module that can be imported and used anywhere.
 *
 * Allows global access to [MinioService]. */
@Module({
  imports: [
    MinioModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (config: ConfigService) => ({
        endPoint: config.get("MINIO_HOST"),
        port: +config.get("MINIO_PORT"),
        useSSL: String(config.get("MINIO_USE_SSL")).toLowerCase() === "true",
        accessKey: config.get("MINIO_SERVER_ACCESS_KEY"),
        secretKey: config.get("MINIO_SERVER_SECRET_KEY"),
      }),
    }),
  ],
})
export class ProvidedMinioModule {}
