import { Router } from 'express'
import PermissionController from '@api/permission-controller'

const routes = Router()

const permissionController = new PermissionController()

routes.get('/', permissionController.index)
routes.get('/:id', permissionController.one)
routes.post('/', permissionController.create)
routes.put('/:id', permissionController.update)
routes.delete('/:id', permissionController.remove)
export default routes
