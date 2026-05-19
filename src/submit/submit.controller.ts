import { Controller, Post, Body } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { submitdto } from 'src/dto/submit.dto';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}
  @Post('takesub')
  takesubmit(@Body() dto: submitdto) {
    return this.submitService.takesubmit(dto);
  }
}
