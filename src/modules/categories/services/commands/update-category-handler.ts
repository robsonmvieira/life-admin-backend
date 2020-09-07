import CategoryRepository from "@infra/repositories/categoryRepository";
import Category from "@modules/categories/models/category";
import { injectable, inject } from "tsyringe";
import UpdateCategoryInput from "@modules/categories/dtos/update-category-input";

@injectable()
export default class UpdadeCategoryHandler {

  constructor(@inject("CategoryRepository") private repo: CategoryRepository) {
    
  }
  async handler(id: string,data: UpdateCategoryInput): Promise<Category| undefined> {
    const updatedCategory = await this.repo.update(id, data)
    return updatedCategory
  }
}