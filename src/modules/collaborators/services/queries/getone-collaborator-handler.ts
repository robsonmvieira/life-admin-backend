import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'

import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import Collaborator from '@modules/collaborators/models/collaborator'

@injectable()
export default class GetOneCollaboratorHandler {
  constructor(
    @inject('CollaboratorRepository') private repo: ICollaboratorRepository
  ) {}

  async handler(id: string): Promise<Collaborator | undefined> {
    try {
      return await this.repo.one(id)
    } catch (error) {
      throw new AppError(
        'Um erro ocorreu ao tentar buscar o colaborador',
        401,
        error.TypeError
      )
    }
  }
}
