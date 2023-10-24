import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchasedItemsService } from './purchased_items.service';
import { CreatePurchasedItemDto } from './dto/create-purchased_item.dto';
import { UpdatePurchasedItemDto } from './dto/update-purchased_item.dto';

@Controller('purchased-items')
export class PurchasedItemsController {
  constructor(private readonly purchasedItemsService: PurchasedItemsService) {}

  @Post()
  async createPriceHistory(
    @Body() createPurchasedItemDto: CreatePurchasedItemDto,
  ) {
    return this.purchasedItemsService.createPurchasedItems(
      createPurchasedItemDto,
    );
  }

  @Get()
  async getPurchasedItem() {
    return this.purchasedItemsService.getPurchasedItems();
  }

  @Get(':id')
  async getPurchasedItemsById(@Param('id') id: number) {
    return this.purchasedItemsService.getPurchasedItemsById(id);
  }

  @Put(':id')
  async updatePurchasedItems(
    @Param('id') id: number,
    @Body() updatePurchasedItemDto: UpdatePurchasedItemDto,
  ) {
    return this.purchasedItemsService.updatePurchasedItems(
      id,
      updatePurchasedItemDto,
    );
  }

  @Delete(':id')
  async deletePurchasedItems(@Param('id') id: number) {
    this.purchasedItemsService.deletePurchasedItems(id);
    return { message: `Purchased item with ID ${id} has been deleted` };
  }
}
