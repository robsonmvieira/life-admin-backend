import { injectable, inject } from "tsyringe";
import Permission from "@modules/permissions/models/permission";
import AppError from '@infra/errors/AppError'
import RoleRepository from "@infra/repositories/roleRepository";
import UpdateRoleInput from "@modules/roles/dtos/update-roles-input";
import Role from "@modules/roles/models/role";
@injectable()
export default class UpdateRoleHandler{

  constructor(@inject("RoleRepository") private repo: RoleRepository) {}

  async handler(id: string,data: UpdateRoleInput): Promise<Role| undefined>{

    try {
      return await this.repo.update(id, data)
    } catch (error) {
      throw new AppError("Os dados da Nova Role estão incorretos", 401, error.message)
    }
  }
}