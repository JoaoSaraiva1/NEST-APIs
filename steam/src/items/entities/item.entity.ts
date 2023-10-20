// src/items/entities/item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PriceHistory } from '../../price_history/entities/price_history.entity'; // Update the import path

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buff_id: string;

  @Column()
  item_name: string;

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.buff_id)
  priceHistory: PriceHistory[];
}
