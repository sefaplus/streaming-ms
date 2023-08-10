import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

export const kafkaConfig = {
  transport: Transport.KAFKA as any,
  options: {
    client: {
      clientId: 'uploader_service',
      brokers: ['yt_kafka:9092'],
    },
    consumer: {
      groupId: `user.${randomUUID()}`,
      allowAutoTopicCreation: true,
      sessionTimeout: 300000,
    },
  },
};
