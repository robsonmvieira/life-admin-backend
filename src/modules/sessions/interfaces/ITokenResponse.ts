import Collaborator from '@modules/collaborators/models/collaborator'
import User from '@modules/users/models/user'

export default interface ITokenResponse {
  user: User | Collaborator
  token: string
}
