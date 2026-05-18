import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { issueborrow } from 'src/dto/borrow.dto';
import { bookSchema } from 'src/schema/books.schema';
import { borrowSchema } from 'src/schema/borrowed.schema';
import { libModel } from 'src/schema/libusr.schema';

@Injectable()
export class BorrowbookService {
  constructor(
    @InjectModel(borrowSchema.name) private borrowModel: Model<borrowSchema>,
    @InjectModel(bookSchema.name) private bookModel: Model<bookSchema>,
  ) {}
  //make borrow
  async bowworbook(dto: issueborrow) {
    const { name, borrowerId, bookname, bookcount } = dto;
    //find  the book if it is in stock
    const findbook = await this.bookModel
      //dont use find bcz it returns an array
      //findone returns a single object
      .findOne({ name, instock: { $gte: bookcount } })
      .exec();
    if (!findbook) {
      throw new Error(' book not found');
    }
    await this.bookModel
      //u can also use findoneAndUpdate but the updateone is more efficint
      .updateOne({ _id: findbook._id }, { $inc: { instock: -bookcount } })
      //_id: findbook._id this part finds the book id
      .exec();

    return await this.borrowModel.create({
      borrowerId: borrowerId, // Make sure this matches your schema property name exactly
      bookname: bookname,
      bookcount: bookcount,
    });
  }
  //who borrow which book
  async getuserwhoborrow(bookname: string) {
    return await this.borrowModel
      //find the user who borrow the book
      .find({ bookname: bookname })
      //just rretrun the name and count of the book
      .populate({ path: 'borrowerId', select: 'name studentid' })
      //.select('bookname bookcount')
      .select('bookname bookcount borrowerId')
      .exec();
  }
}
