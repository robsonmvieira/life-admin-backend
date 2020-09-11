import CreateUserInput from '@modules/permissions/dtos/create-permission-input'
import UpdateUserInput from "@modules/permissions/dtos/update-permission-input";
import { Repository, getRepository } from "typeorm";

import User from '@modules/users/models/user';
import IUserRepository from '@modules/users/interfaces/IRoleRepository';

export default class UserRepository implements IUserRepository{
  repo: Repository<User>

  constructor() {
    this.repo = getRepository(User)
  }
  async save(data: User): Promise<User> {
    return this.repo.save(data)
  }

  async create(data: CreateUserInput): Promise<User> {
    return await this.repo.save(data)
     
  }
  async index(): Promise<User[]> {
    return await this.repo.find()
  }
  async one(id: string): Promise<User | undefined> {
    return await this.repo.findOne(id)
  }
  async update(id: string, data: UpdateUserInput): Promise<User | undefined> {
    const UserExists = await this.repo.findOne(id)
    if(!UserExists){
      return undefined
    }
    await this.repo.update(id, data)
    return await this.repo.findOne(id)
    
  }
  async remove(id: string): Promise<boolean> {
    const hasUser =await this.repo.findOne(id)

    if(!hasUser){
      return false
    }
    const userDeleted = await this.repo.delete(id)
    if(!userDeleted){
      return false
    }
    return true
  }
}