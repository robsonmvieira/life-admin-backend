import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'

import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import UpdateCollaboratorInput from '@modules/collaborators/dtos/update-collaborator-input'
import Collaborator from '@modules/collaborators/models/collaborator'
@injectable()
export default class UpdateCollaboratorHandler {
  constructor(
    @inject('CollaboratorRepository') private repo: ICollaboratorRepository
  ) {}

  async handler(
    id: string,
    data: UpdateCollaboratorInput
  ): Promise<Collaborator | undefined> {
    try {
      return await this.repo.update(id, data)
    } catch (error) {
      throw new AppError(
        'Os dados da Novo Colaborador estão incorretos',
        401,
        error.message
      )
    }
  }
}
