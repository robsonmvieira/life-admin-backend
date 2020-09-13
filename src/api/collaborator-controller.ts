import { Request, Response } from 'express'
import ControllerBase from './controller-base'
import { container } from 'tsyringe'
import CreateCollaboratorHandler from '@modules/collaborators/services/commands/create-collaborator-handler'
import RemoveCollaboratorHandler from '@modules/collaborators/services/commands/remove-collaborator-handler'
import UpdateCollaboratorHandler from '@modules/collaborators/services/commands/update-collaborator-handler'
import GetOneCollaboratorHandler from '@modules/collaborators/services/queries/getone-collaborator-handler'
import ListCollaboratorsHandler from '@modules/collaborators/services/queries/list-collaborators-handler'

export default class CollaboratorController implements ControllerBase {
  async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListCollaboratorsHandler)
    const Collaborators = await service.handler()
    return res.status(200).json(Collaborators)
  }

  async one(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(GetOneCollaboratorHandler)
    const hasCollaborator = await service.handler(id)
    return res.status(200).json(hasCollaborator)
  }

  async create(req: Request, res: Response): Promise<Response> {
    const newCollaborator = req.body
    const service = container.resolve(CreateCollaboratorHandler)
    const result = await service.handler(newCollaborator)
    return res.status(201).json(result)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const data = req.body
    const service = container.resolve(UpdateCollaboratorHandler)
    const updatedCollaborator = await service.handler(id, data)
    return res.status(201).json(updatedCollaborator)
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const service = container.resolve(RemoveCollaboratorHandler)
    const isDeletedCollaborator = await service.handler(id)
    return res.status(200).json(isDeletedCollaborator)
  }
}
