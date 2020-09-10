import { injectable, inject } from "tsyringe";
import AppError from '@infra/errors/AppError'
import RoleRepository from "@infra/repositories/roleRepository";
@injectable()
export default class RemoveRoleHandler{

  constructor(@inject("RoleRepository") private repo: RoleRepository) {}

  async handler(data: string): Promise<boolean>{

    try {
      return await this.repo.remove(data)
    } catch (error) {
      throw new AppError("Não foi possível deltar a Role solicitada", 400, error)
    }
  }
}