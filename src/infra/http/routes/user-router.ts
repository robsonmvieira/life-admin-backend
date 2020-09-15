import UserController from '@api/user-controller'
import { Router } from 'express'
import authenticated from '../../../shared/middlewares/auth'
const userController = new UserController()
const routes = Router()
routes.use(authenticated)
routes.get('/', userController.index)
routes.get('/:id', userController.one)
routes.post('/', userController.create)
routes.put('/:id', userController.update)
routes.delete('/:id', userController.remove)

export default routes
