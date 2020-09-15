import AppError from '@infra/errors/AppError'
import enviromment from 'enviromments/enviromment'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
export interface ShapePayload {
  iat: number
  exp: number
  sub: string
  isActive: boolean
}

export default function guard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token Not Provider', 401)
  }
  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token, enviromment.auth.secret)
    const { sub, isActive } = decoded as ShapePayload
    req.entity = {
      id: sub,
      isActive: isActive
    }
    return next()
  } catch (error) {
    throw new AppError('invalid JWT Token', 401, error)
  }
}
