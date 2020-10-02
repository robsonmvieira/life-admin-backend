import ProductSale from '@modules/products/models/product'
import SalesPDV from '@modules/sales/models/sale'
import Base from '@shared/baseEntity/entity'
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'

@Entity('item_sales_PDV')
export default class ItemSalesPDV extends Base {
  @Column()
  product_quantity: number

  @Column()
  total: number

  @Column()
  product_pdv_id: string

  @OneToOne(() => ProductSale)
  product: ProductSale

  @ManyToOne(() => SalesPDV)
  salesPDV: SalesPDV
}
