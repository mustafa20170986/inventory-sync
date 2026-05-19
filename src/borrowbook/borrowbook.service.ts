import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { issueborrow } from 'src/dto/borrow.dto';
import { bookSchema } from 'src/schema/books.schema';
import { borrowSchema } from 'src/schema/borrowed.schema';
import { libModel, libuserSchema } from 'src/schema/libusr.schema';

@Injectable()
export class BorrowbookService {
  constructor(
    @InjectModel(borrowSchema.name) private borrowModel: Model<borrowSchema>,
    @InjectModel(bookSchema.name) private bookModel: Model<bookSchema>,
    @InjectModel(libuserSchema.name) private libuserModel: Model<libuserSchema>,
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
  //which book borrowed by whom
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
  //who borrow which book
  async finduserbook(name: string, studentid: number) {
    //find user first
    const finduser = await this.libuserModel
      .findOne({
        name: name,
        studentid: studentid,
      })
      .exec();
    if (!finduser) {
      throw new Error('user not found');
    }
    //find wjich book they took
    const findbook = await this.borrowModel
      .find({
        borrowerId: finduser._id,
      })
      //select only those fileds
      .populate('borrowerId', 'name studentid')
      .select('borrowerId bookcount')
      .exec();
    return findbook;
  }
  //books query
  async finduserwhotakemanybook(bookscount: number) {
    const findusers = await this.borrowModel
      .find({
        bookcount: { $gte: bookscount },
      })
      //select specific field
      .populate('borrowerId', 'name studentid')
      .select('name studentid ');
    if (!findusers) {
      throw new Error(' no user found');
    }
    return findusers;
  }
}
