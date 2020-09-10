import CreateRoleInput from '@modules/permissions/dtos/create-permission-input'
import UpdateRoleInput from "@modules/permissions/dtos/update-permission-input";
import { Repository, getRepository } from "typeorm";
import IRoleRepository from "@modules/roles/interfaces/IRoleRepository";
import Role from '@modules/roles/models/role';

export default class RoleRepository implements IRoleRepository{
  repo: Repository<Role>

  constructor() {
    this.repo = getRepository(Role)
  }

  async create(data: CreateRoleInput): Promise<Role> {
    return await this.repo.save(data)
     
  }
  async index(): Promise<Role[]> {
    return await this.repo.find()
  }
  async one(id: string): Promise<Role | undefined> {
    return await this.repo.findOne(id)
  }
  async update(id: string, data: UpdateRoleInput): Promise<Role | undefined> {
    const roleExists = await this.repo.findOne(id)
    if(!roleExists){
      return undefined
    }
    await this.repo.update(id, data)
    return await this.repo.findOne(id)
    
  }
  async remove(id: string): Promise<boolean> {
    const hasRole =await this.repo.findOne(id)

    if(!hasRole){
      return false
    }
    const permissionDeleted = await this.repo.delete(id)
    if(!permissionDeleted){
      return false
    }
    return true
  }
}