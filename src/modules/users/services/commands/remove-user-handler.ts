import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
@injectable()
export default class RemoveUserHandler {
  constructor(@inject('UserRepository') private repo: IUserRepository) {}

  async handler(data: string): Promise<boolean> {
    try {
      return await this.repo.remove(data)
    } catch (error) {
      throw new AppError(
        'Não foi possível deltar o Usuário solicitado',
        400,
        error
      )
    }
  }
}
