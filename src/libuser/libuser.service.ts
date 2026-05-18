import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createuser } from 'src/dto/creteuser.dto';
import { libuserSchema } from 'src/schema/libusr.schema';

@Injectable()
export class LibuserService {
  constructor(
    @InjectModel(libuserSchema.name) private libuserModel: Model<libuserSchema>,
  ) {}
  //add new user
  async adduser(dto: createuser) {
    const { name, studentid } = dto;
    return await this.libuserModel.create({
      name,
      studentid,
    });
  }
  //get alluser

  async getalluser() {
    //return all usrs but only name and _id
    return await this.libuserModel.find().select('name').exec();
  }
  //delete User
  async deluser(id: string) {
    await this.libuserModel.findByIdAndDelete(id);
  }
}
