export default interface CreateUserInput {
  name: string
  password: string
  email: string
  isAdmin?: boolean
  isActive?: boolean
  roles: string
  permissions: string
}
