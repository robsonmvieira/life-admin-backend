import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'

import User from '@modules/users/models/user'
import IUserRepository from '@modules/users/interfaces/IUserRepository'

@injectable()
export default class GetOneUserHandler {
  constructor(@inject('UserRepository') private repo: IUserRepository) {}

  async handler(id: string): Promise<User | undefined> {
    try {
      return await this.repo.one(id)
    } catch (error) {
      throw new AppError(
        'Um erro ocorreu ao tentar Buscar um User',
        401,
        error.TypeError
      )
    }
  }
}
