import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Items } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private itemRepository: Repository<Items>,
  ) {}

  findAll(): Promise<Items[]> {
    return this.itemRepository.find();
  }

  findOne(id: number): Promise<Items | null> {
    return this.itemRepository.findOneBy({ id });
  }

  async create(item: Items): Promise<Items> {
    return await this.itemRepository.save(item);
  }

  async update(id: number, item: Items): Promise<any> {
    await this.itemRepository.update(id, item);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
