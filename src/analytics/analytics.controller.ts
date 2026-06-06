import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}
  @EventPattern('analytics_sync')
  async analyticspipelie(
    @Payload() data: { total: number; productname: string; quantityBy: number },
  ) {
    await this.analyticsService.analyticstriiger(
      data.total,
      data.productname,
      data.quantityBy,
    );
  }
}
