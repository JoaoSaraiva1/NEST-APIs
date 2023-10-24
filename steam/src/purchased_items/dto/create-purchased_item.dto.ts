import { IsNotEmpty, IsNumber, IsDate, IsString } from 'class-validator';

export class CreatePurchasedItemDto {
  @IsNotEmpty()
  @IsString()
  buff_id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  purchase_price: number;

  @IsNotEmpty()
  @IsDate()
  purchase_date: Date;
}
