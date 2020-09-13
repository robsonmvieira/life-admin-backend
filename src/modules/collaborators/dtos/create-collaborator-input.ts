import Role from '@modules/roles/models/role'
import Permission from '@modules/permissions/models/permission'

export default interface CreateCollaboratorInput {
  name: string
  password: string
  email: string
  isActive?: boolean
  rolesId?: string
  permissionsId?: string
  position: string
  company_id: string
  roles: Role[]
  permissions: Permission[]
}
