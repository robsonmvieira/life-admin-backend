import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'

export default interface UpdateUserInput {
  name?: string
  password?: string
  email?: string
  isAdmin?: boolean
  isActive?: boolean
  rolesId?: string
  permissionsId?: string
  roles?: Role[]
  permissions?: Permission[]
}
