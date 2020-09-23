import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'
export default abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  name: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Exclude()
  created_at: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  @Exclude()
  updated_at: Date
}
