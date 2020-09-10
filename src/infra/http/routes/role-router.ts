import {Router} from 'express'
import RoleController from '@api/role-controller'

const routes = Router()

const roleController = new RoleController()

routes.get('/', roleController.index)
routes.get('/:id', roleController.one)
routes.post('/', roleController.create)
routes.put('/:id', roleController.update)
routes.delete('/:id', roleController.remove)


export default routes