// src/price-history/price-history.dto.ts
import { IsNotEmpty, IsNumber, IsDate, IsString } from 'class-validator';

export class CreatePriceHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  buff_id: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}
