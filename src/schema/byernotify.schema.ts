import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { orderSchema } from './order.shcema';
@Schema({ timestamps: true })
export class buyernotificationschema extends Document {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'orderSchema', required: true })
  orderId!: orderSchema | string;
  @Prop({ required: true })
  message!: string;
}
export const buyernotifyModel = SchemaFactory.createForClass(
  buyernotificationschema,
);
