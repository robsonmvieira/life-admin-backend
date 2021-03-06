import { Request, Response } from 'express'
import XlsxToJsonParser from '@infra/parserxlsFiles/converterXlsxToJson'
import { container } from 'tsyringe'
import GetProductSaleLengthFromDbHandler from '@modules/products/services/queries/get-total-from-db-handler'
import ClearProductSalePDVTable from '@modules/products/services/commands/clear-product-sale-Table'
export default class AdminController {
  async convertXlsx(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const xlsx = new XlsxToJsonParser()

    await xlsx.parserToJson(id)
    return res.status(200).json({ message: 'loaded' })
  }

  async productsListLengthFromDb(
    req: Request,
    res: Response
  ): Promise<Response> {
    const productHandler = container.resolve(GetProductSaleLengthFromDbHandler)
    const total = await productHandler.handler()
    return res.status(200).json(total)
  }

  async clearProductSale(req: Request, res: Response): Promise<Response> {
    const clearProductPDVTable = container.resolve(ClearProductSalePDVTable)
    const result = clearProductPDVTable.handler()
    return res.status(200).json(result)
  }
}
