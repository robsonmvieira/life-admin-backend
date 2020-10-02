import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
import SalesPDV from '@modules/sales/models/sale'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class GetOneSalesPDVHandler {
  constructor(
    @inject('SalesPDVRepository')
    private salesPDVRepository: ISalesPDVRepository
  ) {}

  async handler(id: string): Promise<SalesPDV | undefined> {
    return this.salesPDVRepository.one(id)
  }
}
