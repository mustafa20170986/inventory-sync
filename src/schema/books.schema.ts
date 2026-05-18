import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class bookSchema extends Document {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true })
  author!: string;
  @Prop({ required: true })
  pages!: number;
  @Prop({ required: true })
  instock!: number;
}
export const bookModel = SchemaFactory.createForClass(bookSchema);
