import Role from '@modules/roles/models/role'

export default interface UpdateCollaboratorInput {
  password?: string
  email?: string
  position?: string
  roles?: Role[]
  permissions?: Permissions[]
}
