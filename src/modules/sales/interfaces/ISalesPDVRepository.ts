import SaveSalesInput from '../dtos/saveSalesPDV'
import { UpdateSalesInput } from '../dtos/updateSales.input'
import SalesPDV from '../models/sale'

export default interface ISalesPDVRepository {
  index(ownerId: string): Promise<SalesPDV[]>
  save(data: SalesPDV): Promise<SalesPDV>
  create(data: SaveSalesInput): Promise<SalesPDV>
  one(id: string): Promise<SalesPDV | undefined>
  getSalesByDay(): Promise<SalesPDV[]>
  getSalesByWeek(start: Date, end: Date): Promise<SalesPDV[]>
  getSalesByMounth(mounth: number): Promise<SalesPDV[]>
  remove(id: string): Promise<boolean>
  update(id: string, data: UpdateSalesInput): Promise<SalesPDV | undefined>
  getSalesOfDay(ownerId: string): Promise<SalesPDV[]>
}
