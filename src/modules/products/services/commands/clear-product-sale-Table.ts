import IProductSaleRepository from '@modules/products/interfaces/IProductSaleRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class ClearProductSalePDVTable {
  constructor(
    @inject('ProductSaleRepository') private repo: IProductSaleRepository
  ) {}

  async handler(): Promise<boolean> {
    return this.repo.clearTable()
  }
}
