import { injectable, inject } from "tsyringe";
import ProductSaleRepository from "@infra/repositories/productSaleRepository";

@injectable()
export default class RemoveProductSalerHandler {
  
  constructor(@inject('ProductSaleRepository') private repo: ProductSaleRepository) {
    
  }

  async handler(id: string): Promise<boolean>{
    return await this.repo.remove(id)
  }
}