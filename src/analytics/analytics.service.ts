import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { analyticsSchema } from 'src/schema/analytics.schmea';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(analyticsSchema.name)
    private analyticsModel: Model<analyticsSchema>,
  ) {}
  //make ananlytics record
  async analyticstriiger(total: number, productname: string, quantity: number) {
    return this.analyticsModel.create({
      total,
      quantity,
      productname,
    });
  }
}
