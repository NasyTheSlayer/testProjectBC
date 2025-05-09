import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Train {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column()
  departure: string;

  @Column()
  destination: string;

  @Column()
  carrier: string;

  @Column('timestamp')
  departureTime: Date;

  @Column('timestamp')
  arrivalTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}