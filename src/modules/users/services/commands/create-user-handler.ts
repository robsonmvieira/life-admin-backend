import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import CreateUserInput from '@modules/users/dtos/create-user-input'
import User from '@modules/users/models/user'
import Role from '@modules/roles/models/role'
import Permission from '@modules/permissions/models/permission'
import IEncripter from '@shared/encrypter/implementation/encripter'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
import IPermissionsRepository from '@modules/permissions/interfaces/IPermissionsRepository'
@injectable()
export default class CreateUserHandler {
  constructor(
    @inject('UserRepository') private repo: IUserRepository,
    @inject('PermissionsRepository')
    private permissionRepo: IPermissionsRepository,
    @inject('RoleRepository') private roleRepository: IRoleRepository,
    @inject('HashPassword') private encripterProvider: IEncripter
  ) {}

  async handler(data: CreateUserInput): Promise<User> {
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
      const savedUser = await this.repo.create(data)
      savedUser.roles = foundRoles.map(r => r)
      savedUser.permissions = foundPermissions.map(p => p)
      return await this.repo.save(savedUser)
    } catch (error) {
      throw new AppError('Os dados da Novo user estão incorretos', 400, error)
    }
  }
}
