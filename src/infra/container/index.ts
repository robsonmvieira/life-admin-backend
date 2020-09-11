import {container} from 'tsyringe'
import ICategoryRepository from '@modules/categories/interfaces/ICategoryRepository'
import CategoryRepository from '@infra/repositories/categoryRepository'
import IProductSaleRepository from '@modules/products/interfaces/IProductSaleRepository'
import ProductSaleRepository from '@infra/repositories/productSaleRepository'
import IPermissionsRepository from '@modules/permissions/interfaces/IPermissionsRepository'
import PermissionRepository from '@infra/repositories/permissionRepository'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'
import RoleRepository from '@infra/repositories/roleRepository'
import IUserRepository from '@modules/users/interfaces/IRoleRepository'
import UserRepository from '@infra/repositories/userRepository'

container.registerSingleton<ICategoryRepository>("CategoryRepository", CategoryRepository)
container.registerSingleton<IProductSaleRepository>("ProductSaleRepository", ProductSaleRepository)
container.registerSingleton<IPermissionsRepository>("PermissionsRepository", PermissionRepository)
container.registerSingleton<IRoleRepository>("RoleRepository", RoleRepository)
container.registerSingleton<IUserRepository>("UserRepository", UserRepository)