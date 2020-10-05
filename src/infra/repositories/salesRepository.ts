import SalesPDV from '@modules/sales/models/sale'
import { getRepository, Raw, Repository } from 'typeorm'
import SaveSalesInput from '@modules/sales/dtos/saveSalesPDV'
import { UpdateSalesInput } from '@modules/sales/dtos/updateSales.input'
import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
export default class SalesPDVRepository implements ISalesPDVRepository {
  repo: Repository<SalesPDV>
  constructor() {
    this.repo = getRepository(SalesPDV)
  }

  async getSalesOfDay(ownerId: string): Promise<SalesPDV[]> {
    const day = new Date().getDate()
    const parsedDay = String(day).padStart(2, '0')
    const sales = await this.repo.find({
      where: {
        owner_id: ownerId,
        created_at: Raw(
          datefieldName => `to_char(${datefieldName}, 'DD') = '${parsedDay}'`
        )
      }
    })
    return sales
  }

  async save(data: SalesPDV): Promise<SalesPDV> {
    return this.repo.save(data)
  }

  async index(ownerId: string): Promise<SalesPDV[]> {
    return await this.repo.find({ where: { owner_id: ownerId } })
  }

  async create(data: SaveSalesInput): Promise<SalesPDV> {
    return this.repo.save(data)
  }

  async one(id: string): Promise<SalesPDV | undefined> {
    return await this.repo.findOne(id)
  }

  async getSalesByDay(): Promise<SalesPDV[]> {
    return this.repo.find({ where: { created_at: new Date() } })
  }

  async getSalesByWeek(start: Date, end: Date): Promise<SalesPDV[]> {
    // aplicar o date Fns
    return this.repo.find({ where: { created_at: new Date() } })
  }

  getSalesByMounth(mounth: number): Promise<SalesPDV[]> {
    throw new Error('Method not implemented.')
  }

  async remove(id: string): Promise<boolean> {
    const hasSalesPDV = await this.repo.findOne(id)

    if (!hasSalesPDV) {
      return false
    }
    await this.repo.delete(hasSalesPDV)
    return true
  }

  async update(
    id: string,
    data: UpdateSalesInput
  ): Promise<SalesPDV | undefined> {
    let hasSalesPDV = await this.repo.findOne(id)
    if (!hasSalesPDV) {
      return undefined
    }
    await this.repo.update(id, data)
    hasSalesPDV = await this.repo.findOne(id)
    return hasSalesPDV
  }
}
