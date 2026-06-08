import { Controller } from '@nestjs/common';
import { SellernotifyService } from './sellernotify.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('sellernotify')
export class SellernotifyController {
  constructor(
    private readonly selelrnotificationService: SellernotifyService,
  ) {}
  @EventPattern({ route: 'seller_notification_new' })
  async sendnotification(
    @Payload()
    data: {
      orderId: string;
      ordercompany: string;
      quantity: number;
      productname: string;
    },
  ) {
    console.log(data);
    await this.selelrnotificationService.notifyseler(
      data.orderId,
      data.ordercompany,
      data.quantity,
      data.productname,
    );
  }
}
