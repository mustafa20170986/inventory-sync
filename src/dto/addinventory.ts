import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class addproduct {
  @IsString()
  @IsNotEmpty()
  productname!: string;
  @IsNumber()
  @IsNotEmpty()
  price!: number;
  @IsNumber()
  @IsNotEmpty()
  instock!: number;
}
