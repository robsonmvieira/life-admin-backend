/* eslint-disable comma-spacing */
/* eslint-disable space-infix-ops */
/* eslint-disable prettier/prettier */
import MakeLoginHandler from '@modules/sessions/services/commands/create-session-handler'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import cookie from 'cookie'
export default class SessionController {
  async login(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(MakeLoginHandler)
    const result = await service.handler(req.body)

    // res.setHeader(
    //   'Set-Cookie',
    //   cookie.serialize('token', result.token, {
    //     httpOnly: true,
    //     sameSite: 'lax',
    //     maxAge: 86400,
    //     path: '/',
    //     secure: true
    //   })
    // )
    // res.cookie('userName', result.name)
    // res.cookie('userId', result.id)

    return res.status(200).json({ status: true })
  }
}
