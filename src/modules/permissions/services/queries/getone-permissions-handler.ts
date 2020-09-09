import { injectable, inject } from "tsyringe"
import PermissionRepository from "@infra/repositories/permissionRepository"
import Permission from "@modules/permissions/models/permission"
import AppError from "@infra/errors/AppError"

@injectable()
export default class GetOnePermissionHandler{

  constructor(@inject("PermissionsRepository") private repo: PermissionRepository) {}

  async handler(id: string): Promise<Permission| undefined>{

    try {
      return await this.repo.one(id)
    } catch (error) {
      throw new AppError("Um erro ocorreu ao tentar Buscar uma Permissão", 401, error.TypeError)
    }
  }
}