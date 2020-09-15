export default interface CreateCollaboratorInput {
  name: string
  password: string
  email: string
  isActive?: boolean
  company_id: string
  position: string
  roles: string
  permissions: string
}
