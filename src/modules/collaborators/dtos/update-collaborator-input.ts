import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'

export default interface UpdateCollaboratorInput {
  name?: string
  password?: string
  email?: string
  isActive?: boolean
  owner_id?: string
  position?: string
  roles?: Role[]
  permissions?: Permission[]
}
