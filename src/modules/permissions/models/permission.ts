import Base from "@shared/baseEntity/entity";
import { Entity, Column, ManyToMany } from "typeorm";

@Entity('permissions')
export default class Permission extends Base{

  @Column()
  slug: string
  @Column()
  description: string

}