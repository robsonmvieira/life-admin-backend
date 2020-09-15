import MakeLoginHandler from '@modules/sessions/services/commands/create-session-handler'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
export default class SessionController {
  async login(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(MakeLoginHandler)
    const result = await service.handler(req.body)
    return res.status(200).json(result)
  }
}
