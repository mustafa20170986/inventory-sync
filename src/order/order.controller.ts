import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { EventPattern, Payload } from '@nestjs/microservices';

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
  @Get('getorder')
  getorder() {
    return this.orderService.getorder();
  }
  @EventPattern('order_queue')
  async confrimord(@Payload() data: { orderId: string }) {
    return this.orderService.makeconfirmord(data.orderId);
  }
}
