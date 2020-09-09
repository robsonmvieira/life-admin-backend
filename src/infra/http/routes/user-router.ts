import UserController from '@api/user-controller.ts'
import { Router } from 'express'
const userController = new UserController()
const routes = Router()

routes.get('/', userController.index)
routes.get('/:id', userController.one)
routes.post('/', userController.create)
routes.put('/:id', userController.update)
routes.delete('/:id', userController.remove)

export default routes