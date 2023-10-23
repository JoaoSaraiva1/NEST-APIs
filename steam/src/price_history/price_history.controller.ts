// src/price-history/price-history.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PriceHistoryService } from './price_history.service';
import { CreatePriceHistoryDto } from './dto/create-price_history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price_history.dto';

@Controller('price-history')
export class PriceHistoryController {
  constructor(private readonly priceHistoryService: PriceHistoryService) {}

  @Post()
  async createPriceHistory(
    @Body() createPriceHistoryDto: CreatePriceHistoryDto,
  ) {
    return this.priceHistoryService.createPriceHistory(createPriceHistoryDto);
  }

  @Get()
  async getPriceHistory() {
    return this.priceHistoryService.getPriceHistory();
  }

  @Get(':id')
  async getPriceHistoryById(@Param('id') id: number) {
    return this.priceHistoryService.getPriceHistoryById(id);
  }

  @Put(':id')
  async updatePriceHistory(
    @Param('id') id: number,
    @Body() updatePriceHistoryDto: UpdatePriceHistoryDto,
  ) {
    return this.priceHistoryService.updatePriceHistory(
      id,
      updatePriceHistoryDto,
    );
  }

  @Delete(':id')
  async deletePriceHistory(@Param('id') id: number) {
    this.priceHistoryService.deletePriceHistory(id);
    return { message: `Price history with ID ${id} has been deleted` };
  }
}
