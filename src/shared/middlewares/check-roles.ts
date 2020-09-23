import AppError from '@infra/errors/AppError'
import GetOneUserHandler from '@modules/users/services/queries/getone-user-handler'
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

export default async function checkRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.entity
  const service = container.resolve(GetOneUserHandler)
  const userExists = await service.handler(id)
  if (!userExists) {
    throw new AppError('Você não tem permissão para esse Recurso', 403)
  }
  return next()
}
