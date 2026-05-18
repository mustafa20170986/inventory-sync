import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class issueborrow {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  borrowerId!: string;
  @IsString()
  @IsNotEmpty()
  bookname!: string;
  @IsString()
  @IsNotEmpty()
  //id!: string;
  @IsNumber()
  @IsNotEmpty()
  bookcount!: number;
}
