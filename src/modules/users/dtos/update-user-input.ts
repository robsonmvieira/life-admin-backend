export default interface UpdateUserInput{
  name: string,
  password: string,
  email: string
  isAdmin?: boolean
  isActive?: boolean
  roles?: string
  permissions?: string
}