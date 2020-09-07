import ICategoryRepository from "@modules/categories/interfaces/ICategoryRepository";
import Category from "@modules/categories/models/category";
import CreateCategoryInput from "@modules/categories/dtos/create-category-input";
import UpdateCategoryInput from "@modules/categories/dtos/update-category-input";
import { Repository, getRepository } from "typeorm";

export default class CategoryRepository implements ICategoryRepository{
  repo: Repository<Category>
  constructor() {
    this.repo = getRepository(Category)
  }
  
  async create(data: CreateCategoryInput): Promise<Category> {
    const result = await this.repo.save(data)
    return result
  }
  async one(id: string): Promise<Category | undefined> {
    const result = await this.repo.findOne(id)
    return result
  }
  async index(): Promise<Category[]> {
    const categories = await this.repo.find()
    return categories
  }
  async update(id: string, data: UpdateCategoryInput): Promise<Category | undefined> {
    const updatedCategory = await this.repo.update(id, data)
   
    return await this.repo.findOne(id)
  }
  async delete(id: string): Promise<boolean | undefined> {
    const data = await this.repo.delete(id)
    if(data){
      return true
    }
    return undefined
  }
}