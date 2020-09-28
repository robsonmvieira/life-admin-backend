import AppError from '@infra/errors/AppError'
import GetOneOwnerHandler from '@modules/owner/services/queries/getone-owner-handler'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export default async function checkRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.entity
  const service = container.resolve(GetOneOwnerHandler)
  const ownerExists = await service.handler(id)
  if (!ownerExists) {
    throw new AppError('Você não tem permissão para esse Recurso', 403)
  }
  return next()
}
