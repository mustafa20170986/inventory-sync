import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addproduct } from 'src/dto/addinventory';
import { stockSchema } from 'src/schema/stock.schema';

@Injectable()
export class AddinventoryService {
  constructor(
    @InjectModel(stockSchema.name) private stockModel: Model<stockSchema>,
  ) {}
  //addinventory
  async addinventory(addto: addproduct) {
    const { productname, price, instock } = addto;
    const addprod = await this.stockModel.create(addto);
    return addprod.save();
  }
}
