import { Module, OnModuleInit } from '@nestjs/common';
import ffmpeg from 'fluent-ffmpeg';

@Module({
  providers: [
    {
      provide: 'FFMPEG',
      useValue: ffmpeg,
    },
  ],
  imports: [],
  exports: ['FFMPEG'],
})
export class FfmpegModule {}
