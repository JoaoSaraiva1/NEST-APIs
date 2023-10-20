// src/items/items.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from '../items/dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.createItem(createItemDto);
  }

  @Get()
  async getItems() {
    return this.itemsService.getItems();
  }

  @Get(':id')
  async getItemById(@Param('id') id: number) {
    return this.itemsService.getItemById(id);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() createItemDto: CreateItemDto,
  ) {
    return this.itemsService.updateItem(id, createItemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number) {
    this.itemsService.deleteItem(id);
    return { message: `Item with ID ${id} has been deleted` };
  }
}
