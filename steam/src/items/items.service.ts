// src/items/items.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { buff_id, item_name } = createItemDto;
    const newItem = this.itemsRepository.create({ buff_id, item_name });
    return await this.itemsRepository.save(newItem);
  }

  async getItems(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async updateItem(id: number, createItemDto: CreateItemDto): Promise<Item> {
    await this.getItemById(id);
    await this.itemsRepository.update(id, createItemDto);
    return await this.getItemById(id);
  }

  async deleteItem(id: number): Promise<void> {
    await this.getItemById(id);
    await this.itemsRepository.delete(id);
  }
}
