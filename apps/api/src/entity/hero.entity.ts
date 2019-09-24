import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
