import Base from '@shared/baseEntity/entity'
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'
// import Collaborator from '@modules/collaborators/models/collaborator'
import { Exclude } from 'class-transformer'
import ProductSale from '@modules/products/models/product'
@Entity('owners')
export default class Owner extends Base {
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

  @OneToMany(() => ProductSale, product => product.owner)
  products: ProductSale[]

  //   @OneToMany(() => Collaborator, collaborator => collaborator.user)
  //   collaborators: Collaborator[]
  // }
}
