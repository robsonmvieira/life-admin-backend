import SaveItemSalesPDV from '../dtos/saveItemSalesPDV'
import UpdateItemSalesPDV from '../dtos/updateItemSalesPDV'
import ItemSalesPDV from '../models/itemSalesPDV'

export default interface IItemSalesPDVRepository {
  index(salesId: string): Promise<ItemSalesPDV[]>
  create(data: SaveItemSalesPDV): Promise<ItemSalesPDV>
  one(id: string): Promise<ItemSalesPDV | undefined>
  remove(id: string): Promise<boolean>
  update(
    id: string,
    data: UpdateItemSalesPDV
  ): Promise<ItemSalesPDV | undefined>
}
