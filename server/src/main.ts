/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsoleLogger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      timestamp: true,
    }),
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD || '',
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });
  await app.startAllMicroservices();
  app.enableCors([
    {
      origins: ['http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      enableCredentials: true,
    },
  ]);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
