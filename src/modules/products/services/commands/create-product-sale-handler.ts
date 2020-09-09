import CreateProductSaleInput from "@modules/products/dtos/create-product-sale-input";
import ProductSale from "@modules/products/models/product";
import { injectable, inject } from "tsyringe";
import ProductSaleRepository from "@infra/repositories/productSaleRepository";
import { ProfileConsulter } from "@modules/products/profile-consulter";

@injectable()
export default class CreateProductSalerHandler {
  
  constructor(@inject('ProductSaleRepository') private repo: ProductSaleRepository) {
    
  }

  async handler(data: CreateProductSaleInput): Promise<ProductSale>{
    data.name = data.name.trim()
    const price_base = data.price_suggest
    data.from_zero_to_four_hundred_ninety_nine= price_base * (ProfileConsulter.FromZeroToFourHundredNinetyNine /100)
    data.from_five_hundred_to_nine_hundred_ninety_nine = price_base * (ProfileConsulter.FromFiveHundredToNineHundredNinetyNine /100)
    data.from_one_thousand_to_three_thousand_nine_hundred_ninety_nine = price_base * (ProfileConsulter.FromOneThousandToThreeThousandNineHundredNinetyNine /100)
    data.more_than_four_thousand = price_base * (ProfileConsulter.MoreThanFourThousand /100)
    return await this.repo.create(data)
  }
}