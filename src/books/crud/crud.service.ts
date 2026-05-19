import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createbook } from 'src/dto/addbooks.dto';
import { bookSchema } from 'src/schema/books.schema';
import { Model } from 'mongoose';

@Injectable()
export class CrudService {
  constructor(
    @InjectModel(bookSchema.name) private bookModel: Model<bookSchema>,
  ) {}
  //addbooks
  async addbooks(dto: createbook) {
    const { name, pages, author, instock } = dto;
    return await this.bookModel.create({
      name,
      pages,
      author,
      instock,
    });
  }
  //get all books
  async findallbooks() {
    const findbooks = await this.bookModel.find().exec();
    return findbooks;
  }
}
