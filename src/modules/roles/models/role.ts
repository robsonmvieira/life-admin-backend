import Base from '@shared/baseEntity/entity'
import { Entity, Column } from 'typeorm'

@Entity('roles')
export default class Role extends Base {
  @Column()
  slug: string

  @Column({ nullable: false })
  name: string

  @Column()
  description: string
}
