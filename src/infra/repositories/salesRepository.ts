import { SaveSalesInput } from '@modules/sales/dtos/saveSales.input'
import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
import SalesPDV from '@modules/sales/models/sale'
import { getRepository, Repository } from 'typeorm'
export default class SalesPDVRepository implements ISalesPDVRepository {
  repo: Repository<SalesPDV>
  constructor() {
    this.repo = getRepository(SalesPDV)
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

  remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  update(id: string, data: string): Promise<SalesPDV | undefined> {
    throw new Error('Method not implemented.')
  }
}
