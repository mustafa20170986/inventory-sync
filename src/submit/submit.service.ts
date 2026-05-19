import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { submitdto } from 'src/dto/submit.dto';
import { bookSchema } from 'src/schema/books.schema';
import { borrowSchema } from 'src/schema/borrowed.schema';
import { libuserSchema } from 'src/schema/libusr.schema';
import { submitSchema } from 'src/schema/submit.schema';

@Injectable()
export class SubmitService {
  constructor(
    @InjectModel(submitSchema.name) private submitModel: Model<submitSchema>,
    @InjectModel(borrowSchema.name) private borrowModel: Model<borrowSchema>,
    @InjectModel(bookSchema.name) private bookModel: Model<bookSchema>,
    @InjectModel(libuserSchema.name) private libuserModel: Model<libuserSchema>,
  ) {}
  //take submit book
  async takesubmit(dto: submitdto) {
    const { submitterId, bookname, bookcount } = dto;
    //find the student
    const findstudent = await this.libuserModel.findById(submitterId).exec();
    if (!findstudent) {
      throw new Error(' user not found');
    }
    //find book from the lib
    const findbook = await this.bookModel.findOne({ name: bookname }).exec();
    if (!findbook) {
      throw new Error(' book not found ');
    }
    //find the book in the student borrow list
    const findfromborrow = await this.borrowModel
      .findOne({
        borrowerId: submitterId,
        bookname: bookname,
      })
      .exec();
    if (!findfromborrow) {
      throw new Error('not found the book ');
    }
    //chcking the borrow stack vs the stock
    if (bookcount > findfromborrow.bookcount) {
      throw new Error(' cannot add more books ');
    }
    //update the stock in the bookstore
    await this.bookModel.findByIdAndUpdate(
      findbook._id,
      {
        $inc: { instock: bookcount },
      },
      { new: true },
    );
    //update the borrower filed book count
    await this.borrowModel.findOneAndUpdate(
      {
        borrowerId: submitterId,
        bookname: bookname,
      },
      {
        $inc: { bookcount: -bookcount },
      },
    );
    //create the history
    await this.submitModel.create({
      submitterId,
      bookname,
      bookcount,
    });
  }
}
