import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import Role from '@modules/roles/models/role'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'

@injectable()
export default class GetOneRoleHandler {
  constructor(@inject('RoleRepository') private repo: IRoleRepository) {}

  async handler(id: string): Promise<Role | undefined> {
    try {
      return await this.repo.one(id)
    } catch (error) {
      throw new AppError(
        'Um erro ocorreu ao tentar Buscar uma Role',
        401,
        error.TypeError
      )
    }
  }
}
