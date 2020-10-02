import Base from '@shared/baseEntity/entity'
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import Category from '@modules/categories/models/category'
import Owner from '@modules/owner/models/owner'
import SalesPDV from '@modules/sales/models/sale'

@Entity('products_pdv_sale')
export default class ProductSale extends Base {
  @Column({ nullable: false })
  sku: string

  @Column({ nullable: false })
  name: string

  @Column()
  owner_id: string

  @ManyToOne(() => Owner, owner => owner.products)
  @JoinColumn()
  owner: Owner

  @Column({ nullable: false, default: 0 })
  quantity: number

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0
  })
  volume_points: number

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0
  })
  price_suggest: number

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0
  })
  from_zero_to_four_hundred_ninety_nine: number

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0
  })
  from_five_hundred_to_nine_hundred_ninety_nine: number

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0
  })
  from_one_thousand_to_three_thousand_nine_hundred_ninety_nine: number

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0
  })
  more_than_four_thousand: number

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0
  })
  cost_per_pv: number

  @Column()
  category_id: string

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn()
  category: Category

  @ManyToOne(() => SalesPDV, sales => sales.productsPDV)
  sales?: SalesPDV
}
