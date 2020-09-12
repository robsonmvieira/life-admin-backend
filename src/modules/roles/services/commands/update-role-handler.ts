import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import UpdateRoleInput from '@modules/roles/dtos/update-roles-input'
import Role from '@modules/roles/models/role'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'
@injectable()
export default class UpdateRoleHandler {
  constructor(@inject('RoleRepository') private repo: IRoleRepository) {}

  async handler(id: string, data: UpdateRoleInput): Promise<Role | undefined> {
    try {
      return await this.repo.update(id, data)
    } catch (error) {
      throw new AppError(
        'Os dados da Nova Role estão incorretos',
        401,
        error.message
      )
    }
  }
}
