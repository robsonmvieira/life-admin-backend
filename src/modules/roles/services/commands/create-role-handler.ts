import { injectable, inject } from "tsyringe";
import AppError from '@infra/errors/AppError'
import RoleRepository from "@infra/repositories/roleRepository";
import Role from "@modules/roles/models/role";
import CreateRoleInput from "@modules/roles/dtos/create-roles-input";
@injectable()
export default class CreateRoleHandler{

  constructor(@inject("RoleRepository") private repo: RoleRepository) {}

  async handler(data: CreateRoleInput): Promise<Role>{

    try {
      return await this.repo.create(data)
    } catch (error) {
      throw new AppError("Os dados da Nova role estão incorretos", 400, error)
    }
  }
}