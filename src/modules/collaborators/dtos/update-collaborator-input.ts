import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'

export default interface UpdateCollaboratorInput {
  password?: string
  email?: string
  position?: string
  permissions?: Permission[]
  roles?: Role[]
}
