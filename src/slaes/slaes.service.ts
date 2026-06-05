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
    @Inject('INVENTORY_SYNC') private readonly rabbitClient: ClientProxy,
  ) {}
  async createsales(productId: string, quantity: number) {
    const productprice = await this.stockModel
      .findById(productId)
      .select('price instock');
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
    this.rabbitClient.emit('reduce_stock', syncpayload);
    return newsales;
  }
}
