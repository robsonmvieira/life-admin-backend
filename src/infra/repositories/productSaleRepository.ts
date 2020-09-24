import { getRepository, Repository } from 'typeorm'
import IProductSaleRepository from '@modules/products/interfaces/IProductSaleRepository'
import CreateProductSaleInput from '@modules/products/dtos/create-product-sale-input'
import UpdateProductSaleInput from '@modules/products/dtos/update-product-sale-input'
import ProductSale from '@modules/products/models/product'

export default class ProductSaleRepository implements IProductSaleRepository {
  repo: Repository<ProductSale>

  constructor() {
    this.repo = getRepository(ProductSale)
  }

  async create(data: CreateProductSaleInput): Promise<ProductSale> {
    try {
      return await this.repo.save(data)
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao salvar')
    }
  }

  async index(itemPerPage: number): Promise<ProductSale[]> {
    const quantityPerPage = itemPerPage * 10
    console.log(quantityPerPage)
    return await this.repo.find({ skip: itemPerPage, take: 10 })
  }

  async one(id: string): Promise<ProductSale | undefined> {
    const productExists = await this.repo.findOne(id)

    if (!productExists) {
      return undefined
    }

    return productExists
  }

  async update(
    id: string,
    data: UpdateProductSaleInput
  ): Promise<ProductSale | undefined> {
    const productExists = await this.repo.findOne(id)

    if (!productExists) {
      return undefined
    }
    await this.repo.update(id, data)
    const updatedProduct = await this.repo.findOne(id)
    return updatedProduct
  }

  async remove(id: string): Promise<boolean> {
    const removedProduct = await this.repo.delete(id)

    if (!removedProduct) {
      return false
    }
    return true
  }

  async countDb(): Promise<number> {
    const total = await this.repo.count()
    return total
  }
}
