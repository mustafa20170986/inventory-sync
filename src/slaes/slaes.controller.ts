import { Body, Controller, Post } from '@nestjs/common';
import { SlaesService } from './slaes.service';
interface CreateSaleDto {
  productId: string;
  quantity: number;
}
@Controller('sales')
export class SlaesController {
  constructor(private readonly slaesService: SlaesService) {}
  @Post('makesales')
  createsales(@Body() body: CreateSaleDto) {
    return this.slaesService.createsales(body.productId, body.quantity);
  }
}
