import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
@injectable()
export default class RemoveCollaboratorHandler {
  constructor(
    @inject('CollaboratorRepository') private repo: ICollaboratorRepository
  ) {}

  async handler(data: string): Promise<boolean> {
    try {
      return await this.repo.remove(data)
    } catch (error) {
      throw new AppError(
        'Não foi possível deltar o Colaborador solicitado',
        400,
        error
      )
    }
  }
}
