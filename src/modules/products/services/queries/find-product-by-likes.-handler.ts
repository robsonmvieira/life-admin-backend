import ProductSaleRepository from '@infra/repositories/productSaleRepository'
import ProductSale from '@modules/products/models/product'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class FindProductsByLikes {
  constructor(
    @inject('ProductSaleRepository') private repo: ProductSaleRepository
  ) {}

  async handler(owner_id: string, query: string): Promise<ProductSale[]> {
    return await this.repo.findByLike(owner_id, query)
  }
}
