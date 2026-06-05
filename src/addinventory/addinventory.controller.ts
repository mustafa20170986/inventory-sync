import { Body, Controller, Post } from '@nestjs/common';
import { AddinventoryService } from './addinventory.service';
import { addproduct } from 'src/dto/addinventory';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('addinventory')
export class AddinventoryController {
  constructor(private readonly addinventoryService: AddinventoryService) {}
  @Post('addproduct')
  addinventory(@Body() dto: addproduct) {
    return this.addinventoryService.addinventory(dto);
  }
  @EventPattern('reduce_stock')
  async handlereduct(
    @Payload() data: { productId: string; quantityBy: number },
  ) {
    await this.addinventoryService.deductstoc(data.productId, data.quantityBy);
  }
}
