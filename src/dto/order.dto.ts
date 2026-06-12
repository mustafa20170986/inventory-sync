import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createorder {
  @IsNotEmpty()
  @IsString()
  productname!: string;
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  company!: number;
}
