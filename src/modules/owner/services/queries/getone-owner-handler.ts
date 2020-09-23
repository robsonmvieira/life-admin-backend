import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'
import Owner from '@modules/owner/models/owner'

@injectable()
export default class GetOneOwnerHandler {
  constructor(@inject('OwnerRepository') private repo: IOwnerRepository) {}

  async handler(id: string): Promise<Owner | undefined> {
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
