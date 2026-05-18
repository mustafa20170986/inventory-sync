import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createuser {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsNumber()
  studentid!: number;
}
