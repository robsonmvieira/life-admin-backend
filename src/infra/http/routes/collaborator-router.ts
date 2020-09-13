import CollaBoratorController from '@api/collaborator-controller'
import { Router } from 'express'
const collaboratorController = new CollaBoratorController()
const routes = Router()

routes.get('/', collaboratorController.index)
routes.get('/:id', collaboratorController.one)
routes.post('/', collaboratorController.create)
routes.put('/:id', collaboratorController.update)
routes.delete('/:id', collaboratorController.remove)

export default routes
