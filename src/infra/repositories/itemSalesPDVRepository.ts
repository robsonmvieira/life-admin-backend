import { getRepository, Repository } from 'typeorm'
import IItemSalesPDVRepository from '@modules/itemSalesPDV/interfaces/IItemSalesPDVRepository'
import SaveItemSalesPDV from '../../modules/itemSalesPDV/dtos/saveItemSalesPDV'
import UpdateItemSalesPDV from '../../modules/itemSalesPDV/dtos/updateItemSalesPDV'
import ItemSalesPDV from '@modules/itemSalesPDV/models/itemSalesPDV'
export default class ItemSalesPDVRepository implements IItemSalesPDVRepository {
  repo: Repository<ItemSalesPDV>

  constructor() {
    this.repo = getRepository(ItemSalesPDV)
  }

  async index(salesId: string): Promise<ItemSalesPDV[]> {
    return await this.repo.find({ where: salesId })
  }

  async create(data: SaveItemSalesPDV): Promise<ItemSalesPDV> {
    return this.repo.save(data)
  }

  async one(id: string): Promise<ItemSalesPDV | undefined> {
    return await this.repo.findOne(id)
  }

  async remove(id: string): Promise<boolean> {
    const hasItem = await this.repo.findOne(id)

    if (!hasItem) {
      return false
    }
    this.repo.delete(id)
    return true
  }

  async update(
    id: string,
    data: UpdateItemSalesPDV
  ): Promise<ItemSalesPDV | undefined> {
    let hasItem = await this.repo.findOne(id)
    if (!hasItem) {
      return undefined
    }
    await this.repo.update(id, data)
    hasItem = await this.repo.findOne(id)
    return hasItem
  }
}
