import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
import SalesPDV from '@modules/sales/models/sale'
import { injectable, inject } from 'tsyringe'

@injectable()
export default class CreateSalesHandler {
  constructor(
    @inject('SalesPDVRepository') private salesRepository: ISalesPDVRepository
  ) {}

  async handles(data: string): Promise<SalesPDV>
}
