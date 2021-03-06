import Owner from '@modules/owner/models/owner'
import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'
import Base from '@shared/baseEntity/entity'
import { Exclude } from 'class-transformer'
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne
} from 'typeorm'

@Entity('collaborators')
export default class Collaborator extends Base {
  @Column({ nullable: false })
  @Exclude()
  password: string

  @Column({ nullable: false })
  name: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: false })
  @Exclude()
  cpf: string

  @Column({ nullable: false })
  position: string

  @Column({ default: true })
  isActive: boolean

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[]

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[]

  @Column({ nullable: false })
  owner_id: string

  @ManyToOne(() => Owner)
  @JoinColumn({ name: 'owners_id' })
  owner: Owner
}
