import FindProductsByLikes from '@modules/products/services/queries/find-product-by-likes.-handler'
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

  async getproductByLike(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(FindProductsByLikes)
    const { terms } = req.query
    const id = '2c7c5e72-41ef-4233-a096-67e1ded3703b' // id do John Doe do banco em  produção
    // const id = '9addaa98-ef00-4a21-b781-861b6e8fbc92' // id do John Doe do banco em  desenvolvimento
    const result = await service.handler(id, String(terms))
    return res.status(200).json(result)
  }
}
