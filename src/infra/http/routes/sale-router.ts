import SaleController from '@api/sale-controller.ts'
import { Router } from 'express'
const sale = new SaleController()
const routes = Router()

routes.get('/', sale.index)
routes.get('/:id', sale.one)
routes.post('/', sale.create)
routes.put('/:id', sale.update)
routes.delete('/:id', sale.remove)

export default routes