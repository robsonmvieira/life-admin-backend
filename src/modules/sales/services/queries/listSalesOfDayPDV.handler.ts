import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
import SalesPDV from '@modules/sales/models/sale'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class ListSalesOfDayPDVHandler {
  constructor(
    @inject('SalesPDVRepository')
    private salesPDVRepository: ISalesPDVRepository
  ) {}

  async handler(ownerId: string): Promise<SalesPDV[]> {
    return this.salesPDVRepository.getSalesOfDay(ownerId)
  }
}
