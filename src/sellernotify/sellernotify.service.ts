import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sellernotificationSchmea } from 'src/schema/seller.notification.schema';

@Injectable()
export class SellernotifyService {
  constructor(
    @InjectModel(sellernotificationSchmea.name)
    private sellernotificationModel: Model<sellernotificationSchmea>,
  ) {}
  //create notification
  async notifyseler(
    orderId: string,
    orderedcompany: string,
    quantity: number,
    productname: string,
  ) {
    return this.sellernotificationModel.create({
      orderId,
      orderedcompany: orderedcompany,
      quantity,
      productname,
    });
  }
}
