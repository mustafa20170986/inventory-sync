import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ByernotifyService } from './byernotify.service';

@Controller('byernotify')
export class ByernotifyController {
  constructor(private readonly byernotifyService: ByernotifyService) {}
  @EventPattern('buyer_notify')
  async sendnotificationtobuyer(@Payload() data: { orderId: string }) {
    return this.byernotifyService.notifybyer(data.orderId);
  }
}
