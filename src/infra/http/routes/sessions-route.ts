import SessionController from '@api/session-controller'
import { Router } from 'express'
const sessionController = new SessionController()
const routes = Router()

routes.post('/', sessionController.login)

export default routes
