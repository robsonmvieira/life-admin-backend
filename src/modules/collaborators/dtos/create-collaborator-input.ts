import Permission from '@modules/permissions/models/permission'
import Role from '@modules/roles/models/role'

export default interface CreateCollaboratorInput {
  name: string
  password: string
  email: string
  isActive?: boolean
  company_id: string
  position: string
  roles: Role[]
  permissions: Permission[]
}
