import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import Role from '@modules/roles/models/role'
import Permission from '@modules/permissions/models/permission'
import IEncripter from '@shared/encrypter/implementation/encripter'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'
import IPermissionsRepository from '@modules/permissions/interfaces/IPermissionsRepository'
import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'
import CreateOwnerInput from '@modules/owner/dtos/create-owner-input'
import Owner from '@modules/owner/models/owner'
@injectable()
export default class CreateOwnerHandler {
  constructor(
    @inject('OwnerRepository') private repo: IOwnerRepository,
    @inject('PermissionsRepository')
    private permissionRepo: IPermissionsRepository,
    @inject('RoleRepository') private roleRepository: IRoleRepository,
    @inject('HashPassword') private encripterProvider: IEncripter
  ) {}

  async handler(data: CreateOwnerInput): Promise<Owner> {
    const { roles, permissions } = data

    if (!roles && !permissions) {
      throw new AppError(
        'Você precisa informa ao menos perfil e uma permissão para esse Usuário',
        400
      )
    }
    const extractedRoles = roles.split(',')
    const extractPermissions = permissions.split(',')
    data.name = data.name.trim()
    data.password = await this.encripterProvider.hashPassword(data.password)
    const foundPermissions: Permission[] = []
    const foundRoles: Role[] = []

    for (const f of extractedRoles) {
      const role = await this.roleRepository.one(f.trim())
      if (role) {
        foundRoles.push(role)
      }
    }

    for (const f of extractPermissions) {
      const permission = await this.permissionRepo.one(f.trim())
      if (permission) {
        foundPermissions.push(permission)
      }
    }

    try {
      const owner = {
        name: data.name,
        password: data.password,
        email: data.email,
        isAdmin: data.isAdmin,
        isActive: data.isActive,
        roles: [],
        permissions: []
      }
      const savedOwner = await this.repo.create(owner)
      savedOwner.roles = foundRoles.map(r => r)
      savedOwner.permissions = foundPermissions.map(p => p)

      return await this.repo.save(savedOwner)
    } catch (error) {
      throw new AppError('Os dados da Novo user estão incorretos', 400, error)
    }
  }
}
