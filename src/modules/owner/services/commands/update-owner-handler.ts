import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'

import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'
import UpdateOwnerInput from '@modules/owner/dtos/update-owner-input'
import Owner from '@modules/owner/models/owner'
@injectable()
export default class UpdateOwnerHandler {
  constructor(@inject('OwnerRepository') private repo: IOwnerRepository) {}
  async handler(
    id: string,
    data: UpdateOwnerInput
  ): Promise<Owner | undefined> {
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
