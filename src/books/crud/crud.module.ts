import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { bookModel, bookSchema } from '../../schema/books.schema';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: bookSchema.name, schema: bookModel }]),
  ],
  controllers: [CrudController],
  providers: [CrudService],
  exports: [CrudService],
})
export class CrudModule {}
