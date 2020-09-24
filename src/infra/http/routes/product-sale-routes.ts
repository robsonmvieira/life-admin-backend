import { Router } from 'express'
import ProductSaleController from '@api/product-sale-controller'
import authenticated from '../../../shared/middlewares/auth'
import checkRoleMiddleware from '../../../shared/middlewares/check-roles'
import checkListProductPermission from '@shared/middlewares/check-list-product'
const productController = new ProductSaleController()
const routes = Router()
routes.use(authenticated)
// routes.use(checkRoleMiddleware)
routes.get('/', [checkListProductPermission], productController.index)
routes.get('/:id', productController.one)
routes.post('/', productController.create)
routes.put('/:id', productController.update)
routes.delete('/:id', productController.remove)

export default routes
