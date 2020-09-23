import Role from '@modules/roles/models/role'
import Permission from '../../permissions/models/permission'
export default interface UpdateOwnerInput {
  name?: string
  password?: string
  email?: string
  isAdmin?: boolean
  isActive?: boolean
  roles?: Role[]
  permissions?: Permission[]
}
