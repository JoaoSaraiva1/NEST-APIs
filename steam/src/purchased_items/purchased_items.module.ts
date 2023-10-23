import { Module } from '@nestjs/common';
import { PurchasedItemsService } from './purchased_items.service';
import { PurchasedItemsController } from './purchased_items.controller';
import { PurchasedItem } from './entities/purchased_item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasedItem])],
  controllers: [PurchasedItemsController],
  providers: [PurchasedItemsService],
})
export class PurchasedItemsModule {}
