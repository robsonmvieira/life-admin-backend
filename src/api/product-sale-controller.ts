import { Request, Response } from "express";
import ControllerBase from "./controller-base";
import { container } from "tsyringe";
import ListProductSaleHandler from "@modules/products/services/queries/list-product-handler";
import CreateProductSalerHandler from "@modules/products/services/commands/create-product-sale-handler";
import UpdateProductSalerHandler from "@modules/products/services/commands/update-product-sale-handler";
import RemoveProductSalerHandler from "@modules/products/services/commands/remove-product-sale-handler";
import GetOneProductHandler from "@modules/products/services/queries/getone-product-handler";

export default class ProductSaleController implements ControllerBase {
  async index(req: Request, res: Response): Promise<Response> {
   const service = container.resolve(ListProductSaleHandler)
   const categories = await service.handler()
   return res.status(200).json(categories)
  }
  async one(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    const service = container.resolve(GetOneProductHandler)
    const hasCategory = await service.handler(id)
    return res.status(200).json(hasCategory)

  }
  async create(req: Request, res: Response): Promise<Response> {
    const newCategory = req.body
    const service = container.resolve(CreateProductSalerHandler)
    const result = await service.handler(newCategory)
    return res.status(201).json(result)

  }
  async update(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    const data = req.body
    const service = container.resolve(UpdateProductSalerHandler)
    const updatedCategory = await service.handler(id, data)
    return res.status(201).json(updatedCategory)

  }
  async remove(req: Request, res: Response): Promise<Response> {
    const {id} = req.params
    const service = container.resolve(RemoveProductSalerHandler)
    const isDeletedCategory = await service.handler(id)
    return res.status(200).json(isDeletedCategory)

  }
  
}