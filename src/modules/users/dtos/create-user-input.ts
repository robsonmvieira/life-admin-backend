import Role from "@modules/roles/models/role";
import Permission from "@modules/permissions/models/permission";

export default interface CreateUserInput{
  name: string,
  password: string,
  email: string
  isAdmin?: boolean
  isActive?: boolean
  rolesId: string
  permissionsId: string
  roles: Role[]
  permissions: Permission[]
}
