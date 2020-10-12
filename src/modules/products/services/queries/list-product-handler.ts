import ProductSale from '@modules/products/models/product'
import { injectable, inject } from 'tsyringe'
import ProductSaleRepository from '@infra/repositories/productSaleRepository'

@injectable()
export default class ListProductSaleHandler {
  constructor(
    @inject('ProductSaleRepository') private repo: ProductSaleRepository
  ) {}

  async handler(ownerId: string, itensPerPage: number): Promise<ProductSale[]> {
    return await this.repo.index(ownerId, itensPerPage)
  }
}
