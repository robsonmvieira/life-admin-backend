import ProductSale from '../models/product'
import CreateProductSaleInput from '../dtos/create-product-sale-input'
import UpdateProductSaleInput from '../dtos/update-product-sale-input'

export default interface IProductSaleRepository {
  create(data: CreateProductSaleInput): Promise<ProductSale>
  index(ownerId: string, itemPerPage: number): Promise<ProductSale[]>
  one(id: string): Promise<ProductSale | undefined>
  update(
    id: string,
    data: UpdateProductSaleInput
  ): Promise<ProductSale | undefined>
  remove(id: string): Promise<boolean>
  countDb(): Promise<number>
  findByLike(owner_id: string, query: string): Promise<ProductSale[]>
  clearTable(): Promise<boolean>
}
