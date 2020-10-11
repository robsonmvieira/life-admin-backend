import AssociateController from '@api/associate-controller'
import { Router } from 'express'

const routes = Router()
const associateController = new AssociateController()

routes.get('/salesOfDay', associateController.getSalesOfDay)
routes.get('/productByLike', associateController.getproductByLike)

export default routes
