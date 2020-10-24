import createClientInput from '@modules/clients/dtos/create-client-input'
import IClientRepository from '@modules/clients/interfaces/IClientRepository'
import Client from '@modules/clients/models/client'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class CreateClientHandler {
  constructor(@inject('ClientRepository') private repo: IClientRepository) {}

  async handler(data: createClientInput): Promise<Client> {
    return await this.repo.create(data)
  }
}
