import createClientInput from '../dtos/create-client-input'
import Client from '../models/client'

export default interface IClientRepository {
  create(data: createClientInput): Promise<Client>
  index(ownerId: string): Promise<Client[]>
  findByEmail(ownerId: string, email: string): Promise<Client | undefined>
  one(id: string): Promise<Client | undefined>
  update(id: string, data: string): Promise<Client | undefined>
  remove(id: string): Promise<boolean>
}
