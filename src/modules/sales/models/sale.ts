import Collaborator from '@modules/collaborators/models/collaborator'
import Owner from '@modules/owner/models/owner'
import ProductSale from '@modules/products/models/product'
import Base from '@shared/baseEntity/entity'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'

@Entity('sales_PDV')
export default class SalesPDV extends Base {
  @Column()
  collaborator_id?: string

  @Column()
  type_of_payment: string

  @Column()
  sub_total: string

  @Column({ default: 0 })
  descount: number

  @Column()
  total: string

  @Column()
  owner_id?: string

  @OneToOne(() => Owner)
  owner?: Owner

  @OneToOne(() => Collaborator)
  collaborator?: Collaborator

  @OneToMany(() => ProductSale, product => product.sales)
  productsPDV: ProductSale
}
