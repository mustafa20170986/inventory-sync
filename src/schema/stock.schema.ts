import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class stockSchema extends Document {
  @Prop({ required: true })
  productname!: string;
  @Prop({ required: true })
  price!: number;
  @Prop({ required: true })
  intock!: number;
}
export const stcokModel = SchemaFactory.createForClass(stockSchema);
