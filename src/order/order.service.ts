import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { createorder } from 'src/dto/order.dto';
import { orderSchema } from 'src/schema/order.shcema';
import { stockSchema } from 'src/schema/stock.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(orderSchema.name) private orderModel: Model<orderSchema>,
    @InjectModel(stockSchema.name) private stcokModel: Model<stockSchema>,
    @Inject('SELLER_NOTIFICATION') private readonly client: ClientProxy,
  ) {}
  //create the order
  async createorder(productId: string, quantity: number, company: string) {
    //find the product
    const findproduct = await this.stcokModel
      .findById(productId)
      .select('price instock productname');
    //verify quantity
    if (!findproduct?.instock) {
      throw new Error(' product in stcok is null ');
    }
    if (quantity > findproduct?.instock) {
      throw new Error(' not enough product');
    }
    //calculate total
    const totalprice = quantity * findproduct.price;
    // now place the order
    const makeorder = await this.orderModel.create({
      productId,
      productname: findproduct.productname,
      quantity: quantity,
      company: company,
      total: totalprice,
    });
    // make the payload and pulish in the seller notication queue
    const notificationpayload = {
      orderId: makeorder._id.toString(),
      ordercompany: company,
      quantity: quantity,
      productname: findproduct.productname,
    };
    //emmit the event
    console.log('emmiting event');
    this.client.emit('seller_notification_new', notificationpayload);
    return makeorder;
  }
}
