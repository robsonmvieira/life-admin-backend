import createClientInput from '@modules/clients/dtos/create-client-input'
import IClientRepository from '@modules/clients/interfaces/IClientRepository'
import Client from '@modules/clients/models/client'

export default class FakeClientRepository implements IClientRepository {
  repo = []
  create(data: createClientInput): Promise<Client> {
    throw new Error('Method not implemented.')
  }

  index(ownerId: string): Promise<Client[]> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<Client | undefined> {
    throw new Error('Method not implemented.')
  }

  one(id: string): Promise<Client | undefined> {
    throw new Error('Method not implemented.')
  }

  update(id: string, data: string): Promise<Client | undefined> {
    throw new Error('Method not implemented.')
  }

  remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
