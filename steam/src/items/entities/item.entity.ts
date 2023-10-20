import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buff_id: string;

  @Column()
  item_name: string;
}
