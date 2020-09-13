import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import User from '@modules/users/models/user'
import IUserRepository from '@modules/users/interfaces/IUserRepository'

@injectable()
export default class ListUsersHandler {
  constructor(@inject('UserRepository') private repo: IUserRepository) {}

  async handler(): Promise<User[]> {
    try {
      const users = await this.repo.index()
      return users
    } catch (error) {
      throw new AppError(
        'Um erro interno aconteceu. Tente mais tarde',
        500,
        error
      )
    }
  }
}
