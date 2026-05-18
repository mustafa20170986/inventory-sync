import { Body, Controller, Get, Post } from '@nestjs/common';
import { LibuserService } from './libuser.service';
import { createuser } from 'src/dto/creteuser.dto';

@Controller('libuser')
export class LibuserController {
  constructor(private readonly libuserService: LibuserService) {}

  @Post('adduser')
  adduser(@Body() dto: createuser) {
    return this.libuserService.adduser(dto);
  }
  @Get('getall-user')
  getalluser() {
    return this.libuserService.getalluser();
  }
}
