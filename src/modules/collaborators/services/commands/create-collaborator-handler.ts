import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import Role from '@modules/roles/models/role'
import Permission from '@modules/permissions/models/permission'
import IEncripter from '@shared/encrypter/implementation/encripter'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
import IPermissionsRepository from '@modules/permissions/interfaces/IPermissionsRepository'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import CreateCollaboratorInput from '@modules/collaborators/dtos/create-collaborator-input'
import Collaborator from '@modules/collaborators/models/collaborator'
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

  async handler(data: CreateCollaboratorInput): Promise<Collaborator> {
    const { roles, permissions } = data

    if (!roles && !permissions) {
      throw new AppError(
        'Você precisa informa ao menos perfil e uma permissão para esse Colaborador',
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
      return await this.repo.save(savedCollaborator)
    } catch (error) {
      throw new AppError('Os dados da Novo user estão incorretos', 400, error)
    }
  }
}
