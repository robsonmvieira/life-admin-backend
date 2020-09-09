import { injectable, inject } from "tsyringe";
import PermissionRepository from "@infra/repositories/permissionRepository";
import Permission from "@modules/permissions/models/permission";
import AppError from '@infra/errors/AppError'
import UpdatePermissionInput from "@modules/permissions/dtos/update-permission-input";
@injectable()
export default class UpdatePermissionHandler{

  constructor(@inject("PermissionsRepository") private repo: PermissionRepository) {}

  async handler(id: string,data: UpdatePermissionInput): Promise<Permission| undefined>{

    try {
      return await this.repo.update(id, data)
    } catch (error) {
      throw new AppError("Os dados da Nova Permissão estão incorretos", 401, error.message)
    }
  }
}