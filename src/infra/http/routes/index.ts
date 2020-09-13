import { Router } from 'express'
import categoryRoutes from './category-routes'
import productRoutes from './product-sale-routes'
import adminRoutes from './admin-router'
import saleRoutes from './sale-router'
import userRoutes from './user-router'
import permissionRoutes from './permission-router'
import rolesRoutes from './role-router'
import collaboratorRoutes from './collaborator-router'
const routes = Router()

routes.use('/categories', categoryRoutes)
routes.use('/products', productRoutes)
routes.use('/admin', adminRoutes)
routes.use('/users', userRoutes)
routes.use('/sales', saleRoutes)
routes.use('/permissions', permissionRoutes)
routes.use('/roles', rolesRoutes)
routes.use('/collaborators', collaboratorRoutes)

export default routes
