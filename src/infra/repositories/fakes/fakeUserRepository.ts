import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'
import CreateUserInput from '@modules/users/dtos/create-user-input'
import UpdateUserInput from '@modules/users/dtos/update-user-input'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
import User from '@modules/users/models/user'

export default class FakeUserRepository implements IUserRepository {
  repo: User[] = []
  async create(data: CreateUserInput): Promise<User> {
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

    const user = new User()
    user.id = 'any_id'
    user.email = data.email
    user.created_at = new Date()
    user.updated_at = new Date()
    user.isActive = true
    user.name = data.name
    user.password = data.password
    user.roles = [role]
    user.permissions = [permission]

    this.repo.push(user)
    return user
  }

  async save(data: User): Promise<User> {
    const user = new User()
    user.id = 'any_id'
    user.email = data.email
    user.created_at = new Date()
    user.updated_at = new Date()
    user.isActive = true
    user.name = data.name
    user.password = data.password
    user.roles = [new Role()]
    user.permissions.push(new Permission())

    this.repo.push(user)
    return user
  }

  async index(): Promise<User[]> {
    return this.repo
  }

  async one(id: string): Promise<User | undefined> {
    const response = this.repo.find(r => r.id === id)
    if (!response) {
      return undefined
    }
    return response
  }

  async update(id: string, data: UpdateUserInput): Promise<User | undefined> {
    const userExists = this.repo.find(r => r.id === id)
    if (!userExists) {
      return undefined
    }
    const merge = Object.assign(userExists, data)
    this.repo = this.repo.filter(r => r.id !== merge.id)
    this.repo.push(merge)
    return userExists
  }

  async remove(id: string): Promise<boolean> {
    const hasUser = this.repo.find(r => r.id === id)

    if (!hasUser) {
      return false
    }
    this.repo = this.repo.filter(r => r.id !== id)

    return true
  }

  async findByEmail(data: string): Promise<User | undefined> {
    const response = this.repo.find(r => r.email === data)
    if (!response) {
      return undefined
    }
    return response
  }
}
