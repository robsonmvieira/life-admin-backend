import ProductSale from "@modules/products/models/product";
import { injectable, inject } from "tsyringe";
import ProductSaleRepository from "@infra/repositories/productSaleRepository";

@injectable()
export default class GetProductSaleLengthFromDbHandler {

  constructor(@inject('ProductSaleRepository')private repo: ProductSaleRepository) {
    
  }

  async handler(): Promise<number>{
    return await this.repo.countDb()
  }
}