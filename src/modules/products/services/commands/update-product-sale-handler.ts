import ProductSale from "@modules/products/models/product";
import { injectable, inject } from "tsyringe";
import ProductSaleRepository from "@infra/repositories/productSaleRepository";
import UpdateProductSaleInput from "@modules/products/dtos/update-product-sale-input";

@injectable()
export default class UpdateProductSalerHandler {
  
  constructor(@inject('ProductSaleRepository') private repo: ProductSaleRepository) {
    
  }

  async handler(id: string,data: UpdateProductSaleInput): Promise<ProductSale| undefined>{
    const result = await this.repo.update(id, data)
    return result
  }
}