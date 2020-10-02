import UpdateOwnerInput from '@modules/owner/dtos/update-owner-input'
import IOwnerRepository, {
  createOwner
} from '@modules/owner/interfaces/IOwnerRepository'
import Owner from '@modules/owner/models/owner'
import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'

export default class FakeOwnerRepository implements IOwnerRepository {
  repo: Owner[] = []
  async create(data: createOwner): Promise<Owner> {
    const role = new Role()
    role.name = 'any name'
    role.description = 'any name'
    role.slug = 'any name'
    role.created_at = new Date()
    role.updated_at = new Date()
    role.id = 'any_id'

    const permission = new Permission()
    role.name = 'any name'
    role.description = 'any name'
    role.slug = 'any name'
    role.created_at = new Date()
    role.updated_at = new Date()
    role.id = 'any_id'

    const owner = new Owner()
    owner.id = 'any_id'
    owner.email = data.email
    owner.created_at = new Date()
    owner.updated_at = new Date()
    owner.isActive = true
    owner.name = data.name
    owner.password = data.password
    owner.roles = [role]
    owner.permissions = [permission]

    this.repo.push(owner)
    return owner
  }

  async save(data: Owner): Promise<Owner> {
    const owner = new Owner()
    owner.id = 'any_id'
    owner.email = data.email
    owner.created_at = new Date()
    owner.updated_at = new Date()
    owner.isActive = true
    owner.name = data.name
    owner.password = data.password
    owner.roles = [new Role()]
    owner.permissions.push(new Permission())

    this.repo.push(owner)
    return owner
  }

  async index(): Promise<Owner[]> {
    return this.repo
  }

  async one(id: string): Promise<Owner | undefined> {
    const response = this.repo.find(r => r.id === id)
    if (!response) {
      return undefined
    }
    return response
  }

  async update(id: string, data: UpdateOwnerInput): Promise<Owner | undefined> {
    const ownerExists = this.repo.find(r => r.id === id)
    if (!ownerExists) {
      return undefined
    }
    const merge = Object.assign(ownerExists, data)
    this.repo = this.repo.filter(r => r.id !== merge.id)
    this.repo.push(merge)
    return ownerExists
  }

  async remove(id: string): Promise<boolean> {
    const hasowner = this.repo.find(r => r.id === id)

    if (!hasowner) {
      return false
    }
    this.repo = this.repo.filter(r => r.id !== id)

    return true
  }

  async findByEmail(data: string): Promise<Owner | undefined> {
    const response = this.repo.find(r => r.email === data)
    if (!response) {
      return undefined
    }
    return response
  }
}
