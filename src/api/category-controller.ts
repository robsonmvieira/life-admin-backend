import { Request, Response } from "express";
import ControllerBase from "./controller-base";
import { container } from "tsyringe";
import ListCategoryHandler from "@modules/categories/services/queries/list-category-handler";
import GetCategoryHandler from "@modules/categories/services/queries/getone-category-handler";
import CreateCategoryHandler from "@modules/categories/services/commands/create-category-handler";
import UpdadeCategoryHandler from "@modules/categories/services/commands/update-category-handler";
import RemoveCategoryHandler from "@modules/categories/services/commands/remove-category-handler";

export default class CategoryController implements ControllerBase {
  async index(req: Request, res: Response): Promise<Response> {
   const service = container.resolve(ListCategoryHandler)
   const categories = await service.handler()
   return res.status(200).json(categories)
  }
  async one(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    const service = container.resolve(GetCategoryHandler)
    const hasCategory = await service.handler(id)
    return res.status(200).json(hasCategory)

  }
  async create(req: Request, res: Response): Promise<Response> {
    const newCategory = req.body
    const service = container.resolve(CreateCategoryHandler)
    const result = await service.handler(newCategory)
    return res.status(201).json(result)

  }
  async update(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    const data = req.body
    const service = container.resolve(UpdadeCategoryHandler)
    const updatedCategory = await service.handler(id, data)
    return res.status(201).json(updatedCategory)

  }
  async remove(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    const service = container.resolve(RemoveCategoryHandler)
    const isDeletedCategory = await service.handler(id)
    return res.status(200).json(isDeletedCategory)

  }
  
}