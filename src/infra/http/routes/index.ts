import {Router} from 'express'
import categoryRoutes from './category-routes'
import productRoutes from './product-sale-routes'
import adminRoutes from './admin-router'
const routes = Router()

routes.use('/categories', categoryRoutes)
routes.use('/products', productRoutes)
routes.use('/admin', adminRoutes)

export default routes