import { Repository, getRepository } from 'typeorm'

import User from '@modules/users/models/user'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
import CreateUserInput from '@modules/users/dtos/create-user-input'
import UpdateUserInput from '@modules/users/dtos/update-user-input'

export default class UserRepository implements IUserRepository {
  repo: Repository<User>

  constructor() {
    this.repo = getRepository(User)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userExists = await this.repo.findOne({ where: { email } })
    if (!userExists) {
      return undefined
    }
    return userExists
  }

  async save(data: User): Promise<User> {
    return this.repo.save(data)
  }

  async create(data: CreateUserInput): Promise<User> {
    const user = await this.repo.save(data)

    return user
  }

  async index(): Promise<User[]> {
    return await this.repo.find()
  }

  async one(id: string): Promise<User | undefined> {
    return await this.repo.findOne(id)
  }

  async update(id: string, data: UpdateUserInput): Promise<User | undefined> {
    const UserExists = await this.repo.findOne(id)
    if (!UserExists) {
      return undefined
    }
    await this.repo.update(id, data)
    return await this.repo.findOne(id)
  }

  async remove(id: string): Promise<boolean> {
    const hasUser = await this.repo.findOne(id)

    if (!hasUser) {
      return false
    }
    const userDeleted = await this.repo.delete(id)
    if (!userDeleted) {
      return false
    }
    return true
  }
}
