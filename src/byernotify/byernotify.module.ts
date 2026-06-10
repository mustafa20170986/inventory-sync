import { Module } from '@nestjs/common';
import { ByernotifyService } from './byernotify.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  buyernotificationschema,
  buyernotifyModel,
} from 'src/schema/byernotify.schema';
import { ByernotifyController } from './byernotify.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: buyernotificationschema.name, schema: buyernotifyModel },
    ]),
  ],
  providers: [ByernotifyService],
  controllers: [ByernotifyController],
  exports: [ByernotifyService],
})
export class ByernotifyModule {}
