import { Module } from '@nestjs/common';
import { SlaesController } from './slaes.controller';
import { SlaesService } from './slaes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { salesModel, salesSchema } from 'src/schema/sales.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AddinventoryModule } from 'src/addinventory/addinventory.module';
import { stcokModel, stockSchema } from 'src/schema/stock.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: salesSchema.name, schema: salesModel },
      { name: stockSchema.name, schema: stcokModel },
    ]),
    AddinventoryModule,
    ClientsModule.registerAsync([
      {
        name: 'RMQ_SERVICE',
        imports: [ConfigModule],
        useFactory: (ConfigService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              ConfigService.get<string>('CLOUDAMQP_URL') ||
                'amqp://localhost:5672',
            ],
            queue: 'inventory_sync',
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [SlaesController],
  providers: [SlaesService],
  exports: [SlaesService],
})
export class SlaesModule {}
