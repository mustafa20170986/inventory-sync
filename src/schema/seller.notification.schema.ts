import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class sellernotificationSchmea extends Document {
  @Prop({ required: true })
  orderId!: string;
  @Prop({ required: true })
  orderedcompany!: string;
  @Prop({ required: true })
  quantity!: number;
  @Prop({ required: true })
  productname!: string;
}
export const sellernotificationModel = SchemaFactory.createForClass(
  sellernotificationSchmea,
);
