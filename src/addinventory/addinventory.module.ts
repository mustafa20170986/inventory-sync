import { Module } from '@nestjs/common';
import { AddinventoryController } from './addinventory.controller';
import { AddinventoryService } from './addinventory.service';

@Module({
  controllers: [AddinventoryController],
  providers: [AddinventoryService],
})
export class AddinventoryModule {}
