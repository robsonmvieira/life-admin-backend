import { injectable, inject } from "tsyringe";
import PermissionRepository from "@infra/repositories/permissionRepository";
import CreatePermissionInput from "@modules/permissions/dtos/create-permission-input";
import Permission from "@modules/permissions/models/permission";
import AppError from '@infra/errors/AppError'
@injectable()
export default class CreatePermissionHandler{

  constructor(@inject("PermissionsRepository") private repo: PermissionRepository) {}

  async handler(data: CreatePermissionInput): Promise<Permission>{

    try {
      return await this.repo.create(data)
    } catch (error) {
      throw new AppError("Os dados da Nova Permissão estão incorretos", 400, error)
    }
  }
}