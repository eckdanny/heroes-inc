import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';

// export enum Priority {
//   LOW = 1,
//   MED = 2,
//   HIGH = 3
// }

@Entity()
export class Incident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  // @Column({
  //   type: 'enum',
  //   enum: Priority,
  //   default: Priority.LOW
  // })
  // priority: Priority;
}
