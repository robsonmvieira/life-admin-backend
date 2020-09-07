import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export default abstract class Base {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({nullable: false})
  name: string

  @CreateDateColumn({type: 'timestamp with time zone'})
  created_at: Date

  @UpdateDateColumn({type: 'timestamp with time zone'})
  updated_at: Date
}
