import Base from '@shared/baseEntity/entity'
import { Column, Entity, OneToMany } from 'typeorm'
import ProductSale from '@modules/products/models/product'

@Entity('categories')
export default class Category extends Base {
  @Column({ nullable: false, unique: true })
  name: string

  @OneToMany(() => ProductSale, products => products.category)
  products: ProductSale[]
}
