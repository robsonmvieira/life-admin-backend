import { SaveSalesInput } from '../dtos/saveSales.input'
import { UpdateSalesInput } from '../dtos/updateSales.input'
import SalesPDV from '../models/sale'

export default interface ISalesPDVRepository {
  index(ownerId: string): Promise<SalesPDV[]>
  create(data: SaveSalesInput): Promise<SalesPDV>
  one(id: string): Promise<SalesPDV | undefined>
  getSalesByDay(): Promise<SalesPDV[]>
  getSalesByWeek(start: Date, end: Date): Promise<SalesPDV[]>
  getSalesByMounth(mounth: number): Promise<SalesPDV[]>
  remove(id: string): Promise<boolean>
  update(id: string, data: UpdateSalesInput): Promise<SalesPDV | undefined>
}
