import {container} from 'tsyringe'
import ICategoryRepository from '@modules/categories/interfaces/ICategoryRepository'
import CategoryRepository from '@infra/repositories/categoryRepository'
import IProductSaleRepository from '@modules/products/interfaces/IProductSaleRepository'
import ProductSaleRepository from '@infra/repositories/productSaleRepository'
import IPermissionsRepository from '@modules/permissions/interfaces/IPermissionsRepository'
import PermissionRepository from '@infra/repositories/permissionRepository'

container.registerSingleton<ICategoryRepository>("CategoryRepository", CategoryRepository)
container.registerSingleton<IProductSaleRepository>("ProductSaleRepository", ProductSaleRepository)
container.registerSingleton<IPermissionsRepository>("PermissionsRepository", PermissionRepository)