import IClientRepository from '@modules/clients/interfaces/IClientRepository'
import Client from '@modules/clients/models/client'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class ListClientHandler {
  constructor(@inject('ClientRepository') private repo: IClientRepository) {}

  async handler(owerId: string): Promise<Client[]> {
    return await this.repo.index(owerId)
  }
}
