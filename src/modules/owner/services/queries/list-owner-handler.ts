import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'
import Owner from '@modules/owner/models/owner'

@injectable()
export default class ListOwnerHandler {
  constructor(@inject('OwnerRepository') private repo: IOwnerRepository) {}
  async handler(): Promise<Owner[]> {
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
