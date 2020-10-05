import { Request, Response } from 'express'
import ControllerBase from './controller-base'
import { container } from 'tsyringe'
import GetCategoryHandler from '@modules/categories/services/queries/getone-category-handler'
import UpdadeCategoryHandler from '@modules/categories/services/commands/update-category-handler'
import RemoveCategoryHandler from '@modules/categories/services/commands/remove-category-handler'
import GetCategoryByNameHandler from '@modules/categories/services/queries/get-by-name-category-handler'
import ListSalesPDVHandler from '@modules/sales/services/queries/sales.listsalesPDV.handler'
import CreateSalesPDVHandler from '@modules/sales/services/commands/create.salesPDV.handler'
import { classToClass } from 'class-transformer'

export default class SaleController implements ControllerBase {
  async index(req: Request, res: Response): Promise<Response> {
    const { associado } = req.query
    const service = container.resolve(ListSalesPDVHandler)

    const salesPDV = await service.handler(String(associado))
    return res.status(200).json(classToClass(salesPDV))
  }

  async one(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(GetCategoryHandler)
    const hasCategory = await service.handler(id)
    return res.status(200).json(hasCategory)
  }

  async create(req: Request, res: Response): Promise<Response> {
    const newSalesPDV = req.body
    const service = container.resolve(CreateSalesPDVHandler)
    const result = await service.handler(classToClass(newSalesPDV))
    return res.status(201).json(result)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const data = req.body
    const service = container.resolve(UpdadeCategoryHandler)
    const updatedCategory = await service.handler(id, data)
    return res.status(201).json(updatedCategory)
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(RemoveCategoryHandler)
    const isDeletedCategory = await service.handler(id)
    return res.status(200).json(isDeletedCategory)
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    const data = req.params.name
    const service = container.resolve(GetCategoryByNameHandler)
    const hasCategory = await service.handler(data)
    return res.status(200).json(hasCategory)
  }
}
