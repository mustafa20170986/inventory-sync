import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
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
  @Put('editbook/:id')
  findbooks(@Param('id') id: string, @Body() dto: createbook) {
    return this.crudService.editbooks(dto, id);
  }
  @Get('gttleast')
  leastmatch(@Query('expectcatagory') expectcatagory: string) {
    const catagory = expectcatagory ? expectcatagory.split(',') : [];
    return this.crudService.leastmatch(catagory);
  }
  @Get('exact')
  exactmatch(@Query('exactcatagory') exactcatagory: string) {
    const catagory = exactcatagory ? exactcatagory.split(',') : [];
    return this.crudService.exactmatch(catagory);
  }
  @Get('authorcombo')
  async groupauthor() {
    return this.crudService.groupauthor();
  }
}
