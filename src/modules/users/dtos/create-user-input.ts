import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'

export default interface CreateUserInput {
  name: string
  password: string
  email: string
  isAdmin?: boolean
  isActive?: boolean
  roles: Role[]
  permissions: Permission[]
}
