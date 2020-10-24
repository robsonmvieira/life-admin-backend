import { container } from 'tsyringe'
import '@shared/dependencyInjection'
import ICategoryRepository from '@modules/categories/interfaces/ICategoryRepository'
import CategoryRepository from '@infra/repositories/categoryRepository'
import IProductSaleRepository from '@modules/products/interfaces/IProductSaleRepository'
import ProductSaleRepository from '@infra/repositories/productSaleRepository'
import IPermissionsRepository from '@modules/permissions/interfaces/IPermissionsRepository'
import PermissionRepository from '@infra/repositories/permissionRepository'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'
import RoleRepository from '@infra/repositories/roleRepository'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import CollaboratorRepository from '@infra/repositories/collaboratorRepository'
import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'
import OwnerRepository from '@infra/repositories/ownerRepository'
import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
import SalesPDVRepository from '@infra/repositories/salesRepository'
import IItemSalesPDVRepository from '@modules/itemSalesPDV/interfaces/IItemSalesPDVRepository'
import ItemSalesPDVRepository from '@infra/repositories/itemSalesPDVRepository'
import IClientRepository from '@modules/clients/interfaces/IClientRepository'
import ClientRepository from '@infra/repositories/clientRepository'

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
)
container.registerSingleton<IProductSaleRepository>(
  'ProductSaleRepository',
  ProductSaleRepository
)
container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionRepository
)
container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository)
container.registerSingleton<IOwnerRepository>(
  'OwnerRepository',
  OwnerRepository
)
container.registerSingleton<ICollaboratorRepository>(
  'CollaboratorRepository',
  CollaboratorRepository
)

container.registerSingleton<ISalesPDVRepository>(
  'SalesPDVRepository',
  SalesPDVRepository
)
container.registerSingleton<IItemSalesPDVRepository>(
  'ItemSalesPDVRepository',
  ItemSalesPDVRepository
)
container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository
)
