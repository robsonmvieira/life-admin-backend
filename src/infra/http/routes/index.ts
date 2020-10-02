import { Router } from 'express'
import categoryRoutes from './category-routes'
import productRoutes from './product-sale-routes'
import adminRoutes from './admin-router'
import ownerRoutes from './owner-router'
import permissionRoutes from './permission-router'
import rolesRoutes from './role-router'
import collaboratorRoutes from './collaborator-router'
import sessionRouters from './sessions-route'
import salesPDVroutes from './sale-router'
const routes = Router()

routes.use('/categories', categoryRoutes)
routes.use('/products', productRoutes)
routes.use('/admin', adminRoutes)
routes.use('/owners', ownerRoutes)
// routes.use('/sales', saleRoutes)
routes.use('/permissions', permissionRoutes)
routes.use('/roles', rolesRoutes)
routes.use('/collaborators', collaboratorRoutes)
routes.use('/sessions', sessionRouters)
routes.use('/salesPDV', salesPDVroutes)

export default routes
