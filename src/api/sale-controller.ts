import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListSalesPDVHandler from '@modules/sales/services/queries/sales.listsalesPDV.handler'
import CreateSalesPDVHandler from '@modules/sales/services/commands/create.salesPDV.handler'
import { classToClass } from 'class-transformer'
import GetOneSalesPDVHandler from '@modules/sales/services/queries/sales.getonesalePDV.handler'

export default class SaleController {
  async index(req: Request, res: Response): Promise<Response> {
    const { associado } = req.query
    const service = container.resolve(ListSalesPDVHandler)

    const salesPDV = await service.handler(String(associado))
    return res.status(200).json(classToClass(salesPDV))
  }

  async one(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(GetOneSalesPDVHandler)
    const hasSales = await service.handler(id)
    return res.status(200).json(hasSales)
  }

  async create(req: Request, res: Response): Promise<Response> {
    const newSalesPDV = req.body
    const service = container.resolve(CreateSalesPDVHandler)
    const result = await service.handler(classToClass(newSalesPDV))
    return res.status(201).json(result)
  }
}
