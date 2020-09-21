import { Request, Response } from 'express'
import ControllerBase from './controller-base'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListUsersHandler from '@modules/users/services/queries/list-users-handler'
import CreateUserHandler from '@modules/users/services/commands/create-user-handler'
import UpdateUserHandler from '@modules/users/services/commands/update-user-handler'
import RemoveUserHandler from '@modules/users/services/commands/remove-user-handler'
import GetOneUserHandler from '@modules/users/services/queries/getone-user-handler'

export default class UserController implements ControllerBase {
  async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListUsersHandler)
    const users = await service.handler()
    return res.status(200).json(classToClass(users))
  }

  async one(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(GetOneUserHandler)
    const hasUser = await service.handler(id)
    if (!hasUser) {
      return res.status(200).json(hasUser)
    }
    return res.status(200).json(classToClass(hasUser))
  }

  async create(req: Request, res: Response): Promise<Response> {
    const newUser = req.body
    const service = container.resolve(CreateUserHandler)
    const result = await service.handler(newUser)
    return res.status(201).json(classToClass(result))
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const data = req.body
    const service = container.resolve(UpdateUserHandler)
    const updatedUser = await service.handler(id, data)
    return res.status(201).json(updatedUser)
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(RemoveUserHandler)
    const isDeletedUser = await service.handler(id)
    return res.status(200).json(isDeletedUser)
  }
}
