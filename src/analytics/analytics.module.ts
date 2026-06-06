import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { analyticsModel, analyticsSchema } from 'src/schema/analytics.schmea';
import { AddinventoryModule } from 'src/addinventory/addinventory.module';
import { SlaesModule } from 'src/slaes/slaes.module';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: analyticsSchema.name, schema: analyticsModel },
    ]),
    AddinventoryModule,
    SlaesModule,
    ClientsModule.registerAsync([
      {
        name: 'ANALYTICS_SYNC',
        imports: [ConfigModule],
        useFactory: (ConfigService: ConfigService) => ({
          tarnsport: Transport.RMQ,
          options: {
            urls: [
              ConfigService.get<string>('CLOUDAMQP_URL') ||
                'amqp://localhost:5672',
            ],

            queue: 'analytics_sync',
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
