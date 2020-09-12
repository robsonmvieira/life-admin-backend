import CreateRoleInput from '@modules/roles/dtos/create-roles-input'
import UpdateRoleInput from '@modules/roles/dtos/update-roles-input'
import IRoleRepository from '@modules/roles/interfaces/IRoleRepository'
import Role from '@modules/roles/models/role'

export default class FakeRoleRepository implements IRoleRepository {
  repo: Role[] = []
  async create(data: CreateRoleInput): Promise<Role> {
    const role = new Role()
    role.description = data.description
    role.id = 'any_id'
    role.name = data.name
    role.slug = data.slug
    role.created_at = new Date()
    role.updated_at = new Date()
    this.repo.push(role)
    return role
  }

  async index(): Promise<Role[]> {
    return this.repo
  }

  async one(id: string): Promise<Role | undefined> {
    const response = this.repo.find(r => r.id === id)
    if (!response) {
      return undefined
    }
    return response
  }

  async update(id: string, data: UpdateRoleInput): Promise<Role | undefined> {
    const roleExists = this.repo.find(r => r.id === id)
    if (!roleExists) {
      return undefined
    }
    const merge = Object.assign(roleExists, data)
    this.repo = this.repo.filter(r => r.id !== merge.id)
    this.repo.push(merge)
    return roleExists
  }

  async remove(id: string): Promise<boolean> {
    const hasRole = this.repo.find(r => r.id === id)

    if (!hasRole) {
      return false
    }
    this.repo = this.repo.filter(r => r.id !== id)

    return true
  }
}
