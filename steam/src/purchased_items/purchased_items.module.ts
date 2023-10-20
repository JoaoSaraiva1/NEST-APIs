import { Module } from '@nestjs/common';
import { PurchasedItemsService } from './purchased_items.service';
import { PurchasedItemsController } from './purchased_items.controller';

@Module({
  controllers: [PurchasedItemsController],
  providers: [PurchasedItemsService],
})
export class PurchasedItemsModule {}
