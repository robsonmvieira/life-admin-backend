import { Router } from 'express'
import rolesRoutes from './role-router'
import ownerRoutes from './owner-router'
import adminRoutes from './admin-router'
import clientRoutes from './client-router'
import salesPDVroutes from './sale-router'
import sessionRouters from './sessions-route'
import categoryRoutes from './category-routes'
import associateRoutes from './associate-router'
import productRoutes from './product-sale-routes'
import permissionRoutes from './permission-router'
import collaboratorRoutes from './collaborator-router'

const routes = Router()

routes.use('/roles', rolesRoutes)
routes.use('/admin', adminRoutes)
routes.use('/owners', ownerRoutes)
routes.use('/clients', clientRoutes)
routes.use('/products', productRoutes)
routes.use('/salesPDV', salesPDVroutes)
routes.use('/sessions', sessionRouters)
routes.use('/categories', categoryRoutes)
routes.use('/associates', associateRoutes)
routes.use('/permissions', permissionRoutes)
routes.use('/collaborators', collaboratorRoutes)

export default routes
