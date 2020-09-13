import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import Collaborator from '@modules/collaborators/models/collaborator'

@injectable()
export default class ListCollaboratorsHandler {
  constructor(
    @inject('CollaboratorRepository') private repo: ICollaboratorRepository
  ) {}

  async handler(): Promise<Collaborator[]> {
    try {
      return await this.repo.index()
    } catch (error) {
      throw new AppError(
        'Um erro interno aconteceu. Tente mais tarde',
        500,
        error
      )
    }
  }
}
