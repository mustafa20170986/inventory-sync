import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddinventoryModule } from './addinventory/addinventory.module';
import { SlaesModule } from './slaes/slaes.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { SellernotifyController } from './sellernotify/sellernotify.controller';
import { SellernotifyModule } from './sellernotify/sellernotify.module';
import { ByernotifyController } from './byernotify/byernotify.controller';
import { ByernotifyModule } from './byernotify/byernotify.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Removed UsersController from here (it's not a module)
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),

      inject: [ConfigService],
    }),
    SlaesModule,
    AddinventoryModule,
    AnalyticsModule,
    OrderModule,
    SellernotifyModule,
    ByernotifyModule,
  ],
  controllers: [
    AppController,
    //ByernotifyController,
    // OrderController, SellernotifyController
  ],
  providers: [AppService],
})
export class AppModule {}
