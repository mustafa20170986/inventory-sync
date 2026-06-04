import { Body, Controller, Post } from '@nestjs/common';
import { AddinventoryService } from './addinventory.service';
import { addproduct } from 'src/dto/addinventory';

@Controller('addinventory')
export class AddinventoryController {
  constructor(private readonly addinventoryService: AddinventoryService) {}
  @Post('addproduct')
  addinventory(@Body() dto: addproduct) {
    return this.addinventoryService.addinventory(dto);
  }
}
