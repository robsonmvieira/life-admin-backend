import ProductSale from "../models/product";
import CreateProductSaleInput from "../dtos/create-product-sale-input";
import UpdateProductSaleInput from "../dtos/update-product-sale-input";

export default interface IProductSaleRepository{
  create(data: CreateProductSaleInput):Promise<ProductSale>
  index():Promise<ProductSale[]>
  one(id: string):Promise<ProductSale| undefined>
  update(id: string, data: UpdateProductSaleInput):Promise<ProductSale | undefined>
  remove(id: string): Promise<boolean>
}