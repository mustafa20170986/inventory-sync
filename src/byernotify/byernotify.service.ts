import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { buyernotificationschema } from 'src/schema/byernotify.schema';

@Injectable()
export class ByernotifyService {
  constructor(
    @InjectModel(buyernotificationschema.name)
    private byernotificationModel: Model<buyernotificationschema>,
  ) {}
  //make the notification for byer
  async notifybyer(orderId: string) {
    return this.byernotificationModel.create({
      orderId: orderId,
      message: ' your order hasbenn placed successfully',
    });
  }
}
