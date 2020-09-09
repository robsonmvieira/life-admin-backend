import Base from "@shared/baseEntity/entity";
import { Entity, Column, ManyToMany } from "typeorm";
import Permission from "@modules/permissions/models/permission";
@Entity('users')
export default class User extends Base{

  @Column({nullable: false})
  password: string

  @Column({unique: true})
  email: string
  @Column({nullable: false, default: false})
  isAdmin: boolean
  @Column({nullable: false, default: true})
  isActive: boolean

  @ManyToMany(() => Permission)
  permissions: Permission[]

  
}