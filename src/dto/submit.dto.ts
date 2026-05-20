import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class submitdto {
  @IsNotEmpty()
  @IsString()
  submitterId!: string;
  @IsNotEmpty()
  @IsString()
  bookname!: string;
  @IsNotEmpty()
  @IsNumber()
  bookcount!: number;
}
