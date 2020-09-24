import { Request, Response } from 'express'
import ControllerBase from './controller-base'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'
import CreateOwnerHandler from '@modules/owner/services/commands/create-owner-handler'
import RemoveOwnerHandler from '@modules/owner/services/commands/remove-owner-handler'
import ListOwnerHandler from '@modules/owner/services/queries/list-owner-handler'
import GetOneOwnerHandler from '@modules/owner/services/queries/getone-owner-handler'
import UpdateOwnerHandler from '@modules/owner/services/commands/update-owner-handler'

export default class OwnerController implements ControllerBase {
  async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListOwnerHandler)
    const owners = await service.handler()
    return res.status(200).json(classToClass(owners))
  }

  async one(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(GetOneOwnerHandler)
    const hasOwner = await service.handler(id)
    if (!hasOwner) {
      return res.status(200).json(hasOwner)
    }
    return res.status(200).json(classToClass(hasOwner))
  }

  async create(req: Request, res: Response): Promise<Response> {
    const newOwner = req.body
    const service = container.resolve(CreateOwnerHandler)
    const result = await service.handler(newOwner)
    return res.status(201).json(classToClass(result))
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const data = req.body
    const service = container.resolve(UpdateOwnerHandler)
    const updatedOwner = await service.handler(id, data)
    return res.status(201).json(classToClass(updatedOwner))
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(RemoveOwnerHandler)
    const isDeletedOwner = await service.handler(id)
    return res.status(200).json(isDeletedOwner)
  }
}
