import { Module } from '@nestjs/common';
import { BorrowbookController } from './borrowbook.controller';
import { BorrowbookService } from './borrowbook.service';
import { MongooseModule } from '@nestjs/mongoose';
import { borrowModel, borrowSchema } from 'src/schema/borrowed.schema';
import { bookModel, bookSchema } from 'src/schema/books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: borrowSchema.name, schema: borrowModel },
      { name: bookSchema.name, schema: bookModel },
    ]),
  ],
  controllers: [BorrowbookController],
  providers: [BorrowbookService],
  exports: [BorrowbookService],
})
export class BorrowbookModule {}
