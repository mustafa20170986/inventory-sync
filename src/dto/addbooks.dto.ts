import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class createbook {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsString()
  author!: string;
  @IsNotEmpty()
  @IsNumber()
  pages!: number;
}
