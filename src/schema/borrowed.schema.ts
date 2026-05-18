import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { libuserSchema } from 'src/schema/libusr.schema';
@Schema({ timestamps: true })
export class borrowSchema extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'libuserSchema',
    required: true,
  })
  //borrowerId!: libuserSchema;
  borrowerId!: libuserSchema | Types.ObjectId | string;
  @Prop({ required: true })
  bookname!: string;
  @Prop({ required: true })
  bookcount!: number;
}
export const borrowModel = SchemaFactory.createForClass(borrowSchema);
