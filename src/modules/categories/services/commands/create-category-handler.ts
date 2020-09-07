import CategoryRepository from "@infra/repositories/categoryRepository";
import Category from "@modules/categories/models/category";
import { injectable, inject } from "tsyringe";
import CreateCategoryInput from "@modules/categories/dtos/create-category-input";

@injectable()
export default class CreateCategoryHandler {

  constructor(@inject("CategoryRepository") private repo: CategoryRepository) {
    
  }
  async handler(data: CreateCategoryInput): Promise<Category> {
    const newCategory = await this.repo.create(data)
    return newCategory
  }
}