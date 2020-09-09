import { injectable, inject } from "tsyringe"
import PermissionRepository from "@infra/repositories/permissionRepository"
import Permission from "@modules/permissions/models/permission"
import AppError from "@infra/errors/AppError"

@injectable()
export default class ListPermissionsHandler{

  constructor(@inject("PermissionsRepository") private repo: PermissionRepository) {}

  async handler(): Promise<Permission[]>{

    try {
      return await this.repo.index()
    } catch (error) {
      throw new AppError("Um erro interno aconteceu. Tente mais tarde", 500, error)
    }
  }
}