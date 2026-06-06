import mongoose, { Document } from 'mongoose';
import { stockSchema } from './stock.schema';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class salesSchema extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stockSchema',
    required: true,
  })
  productId!: stockSchema | string;
  @Prop({
    required: true,
  })
  quantity!: number;
  @Prop({ required: true })
  total!: number;
}
export const salesModel = SchemaFactory.createForClass(salesSchema);
