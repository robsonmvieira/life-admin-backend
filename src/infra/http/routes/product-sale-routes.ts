import {Router} from 'express'
import ProductSaleController from '@api/product-sale-controller'
const routes = Router()

const categoryCtr = new ProductSaleController()

routes.get('/', categoryCtr.index)
routes.get('/:id', categoryCtr.one)
routes.post('/', categoryCtr.create)
routes.put('/:id', categoryCtr.update)
routes.delete('/:id', categoryCtr.remove)

export default routes