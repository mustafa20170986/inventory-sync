import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrudService } from './crud.service';
import { createbook } from 'src/dto/addbooks.dto';

@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}
  @Post('addbooks')
  addbooks(@Body() dto: createbook) {
    return this.crudService.addbooks(dto);
  }
  @Get('findallbooks')
  findallbooks() {
    return this.crudService.findallbooks();
  }
}
