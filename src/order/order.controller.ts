import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('placeorder')
  createorder(
    @Body() body: { productId: string; quantity: number; company: string },
  ) {
    return this.orderService.createorder(
      body.productId,
      body.quantity,
      body.company,
    );
  }
}
