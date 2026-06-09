import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { orderModel, orderSchema } from 'src/schema/order.shcema';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { stockSchema, stcokModel } from 'src/schema/stock.schema';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 🔴 Ensure you use ConfigService if applicable

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: orderSchema.name, schema: orderModel },
      { name: stockSchema.name, schema: stcokModel },
    ]),

    ClientsModule.registerAsync([
      {
        name: 'SELLER_NOTIFICATION',
        imports: [ConfigModule], // Required if you use NestJS ConfigModule
        inject: [ConfigService], // Injects ConfigService to safely read environment variables
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              configService.get<string>('CLOUDAMQP_URL') ||
                'amqp://localhost:5672',
            ],

            queue: 'seller_notification_new',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],

  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
