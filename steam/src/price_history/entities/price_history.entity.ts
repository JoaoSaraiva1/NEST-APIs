// src/price-history/price-history.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Item)
  @Column()
  buff_id: string;

  @Column('decimal')
  price: number;

  @Column('date')
  date: Date;
}
