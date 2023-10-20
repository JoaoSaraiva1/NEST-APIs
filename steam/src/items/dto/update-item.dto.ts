import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  id: number;
  buff_id: string;
  item_name: string;
}
