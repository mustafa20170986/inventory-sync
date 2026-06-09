import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { stockSchema } from './stock.schema';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class orderSchema extends Document {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'stockSchema', required: true })
  productId!: stockSchema | string;
  @Prop()
  productname!: string;
  @Prop({ required: true })
  quantity!: number;
  @Prop({ required: true })
  total!: number;
  @Prop({ required: true })
  company!: string;
  @Prop({ default: 'pending' })
  status!: string;
}
export const orderModel = SchemaFactory.createForClass(orderSchema);
