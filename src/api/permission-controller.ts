import { Request, Response } from 'express'
import ControllerBase from './controller-base'
import { container } from 'tsyringe'
import CreatePermissionHandler from '@modules/permissions/services/commands/create-permission-handler'
import ListPermissionsHandler from '@modules/permissions/services/queries/list-permissions-handler'
import GetOnePermissionHandler from '@modules/permissions/services/queries/getone-permissions-handler'
import UpdatePermissionHandler from '@modules/permissions/services/commands/update-permission-handler'
import RemovePermissionHandler from '@modules/permissions/services/commands/remove-permission-handler'
import { classToClass } from 'class-transformer'

export default class PermissionController implements ControllerBase {
  async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListPermissionsHandler)
    const permissions = await service.handler()
    return res.status(200).json(classToClass(permissions))
  }

  async one(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(GetOnePermissionHandler)
    const haspermission = await service.handler(id)
    return res.status(200).json(haspermission)
  }

  async create(req: Request, res: Response): Promise<Response> {
    const newpermission = req.body
    const service = container.resolve(CreatePermissionHandler)
    const result = await service.handler(newpermission)
    return res.status(201).json(result)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const data = req.body
    const service = container.resolve(UpdatePermissionHandler)
    const updatedPermission = await service.handler(id, data)
    return res.status(201).json(updatedPermission)
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(RemovePermissionHandler)
    const deletedPermission = await service.handler(id)
    return res.status(200).json(deletedPermission)
  }
}
