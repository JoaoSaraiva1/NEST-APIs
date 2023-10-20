// src/price_history/price-history.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceHistory } from './entities/price_history.entity';
import { CreatePriceHistoryDto } from './dto/create-price_history.dto';

@Injectable()
export class PriceHistoryService {
  constructor(
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  async createPriceHistory(
    createPriceHistoryDto: CreatePriceHistoryDto,
  ): Promise<PriceHistory> {
    const { price, buff_id, date } = createPriceHistoryDto;
    const newPriceHistory = this.priceHistoryRepository.create({
      price,
      buff_id,
      date,
    });
    return await this.priceHistoryRepository.save(newPriceHistory);
  }

  async getPriceHistory(): Promise<PriceHistory[]> {
    return await this.priceHistoryRepository.find();
  }

  async getPriceHistoryById(id: number): Promise<PriceHistory> {
    const pricehistory = await this.priceHistoryRepository.findOne({
      where: { id },
    });
    if (!pricehistory) {
      throw new NotFoundException(`PriceHistory with ID ${id} not found`);
    }
    return pricehistory;
  }

  async updatePriceHistory(
    id: number,
    createPriceHistoryDto: CreatePriceHistoryDto,
  ): Promise<PriceHistory> {
    await this.getPriceHistoryById(id);
    await this.priceHistoryRepository.update(id, createPriceHistoryDto);
    return await this.getPriceHistoryById(id);
  }

  async deletePriceHistory(id: number): Promise<void> {
    await this.getPriceHistoryById(id);
    await this.priceHistoryRepository.delete(id);
  }
}
