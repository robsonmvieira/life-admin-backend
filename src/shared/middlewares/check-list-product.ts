import AppError from '@infra/errors/AppError'
import GetOneCollaboratorHandler from '@modules/collaborators/services/queries/getone-collaborator-handler'
import GetOneOwnerHandler from '@modules/owner/services/queries/getone-owner-handler'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export default async function checkListProductPermission(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.entity
  const service = container.resolve(GetOneOwnerHandler)
  const collaboratorService = container.resolve(GetOneCollaboratorHandler)
  const collaboratorExists = await collaboratorService.handler(id)
  const ownerExists = await service.handler(id)
  if (ownerExists) {
    return next()
  }
  const hasPermission = collaboratorExists?.permissions.find(p =>
    p.slug.includes('listar-produtos')
  )
  if (!hasPermission) {
    throw new AppError('Você não tem permissão para esse Recurso', 403)
  }
  return next()
}
