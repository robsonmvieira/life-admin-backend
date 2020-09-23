import Collaborator from '../models/collaborator'
import UpdateCollaboratorInput from '../dtos/update-collaborator-input'
import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'

export interface createCollaborator {
  name: string
  password: string
  email: string
  isActive?: boolean
  owner_id: string
  position: string
  roles: Role[]
  permissions: Permission[]
}

export default interface ICollaboratorRepository {
  create(data: createCollaborator): Promise<Collaborator>
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
