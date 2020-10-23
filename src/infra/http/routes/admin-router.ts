import AdminController from '@api/admin-controller'
import { Router } from 'express'

const routes = Router()
const adminController = new AdminController()

routes.post('/converter', adminController.convertXlsx)
routes.get('/listProductsFromDb', adminController.productsListLengthFromDb)
routes.get('/clearProductPDVTable', adminController.clearProductSale)

export default routes
