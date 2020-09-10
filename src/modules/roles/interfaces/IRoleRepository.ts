import CreateRoleInput from "../dtos/create-roles-input";
import Role from "../models/role";
import UpdateRoleInput from "../dtos/update-roles-input";

export default interface IRoleRepository{
  create(data: CreateRoleInput):Promise<Role>
  index():Promise<Role[]>
  one(id: string):Promise<Role| undefined>
  update(id: string, data: UpdateRoleInput):Promise<Role | undefined>
  remove(id: string): Promise<boolean>
}