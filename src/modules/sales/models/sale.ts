import Collaborator from '@modules/collaborators/models/collaborator'
import ItemSalesPDV from '@modules/itemSalesPDV/models/itemSalesPDV'
import Owner from '@modules/owner/models/owner'
import Base from '@shared/baseEntity/entity'
import { Exclude } from 'class-transformer'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne
} from 'typeorm'

@Entity('sales_pdv')
export default class SalesPDV extends Base {
  @Column({ nullable: true })
  @Exclude()
  collaborator_id?: string

  @Column()
  type_of_payment: string

  @Column({ nullable: true })
  sub_total?: string

  @Column({ default: 0, nullable: true })
  descount?: number

  @Column({ nullable: true })
  total?: string

  @Column({ nullable: true })
  @Exclude()
  owner_id?: string

  @ManyToOne(() => Owner, { nullable: true })
  @JoinColumn()
  owner?: Owner

  @OneToOne(() => Collaborator, { nullable: true })
  @JoinColumn()
  collaborator?: Collaborator

  @OneToMany(() => ItemSalesPDV, item => item.salesPDV)
  productsPDV?: ItemSalesPDV[]
}
