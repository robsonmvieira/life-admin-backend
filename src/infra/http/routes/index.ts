import {Router} from 'express'
import categoryRoutes from './category-routes'
import productRoutes from './product-sale-routes'
const routes = Router()

routes.use('/categories', categoryRoutes)
routes.use('/products', productRoutes)

export default routes