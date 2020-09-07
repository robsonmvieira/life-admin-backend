import {Router} from 'express'
import CategoryController from '@api/category-controller'

const routes = Router()

const categoryCtr = new CategoryController()

routes.get('/', categoryCtr.index)
routes.get('/:id', categoryCtr.one)
routes.post('/', categoryCtr.create)
routes.put('/:id', categoryCtr.update)
routes.delete('/:id', categoryCtr.remove)

export default routes