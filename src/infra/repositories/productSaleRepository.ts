import { getRepository, Repository, Raw } from 'typeorm'
import IProductSaleRepository from '@modules/products/interfaces/IProductSaleRepository'
import CreateProductSaleInput from '@modules/products/dtos/create-product-sale-input'
import UpdateProductSaleInput from '@modules/products/dtos/update-product-sale-input'
import ProductSale from '@modules/products/models/product'
import AppError from '@infra/errors/AppError'

export default class ProductSaleRepository implements IProductSaleRepository {
  repo: Repository<ProductSale>

  constructor() {
    this.repo = getRepository(ProductSale)
  }

  async clearTable(): Promise<boolean> {
    try {
      await this.repo.clear()
      return true
    } catch (error) {
      throw new AppError('Não foi possível Zerar a Tabela', 500)
    }
  }

  async findByLike(owner_id: string, query: string): Promise<ProductSale[]> {
    const response = await this.repo.find({
      where: {
        owner_id,
        name: Raw(alias => `${alias} ILIKE '%${query}%'`)
      },
      order: {
        updated_at: 'DESC'
      }
    })
    return response
  }

  async create(data: CreateProductSaleInput): Promise<ProductSale> {
    try {
      return await this.repo.save(data)
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao salvar')
    }
  }

  async index(ownerId: string, itemPerPage: number): Promise<ProductSale[]> {
    const quantityPerPage = itemPerPage * 10
    return await this.repo.find({
      where: { owner_id: ownerId },
      skip: quantityPerPage,
      take: 10,
      order: {
        updated_at: 'DESC'
      }
    })
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
