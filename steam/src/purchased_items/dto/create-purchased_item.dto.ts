import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreatePurchasedItemDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  purchase_price: string;

  @IsNotEmpty()
  @IsDate()
  purchase_date: Date;
}
