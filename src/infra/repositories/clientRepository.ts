import createClientInput from '@modules/clients/dtos/create-client-input'
import IClientRepository from '@modules/clients/interfaces/IClientRepository'
import Client from '@modules/clients/models/client'
import { getRepository, Repository } from 'typeorm'

export default class ClientRepository implements IClientRepository {
  private repo: Repository<Client>
  constructor() {
    this.repo = getRepository(Client)
  }

  async create(data: createClientInput): Promise<Client> {
    return await this.repo.save(data)
  }

  async index(owner_id: string): Promise<Client[]> {
    return await this.repo.find({ where: { owner_id } })
  }

  async findByEmail(
    owner_id: string,
    email: string
  ): Promise<Client | undefined> {
    return await this.repo.findOne({ where: { owner_id, email } })
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
