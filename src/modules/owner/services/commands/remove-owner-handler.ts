import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'

@injectable()
export default class RemoveOwnerHandler {
  constructor(@inject('OwnerRepository') private repo: IOwnerRepository) {}

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
