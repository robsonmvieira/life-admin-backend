import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'
import UpdateOwnerInput from '../dtos/update-owner-input'
import Owner from '../models/owner'

export interface createOwner {
  name: string
  password: string
  email: string
  isAdmin?: boolean
  isActive?: boolean
  roles: Role[]
  permissions: Permission[]
}

export default interface IOwnerRepository {
  create(data: createOwner): Promise<Owner>
  index(): Promise<Owner[]>
  findByEmail(email: string): Promise<Owner | undefined>
  one(id: string): Promise<Owner | undefined>
  update(id: string, data: UpdateOwnerInput): Promise<Owner | undefined>
  remove(id: string): Promise<boolean>
  save(data: Owner): Promise<Owner>
}
