import Collaborator from '../models/collaborator'
import CreateCollaboratorInput from '../dtos/create-collaborator-input'
import UpdateCollaboratorInput from '../dtos/update-collaborator-input'

export default interface ICollaboratorRepository {
  create(data: CreateCollaboratorInput): Promise<Collaborator>
  index(): Promise<Collaborator[]>
  one(id: string): Promise<Collaborator | undefined>
  findByEmail(email: string): Promise<Collaborator | undefined>
  update(
    id: string,
    data: UpdateCollaboratorInput
  ): Promise<Collaborator | undefined>
  remove(id: string): Promise<boolean>
  save(data: Collaborator): Promise<Collaborator>
}
