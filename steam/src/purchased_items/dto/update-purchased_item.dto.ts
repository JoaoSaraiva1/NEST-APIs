import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchasedItemDto } from './create-purchased_item.dto';

export class UpdatePurchasedItemDto extends PartialType(
  CreatePurchasedItemDto,
) {}
