export default interface CreateOwnerInput {
  name: string
  password: string
  email: string
  isAdmin?: boolean
  isActive?: boolean
  roles: string
  permissions: string
}
