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
    const { name, pages, author, instock, catagory } = dto;
    return await this.bookModel.create({
      name,
      pages,
      author,
      instock,
      catagory,
    });
  }
  //get all books
  async findallbooks() {
    const findbooks = await this.bookModel.find().exec();
    return findbooks;
  }
  //edit books
  async editbooks(dto: createbook, id: string) {
    const findthebook = await this.bookModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .exec();
    return findthebook;
  }
  //find least match
  async leastmatch(expectcatagory: string[]) {
    return this.bookModel
      .find({
        catagory: {
          $in: expectcatagory,
        },
      })
      .limit(10)
      .select('name');
  }
  //exact match
  async exactmatch(exactcatagory: string[]) {
    return this.bookModel
      .find({
        catagory: {
          $all: exactcatagory,
        },
      })
      .select('name')
      .exec();
  }
}
