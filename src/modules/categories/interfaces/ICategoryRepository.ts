import Category from "../models/category";
import CreateCategoryInput from "../dtos/create-category-input";
import UpdateCategoryInput from "../dtos/update-category-input";

export default interface ICategoryRepository{
  create(data: CreateCategoryInput): Promise<Category>
  index(): Promise<Category[]>
  one(id: string): Promise<Category | undefined>
  update(id: string, data: UpdateCategoryInput): Promise<Category | undefined>
  delete(id: string): Promise<boolean | undefined>
  findByName(id: string): Promise<Category | undefined>

  
}