import { injectable, inject } from "tsyringe";
import PermissionRepository from "@infra/repositories/permissionRepository";
import AppError from '@infra/errors/AppError'
@injectable()
export default class RemovePermissionHandler{

  constructor(@inject("PermissionsRepository") private repo: PermissionRepository) {}

  async handler(data: string): Promise<boolean>{

    try {
      return await this.repo.remove(data)
    } catch (error) {
      throw new AppError("Não foi possível deltar a Permissão solicitada", 400, error)
    }
  }
}