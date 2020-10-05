import ListSalesOfDayPDVHandler from '@modules/sales/services/queries/listSalesOfDayPDV.handler'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
export default class AssociateController {
  async getSalesOfDay(req: Request, res: Response): Promise<Response> {
    const { associado } = req.query
    const service = container.resolve(ListSalesOfDayPDVHandler)
    const salesOfDay = await service.handler(String(associado))
    return res.status(200).json(salesOfDay)
  }
}
