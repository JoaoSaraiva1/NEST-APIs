// src/items/items.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  buff_id: string;

  @IsNotEmpty()
  @IsString()
  item_name: string;
}
