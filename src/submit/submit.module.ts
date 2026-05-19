import { Module } from '@nestjs/common';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { submitModel, submitSchema } from 'src/schema/submit.schema';
import { borrowModel, borrowSchema } from 'src/schema/borrowed.schema';
import { bookModel, bookSchema } from 'src/schema/books.schema';
import { libuserSchema, libModel } from 'src/schema/libusr.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: submitSchema.name, schema: submitModel },
      { name: borrowSchema.name, schema: borrowModel },
      { name: bookSchema.name, schema: bookModel },
      { name: libuserSchema.name, schema: libModel },
    ]),
  ],
  controllers: [SubmitController],
  providers: [SubmitService],
  exports: [SubmitService],
})
export class SubmitModule {}
