import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
@Schema({ timestamps: true })
export class analyticsSchema extends Document {
  @Prop({ required: true })
  productname!: string;
  @Prop({ required: true })
  quantity!: number;
  @Prop({ required: true })
  total!: number;
}
export const analyticsModel = SchemaFactory.createForClass(analyticsSchema);
