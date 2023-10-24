import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class PurchasedItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Item)
  @Column()
  buff_id: string;

  @Column('integer')
  quantity: number;

  @Column('decimal')
  purchase_price: number;

  @Column('date')
  purchase_date: Date;
}
