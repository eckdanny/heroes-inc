import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Skill } from './skill.entity';

export enum Priority {
  LOW = 1,
  MED = 2,
  HIGH = 3
}

@Entity()
export class Incident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.LOW
  })
  priority: Priority;

  @ManyToMany(type => Skill)
  @JoinTable()
  skills: Skill[];
}
