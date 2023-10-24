import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchasedItems } from './entities/purchased_item.entity';
import { CreatePurchasedItemDto } from './dto/create-purchased_item.dto';
import { UpdatePurchasedItemDto } from './dto/update-purchased_item.dto';

@Injectable()
export class PurchasedItemsService {
  constructor(
    @InjectRepository(PurchasedItems)
    private readonly purchasedItemsRepository: Repository<PurchasedItems>,
  ) {}

  async createPurchasedItems(
    createPurchasedItemDto: CreatePurchasedItemDto,
  ): Promise<PurchasedItems> {
    const { buff_id, quantity, purchase_price, purchase_date } =
      createPurchasedItemDto;
    const newPurchasedItem = this.purchasedItemsRepository.create({
      buff_id,
      quantity,
      purchase_price,
      purchase_date,
    });
    return await this.purchasedItemsRepository.save(newPurchasedItem);
  }

  async getPurchasedItems(): Promise<PurchasedItems[]> {
    return await this.purchasedItemsRepository.find();
  }

  async getPurchasedItemsById(id: number): Promise<PurchasedItems> {
    const purchased_item = await this.purchasedItemsRepository.findOne({
      where: { id },
    });
    if (!purchased_item) {
      throw new NotFoundException(`Purchased item with ID ${id} not found`);
    }
    return purchased_item;
  }

  async updatePurchasedItems(
    id: number,
    updatePurchasedItemDto: UpdatePurchasedItemDto,
  ): Promise<PurchasedItems> {
    await this.getPurchasedItemsById(id);
    await this.purchasedItemsRepository.update(id, updatePurchasedItemDto);
    return await this.getPurchasedItemsById(id);
  }

  async deletePurchasedItems(id: number): Promise<void> {
    await this.getPurchasedItemsById(id);
    await this.purchasedItemsRepository.delete(id);
  }
}
