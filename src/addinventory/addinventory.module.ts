import { Module } from '@nestjs/common';
import { AddinventoryController } from './addinventory.controller';
import { AddinventoryService } from './addinventory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { stcokModel, stockSchema } from 'src/schema/stock.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: stockSchema.name, schema: stcokModel }]),
  ],
  controllers: [AddinventoryController],
  providers: [AddinventoryService],
  exports: [AddinventoryService],
})
export class AddinventoryModule {}
