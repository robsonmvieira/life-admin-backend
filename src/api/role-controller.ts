import { Request, Response } from 'express'
import ControllerBase from './controller-base'
import { container } from 'tsyringe'
import ListRolesHandler from '@modules/roles/services/queries/list-role-handler'
import GetOneRoleHandler from '@modules/roles/services/queries/getone-role-handler'
import CreateRoleHandler from '@modules/roles/services/commands/create-role-handler'
import UpdateRoleHandler from '@modules/roles/services/commands/update-role-handler'
import RemoveRoleHandler from '@modules/roles/services/commands/remove-role-handler'
import { classToClass } from 'class-transformer'

export default class RoleController implements ControllerBase {
  async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListRolesHandler)
    const roles = await service.handler()
    return res.status(200).json(classToClass(roles))
  }

  async one(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(GetOneRoleHandler)
    const hasrole = await service.handler(id)
    return res.status(200).json(classToClass(hasrole))
  }

  async create(req: Request, res: Response): Promise<Response> {
    const newrole = req.body
    const service = container.resolve(CreateRoleHandler)
    const result = await service.handler(newrole)
    return res.status(201).json(result)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const data = req.body
    const service = container.resolve(UpdateRoleHandler)
    const updatedRole = await service.handler(id, data)
    return res.status(201).json(updatedRole)
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(RemoveRoleHandler)
    const deletedRole = await service.handler(id)
    return res.status(200).json(deletedRole)
  }
}
