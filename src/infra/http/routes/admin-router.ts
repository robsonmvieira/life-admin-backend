import AdminController from '@api/admin-controller'
import { Router } from 'express'

const routes = Router()
const adminCtl = new AdminController()

routes.post('/converter', adminCtl.convertXlsx)
routes.get('/listProductsFromDb', adminCtl.productsListLengthFromDb)

export default routes
