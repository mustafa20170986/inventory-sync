import { Module } from '@nestjs/common';
import { LibuserController } from './libuser.controller';
import { LibuserService } from './libuser.service';
import { MongooseModule } from '@nestjs/mongoose';
import { libModel, libuserSchema } from 'src/schema/libusr.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: libuserSchema.name, schema: libModel }]),
  ],
  controllers: [LibuserController],
  providers: [LibuserService],
  exports: [LibuserService],
})
export class LibuserModule {}
