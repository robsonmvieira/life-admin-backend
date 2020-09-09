import AdminController from '@api/admin-controller'
import { Router } from 'express'

const routes = Router()
const adminCtl = new AdminController()


routes.get('/converter', adminCtl.convertXlsx)
routes.get('/listProductsFromDb', adminCtl.productsListLengthFromDb)

export default routes