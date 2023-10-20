// src/price-history/price-history.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buff_id: string;

  @Column('decimal')
  price: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => Item, (item) => item.buff_id)
  item: Item;
}
