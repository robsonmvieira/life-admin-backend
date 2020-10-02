import SaveSalesPDV from '@modules/sales/dtos/saveSalesPDV'
import { UpdateSalesInput } from '@modules/sales/dtos/updateSales.input'
import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
import SalesPDV from '@modules/sales/models/sale'
export default class SalesPDVRepository implements ISalesPDVRepository {
  sales: SalesPDV[] = []
  async index(ownerId: string): Promise<SalesPDV[]> {
    return this.sales.filter(v => v.owner_id === ownerId)
  }

  async create(data: SaveSalesPDV): Promise<SalesPDV> {
    // const product = new ProductSale()
    // product.category_id = 'any_id'
    // product.cost_per_pv = 12.0
    // product.created_at = new Date()
    // product.updated_at = new Date()
    // product.id = 'any_id'
    // product.from_five_hundred_to_nine_hundred_ninety_nine = 10.0
    // product.from_one_thousand_to_three_thousand_nine_hundred_ninety_nine = 40
    // product.from_zero_to_four_hundred_ninety_nine = 4
    // product.more_than_four_thousand = 50
    // product.owner_id = 'any_id'
    // product.price_suggest = 40
    // product.quantity = 5
    // product.sku = 'any_sku'
    // product.volume_points = 50
    // product
    const sale = {
      ...data,
      id: 'any_id',
      created_at: new Date(),
      updated_at: new Date(),
      productsPDV: []
    }
    this.sales.push(sale)
    return sale
  }

  async one(id: string): Promise<SalesPDV | undefined> {
    const hasSales = this.sales.find(s => s.id === id)
    return hasSales
  }

  async getSalesByDay(): Promise<SalesPDV[]> {
    const getSaleofDay = this.sales.filter(s => s.created_at === new Date())
    return getSaleofDay
  }

  async getSalesByWeek(start: Date, end: Date): Promise<SalesPDV[]> {
    const getSaleofWeek = this.sales.filter(
      s => s.created_at >= start && s.created_at <= end
    )
    return getSaleofWeek
  }

  async getSalesByMounth(mounth: number): Promise<SalesPDV[]> {
    const getSalesByMounth = this.sales.filter(
      s => s.created_at.getMonth() + 1 === mounth
    )
    return getSalesByMounth
  }

  async remove(id: string): Promise<boolean> {
    this.sales = this.sales.filter(s => s.id !== id)
    return true
  }

  async update(
    id: string,
    data: UpdateSalesInput
  ): Promise<SalesPDV | undefined> {
    const updatedSale = {
      ...data,
      created_at: 'string',
      updated_at: 'any',
      id: 'any'
    }
    const newSalesPdv = new SalesPDV()
    const merge = Object.assign(newSalesPdv, updatedSale)
    const sales = this.sales.findIndex(s => s.id === id)

    if (!sales) {
      return undefined
    }

    delete this.sales[sales]
    this.sales[sales] = merge
  }
}
