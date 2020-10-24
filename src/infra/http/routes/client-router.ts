import { Router } from 'express'
import ClientController from '@api/client-controller'

const routes = Router()

const clientController = new ClientController()

routes.get('/', clientController.index)
// routes.get('/:id', clientController.one)
routes.post('/', clientController.create)
// routes.put('/:id', clientController.update)
// routes.delete('/:id', clientController.remove)
export default routes
