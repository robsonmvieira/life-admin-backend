import CategoryRepository from "@infra/repositories/categoryRepository";
import Category from "@modules/categories/models/category";
import { injectable, inject } from "tsyringe";

@injectable()
export default class ListCategoryHandler {

  constructor(@inject("CategoryRepository") private repo: CategoryRepository) {
    
  }
  async handler(): Promise<Category[]> {
    const categories = await this.repo.index()
    return categories
  }
}