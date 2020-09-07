import CategoryRepository from "@infra/repositories/categoryRepository";
import { injectable, inject } from "tsyringe";

@injectable()
export default class RemoveCategoryHandler {

  constructor(@inject("CategoryRepository") private repo: CategoryRepository) {
    
  }
  async handler(id: string): Promise<boolean| undefined> {
    const deletedCategory = await this.repo.delete(id)
    return deletedCategory
  }
}