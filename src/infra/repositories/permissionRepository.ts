import IPermissionsRepository from "@modules/permissions/interfaces/IPermissionsRepository";
import CreatePermissionInput from '@modules/permissions/dtos/create-permission-input'
import Permission from "@modules/permissions/models/permission";
import UpdatePermissionInput from "@modules/permissions/dtos/update-permission-input";
import { Repository, getRepository } from "typeorm";

export default class PermissionRepository implements IPermissionsRepository{
  repo: Repository<Permission>

  constructor() {
    this.repo = getRepository(Permission)
  }

  async create(data: CreatePermissionInput): Promise<Permission> {
    return await this.repo.save(data)
     
  }
  async index(): Promise<Permission[]> {
    return await this.repo.find()
  }
  async one(id: string): Promise<Permission | undefined> {
    return await this.repo.findOne(id)
  }
  async update(id: string, data: UpdatePermissionInput): Promise<Permission | undefined> {
    const permissionExists = await this.repo.findOne(id)
    if(!permissionExists){
      return undefined
    }
    await this.repo.update(id, data)
    return await this.repo.findOne(id)
    
  }
  async remove(id: string): Promise<boolean> {
    const hasPermission =await this.repo.findOne(id)

    if(!hasPermission){
      return false
    }
    const permissionDeleted = await this.repo.delete(id)
    if(!permissionDeleted){
      return false
    }
    return true
  }
}