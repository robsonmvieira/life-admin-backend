import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import Role from '@modules/roles/models/role'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'

@injectable()
export default class ListRolesHandler {
  constructor(@inject('RoleRepository') private repo: IRoleRepository) {}

  async handler(): Promise<Role[]> {
    try {
      return await this.repo.index()
    } catch (error) {
      throw new AppError(
        'Um erro interno aconteceu. Tente mais tarde',
        500,
        error
      )
    }
  }
}
