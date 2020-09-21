import Base from '@shared/baseEntity/entity'
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'
// import Collaborator from '@modules/collaborators/models/collaborator'
import { Exclude } from 'class-transformer'
@Entity('users')
export default class User extends Base {
  @Column({ nullable: false })
  @Exclude()
  password: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: false, default: true })
  isActive: boolean

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable()
  permissions: Permission[]

  @ManyToMany(() => Role, { eager: true })
  @JoinTable()
  roles: Role[]

  //   @OneToMany(() => Collaborator, collaborator => collaborator.user)
  //   collaborators: Collaborator[]
  // }
}
