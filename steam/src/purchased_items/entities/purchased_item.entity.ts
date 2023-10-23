import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@Entity()
export class PurchasedItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buffId: string;

  @Column()
  quantity: number;

  @Column()
  purchase_price: number;

  @Column()
  purchase_date: Date;

  @ManyToOne(() => Item, (item) => item.buff_id)
  item: Item;
}
