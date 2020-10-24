import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateProductSalerHandler from '@modules/products/services/commands/create-product-sale-handler'
import { classToClass } from 'class-transformer'
import ListClientHandler from '@modules/clients/services/queries/list-clients-handler'
export default class ClientController {
  async index(req: Request, res: Response): Promise<Response> {
    // get owner id or collaborattor's ownerId
    // const id = req.id
    const id = '2c7c5e72-41ef-4233-a096-67e1ded3703b' // id do John Doe do banco em  produção
    // const id = '9addaa98-ef00-4a21-b781-861b6e8fbc92' // id do John Doe do banco em  desenvolvimento
    const service = container.resolve(ListClientHandler)
    const products = await service.handler(id)
    return res.status(200).json(classToClass(products))
  }

  // async one(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params
  //   const service = container.resolve(GetOneProductHandler)
  //   const hasProduct = await service.handler(id)
  //   return res.status(200).json(classToClass(hasProduct))
  // }

  async create(req: Request, res: Response): Promise<Response> {
    const newProduct = req.body
    const service = container.resolve(CreateProductSalerHandler)
    const result = await service.handler(newProduct)
    return res.status(201).json(result)
  }

  // async update(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params
  //   const data = req.body
  //   const service = container.resolve(UpdateProductSalerHandler)
  //   const updatedCategory = await service.handler(id, data)
  //   return res.status(201).json(updatedCategory)
  // }

  // async remove(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params
  //   const service = container.resolve(RemoveProductSalerHandler)
  //   const isDeletedCategory = await service.handler(id)
  //   return res.status(200).json(isDeletedCategory)
  // }
}
