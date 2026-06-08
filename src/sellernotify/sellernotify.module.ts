import { Module } from '@nestjs/common';
import { SellernotifyService } from './sellernotify.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  sellernotificationModel,
  sellernotificationSchmea,
} from 'src/schema/seller.notification.schema';
import { SellernotifyController } from './sellernotify.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: sellernotificationSchmea.name, schema: sellernotificationModel },
    ]),

    // 🔴 CONVERTED TO REGISTER_ASYNC
  ],
  providers: [SellernotifyService],
  controllers: [SellernotifyController],
  exports: [SellernotifyService],
})
export class SellernotifyModule {}
