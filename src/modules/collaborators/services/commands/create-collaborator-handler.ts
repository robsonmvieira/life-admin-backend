import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import User from '@modules/users/models/user'
import Role from '@modules/roles/models/role'
import Permission from '@modules/permissions/models/permission'
import IEncripter from '@shared/encrypter/implementation/encripter'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
import IPermissionsRepository from '@modules/permissions/interfaces/IPermissionsRepository'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import CreateCollaboratorInput from '@modules/collaborators/dtos/create-collaborator-input'
@injectable()
export default class CreateCollaboratorHandler {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('PermissionsRepository')
    private permissionRepo: IPermissionsRepository,
    @inject('RoleRepository') private roleRepository: IRoleRepository,
    @inject('CollaboratorRepository')
    private repo: ICollaboratorRepository,

    @inject('HashPassword') private encripterProvider: IEncripter
  ) {}

  async handler(data: CreateCollaboratorInput): Promise<User> {
    const permissions =
      data.permissionsId !== undefined ? data.permissionsId.split(',') : null

    const roles = data.rolesId !== undefined ? data.rolesId.split(',') : null
    data.name = data.name.trim()
    data.password = await this.encripterProvider.hashPassword(data.password)
    const foundPermissions: Permission[] = []
    const foundRoles: Role[] = []

    const securityRole = '83ee47bc-6580-41ff-abce-de794887be72'
    const securityPermission = '40420e14-dcf6-43c9-bf2e-030e8f1e0ef2'
    // if any role doesn't not provided, set basic role
    if (!roles) {
      const basicRole = await this.roleRepository.one(securityRole)
      if (basicRole) {
        foundRoles.push(basicRole)
      }
    } else {
      for (const f of roles) {
        const foundRole = await this.roleRepository.one(f.trim())
        if (foundRole) {
          foundRoles.push(foundRole)
        }
      }
    }

    // if any permission doesn't not provided, set basic permission
    if (!permissions) {
      const basicPermission = await this.permissionRepo.one(securityPermission)
      if (basicPermission) {
        foundPermissions.push(basicPermission)
      }
    } else {
      for (const f of permissions) {
        const foundPermission = await this.permissionRepo.one(f.trim())
        if (foundPermission) {
          foundPermissions.push(foundPermission)
        }
      }
    }

    const owner = await this.userRepository.one(data.company_id)
    if (!owner) {
      throw new AppError(
        'você não é possivel criar um colaborador sem um associado',
        400
      )
    }
    try {
      const savedCollaborator = await this.repo.create(data)
      savedCollaborator.roles = foundRoles.map(r => r)
      savedCollaborator.permissions = foundPermissions.map(p => p)
      savedCollaborator.user = owner
      // owner.collaborators.push(savedCollaborator)
      return await this.repo.save(savedCollaborator)
    } catch (error) {
      throw new AppError('Os dados da Novo user estão incorretos', 400, error)
    }
  }
}
