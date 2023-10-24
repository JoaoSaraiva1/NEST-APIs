// src/items/entities/item.entity.ts
import { PriceHistory } from 'src/price_history/entities/price_history.entity';
import { PurchasedItem } from 'src/purchased_items/entities/purchased_item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => PriceHistory)
  @ManyToMany(() => PurchasedItem)
  @JoinTable()
  @Column()
  buff_id: string;

  @Column()
  item_name: string;
}
