import AppError from '@infra/errors/AppError'
import GetOneCollaboratorHandler from '@modules/collaborators/services/queries/getone-collaborator-handler'
import GetOneOwnerHandler from '@modules/owner/services/queries/getone-owner-handler'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import { verify } from 'jsonwebtoken'

interface ShapePayload {
  id: string
}
export default async function checkListProductPermission(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const cookie = req.headers.cookie
  if (!cookie) {
    throw new AppError('Token Not Provider', 401)
  }

  const [token, trash] = cookie?.split(';')
  const [rest, auth] = token.split('=')
  const secret = `${process.env.APP_SECRET}`
  try {
    const decoded = verify(auth, secret)
    const { id } = decoded as ShapePayload
    const collaboratorService = container.resolve(GetOneCollaboratorHandler)
    const ownerService = container.resolve(GetOneOwnerHandler)
    const collaboratorExists = await collaboratorService.handler(id)
    const ownerExists = await ownerService.handler(id)
    if (ownerExists) {
      req.id = ownerExists.id
      req.name = ownerExists.name
      return next()
    }
    const hasPermission = collaboratorExists?.permissions.find(p =>
      p.slug.includes('listar-produtos')
    )
    if (!hasPermission) {
      throw new AppError('Você não tem permissão para esse Recurso', 403)
    }

    return next()
  } catch (error) {
    throw new AppError('invalid JWT Token', 401, error)
  }
}
