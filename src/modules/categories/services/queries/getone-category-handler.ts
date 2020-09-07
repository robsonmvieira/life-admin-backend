import CategoryRepository from "@infra/repositories/categoryRepository";
import Category from "@modules/categories/models/category";
import { injectable, inject } from "tsyringe";

@injectable()
export default class GetCategoryHandler {

  constructor(@inject("CategoryRepository") private repo: CategoryRepository) {
    
  }
  async handler(id: string): Promise<Category | undefined> {
    const category = await this.repo.one(id)
    return category
  }
}