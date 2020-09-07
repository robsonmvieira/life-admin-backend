import CreateProductSaleInput from "@modules/products/dtos/create-product-sale-input";
import ProductSale from "@modules/products/models/product";
import { injectable, inject } from "tsyringe";
import ProductSaleRepository from "@infra/repositories/productSaleRepository";

@injectable()
export default class CreateProductSalerHandler {
  
  constructor(@inject('ProductSaleRepository') private repo: ProductSaleRepository) {
    
  }

  async handler(data: CreateProductSaleInput): Promise<ProductSale>{
    // const price_base = data.price_suggest
    const result = await this.repo.create(data)
    return result
  }
}