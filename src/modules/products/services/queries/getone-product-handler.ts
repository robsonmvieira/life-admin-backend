import { injectable, inject } from 'tsyringe'
import ProductSaleRepository from '@infra/repositories/productSaleRepository'
import ProductSale from '@modules/products/models/product'

@injectable()
export default class GetOneProductHandler {
  constructor(
    @inject('ProductSaleRepository') private repo: ProductSaleRepository
  ) {}

  async handler(data: string): Promise<ProductSale | undefined> {
    return await this.repo.one(data)
  }
}
