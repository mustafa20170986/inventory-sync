import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.CLOUDAMQP_URL || 'amqp://localhost:5672'],
      queue: 'inventory_sync',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.CLOUDAMQP_URL || 'amqp://localhost:5672'],
      queue: 'seller_notification_new',
      queueOptions: {
        durable: true,
      },
      //noAck: true,
    },
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.CLOUDAMQP_URL || 'amqp://localhost:5672'],
      queue: 'buyer_notify', // 🧠 Must match the queue name in your Sales module!
      noAck: true,
      queueOptions: { durable: true },
    },
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.CLOUDAMQP_URL || 'amqp://localhost:5672'],
      queue: 'order_queue',
      noAck: true,
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
