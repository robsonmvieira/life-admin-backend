import Base from "@shared/baseEntity/entity";
import { Entity, Column, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import Permission from "@modules/permissions/models/permission";
import Role from "@modules/roles/models/role";
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
  @JoinTable()
  permissions: Permission[]

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]


  
}