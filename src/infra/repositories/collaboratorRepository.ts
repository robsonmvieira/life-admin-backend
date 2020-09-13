import { Repository, getRepository } from 'typeorm'

import Collaborator from '@modules/collaborators/models/collaborator'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import CreateCollaboratorInput from '@modules/collaborators/dtos/create-collaborator-input'
import UpdateCollaboratorInput from '@modules/collaborators/dtos/update-collaborator-input'

export default class CollaboratorRepository implements ICollaboratorRepository {
  repo: Repository<Collaborator>

  constructor() {
    this.repo = getRepository(Collaborator)
  }

  async save(data: Collaborator): Promise<Collaborator> {
    return this.repo.save(data)
  }

  async create(data: CreateCollaboratorInput): Promise<Collaborator> {
    return await this.repo.save(data)
  }

  async index(): Promise<Collaborator[]> {
    return await this.repo.find({ relations: ['user'] })
  }

  async one(id: string): Promise<Collaborator | undefined> {
    return await this.repo.findOne(id)
  }

  async update(
    id: string,
    data: UpdateCollaboratorInput
  ): Promise<Collaborator | undefined> {
    const CollaboratorExists = await this.repo.findOne(id)
    if (!CollaboratorExists) {
      return undefined
    }
    await this.repo.update(id, data)
    return await this.repo.findOne(id)
  }

  async remove(id: string): Promise<boolean> {
    const hasCollaborator = await this.repo.findOne(id)

    if (!hasCollaborator) {
      return false
    }
    const CollaboratorDeleted = await this.repo.delete(id)
    if (!CollaboratorDeleted) {
      return false
    }
    return true
  }
}
