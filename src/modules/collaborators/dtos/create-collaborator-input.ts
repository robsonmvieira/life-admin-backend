export default interface CreateCollaboratorInput {
  name: string
  password: string
  email: string
  isActive?: boolean
  owner_id: string
  position: string
  roles: string
  permissions: string
}
