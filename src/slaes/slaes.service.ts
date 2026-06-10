import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { salesSchema } from 'src/schema/sales.schema';
import { stockSchema } from 'src/schema/stock.schema';

@Injectable()
export class SlaesService {
  constructor(
    @InjectModel(salesSchema.name) private salesModel: Model<salesSchema>,
    @InjectModel(stockSchema.name) private stockModel: Model<stockSchema>,

    // 🔴 FIXED: Injected the single shared client token instead of three different ones
    @Inject('RMQ_SERVICE') private readonly rmqClient: ClientProxy,
  ) {}

  async createsales(productId: string, quantity: number) {
    const productprice = await this.stockModel
      .findById(productId)
      .select('price instock productname');

    if (!productprice) {
      return { message: ' null product' };
    }

    if (productprice?.instock < quantity) {
      throw new Error(' not enough product there ');
    }

    const total = quantity * productprice?.price;
    const newsales = await this.salesModel.create({
      productId,
      quantity,
      total,
    });

    const syncpayload = {
      productId: productId,
      quantityBy: quantity,
    };
    // 🟢 Routes through the single client tunnel using pattern strings
    this.rmqClient.emit('reduce_stock', syncpayload);

    const analyticspayload = {
      total: total,
      productname: productprice.productname,
      quantityBy: quantity,
    };
    this.rmqClient.emit('analytics_sync', analyticspayload);

    return newsales;
  }

  //confirm order
  async confirmorder(orderId: string, productId: string, quantity: number) {
    const findproduct = await this.stockModel
      .findById(productId)
      .select('productname price instock');

    if (!findproduct) {
      throw new Error('findprouct null for confirming order ');
    }

    if (quantity > findproduct.instock) {
      throw new Error(' not enough product for confirm order');
    }

    const totalprice = quantity * findproduct.price;
    const executeorder = await this.salesModel.create({
      productId: productId,
      quantity: quantity,
      total: totalprice,
    });

    const syncpayload = {
      productId: productId,
      quantityBy: quantity,
    };
    // 🟢 All emits safely reuse the exact same rmqClient instance now!
    this.rmqClient.emit('reduce_stock', syncpayload);

    const analytics_payload = {
      total: totalprice,
      productname: findproduct.productname,
      quantityBy: quantity,
    };
    this.rmqClient.emit('analytics_sync', analytics_payload);

    const confirmed_payloadd = {
      orderId: orderId,
    };
    this.rmqClient.emit('order_queue', confirmed_payloadd);

    const notifybyer_payload = {
      orderId: orderId,
    };
    this.rmqClient.emit('buyer_notify', notifybyer_payload);

    return executeorder;
  }
}
