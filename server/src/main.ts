/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConsoleLogger } from '@nestjs/common';
// import { doubleCsrf } from 'csrf-csrf';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { utils } from 'utils/constants';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      timestamp: true,
    }),
  });
  app.use(helmet());
  // app.use(doubleCsrf());
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
  const config = new DocumentBuilder()
    .setTitle("Task Vortex API")
    .setDescription('Task Vortex backend API documented using swagger')
    .setVersion('1.0')
    .addTag('Task Vortex')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.enableCors([
    {
      origins: utils.allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS','PATCH','HEAD'],
      enableCredentials: true,
    },
  ]);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
