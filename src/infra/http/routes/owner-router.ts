import OwnerController from '@api/owner-controller'
import { Router } from 'express'
import authenticated from '../../../shared/middlewares/auth'
import checkRoleMiddleware from '../../../shared/middlewares/check-roles'
const userController = new OwnerController()
const routes = Router()
// routes.use(authenticated)
// routes.use(checkRoleMiddleware)

routes.get('/', userController.index)
routes.get('/:id', userController.one)
routes.post('/', userController.create)
routes.put('/:id', userController.update)
routes.delete('/:id', userController.remove)

export default routes
