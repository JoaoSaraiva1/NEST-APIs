import { Module } from '@nestjs/common';
import { PurchasedItemsService } from './purchased_items.service';
import { PurchasedItemsController } from './purchased_items.controller';
import { PurchasedItems } from './entities/purchased_item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasedItems])],
  controllers: [PurchasedItemsController],
  providers: [PurchasedItemsService],
})
export class PurchasedItemsModule {}
