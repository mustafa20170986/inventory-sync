import { Body, Controller, Get, Post } from '@nestjs/common';
import { BorrowbookService } from './borrowbook.service';
import { issueborrow } from 'src/dto/borrow.dto';

@Controller('borrowbook')
export class BorrowbookController {
  constructor(private readonly borrowbookService: BorrowbookService) {}
  @Post('brwbook')
  borrowbook(@Body() dto: issueborrow) {
    return this.borrowbookService.bowworbook(dto);
  }
  @Post('get-borrower')
  getuserwhoborrow(@Body('bookname') bookname: string) {
    return this.borrowbookService.getuserwhoborrow(bookname);
  }
}
