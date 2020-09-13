import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'

import UpdateUserInput from '@modules/users/dtos/update-user-input'
import User from '@modules/users/models/user'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
@injectable()
export default class UpdateUserHandler {
  constructor(@inject('UserRepository') private repo: IUserRepository) {}
  async handler(id: string, data: UpdateUserInput): Promise<User | undefined> {
    try {
      return await this.repo.update(id, data)
    } catch (error) {
      throw new AppError(
        'Os dados da Novo Usurário estão incorretos',
        401,
        error.message
      )
    }
  }
}
