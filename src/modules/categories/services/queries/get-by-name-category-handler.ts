import CategoryRepository from "@infra/repositories/categoryRepository";
import Category from "@modules/categories/models/category";
import { injectable, inject } from "tsyringe";

@injectable()
export default class GetCategoryByNameHandler {

  constructor(@inject("CategoryRepository") private repo: CategoryRepository) {
    
  }
  async handler(name: string): Promise<Category | undefined> {
    const category = await this.repo.findByName(name)
    return category
  }
}