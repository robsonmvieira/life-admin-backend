import SaleController from '@api/sale-controller'
import { Router } from 'express'
const sale = new SaleController()
const routes = Router()

routes.get('/', sale.index)
routes.get('/:id', sale.one)
routes.post('/', sale.create)

export default routes
