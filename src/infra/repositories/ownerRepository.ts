import UpdateOwnerInput from '@modules/owner/dtos/update-owner-input'
import IOwnerRepository, {
  createOwner
} from '@modules/owner/interfaces/IOwnerRepository'
import Owner from '@modules/owner/models/owner'
import { Repository, getRepository } from 'typeorm'

export default class OwnerRepository implements IOwnerRepository {
  repo: Repository<Owner>

  constructor() {
    this.repo = getRepository(Owner)
  }

  async findByEmail(email: string): Promise<Owner | undefined> {
    const OwnerExists = await this.repo.findOne({ where: { email } })
    if (!OwnerExists) {
      return undefined
    }
    return OwnerExists
  }

  async save(data: Owner): Promise<Owner> {
    return this.repo.save(data)
  }

  async create(data: createOwner): Promise<Owner> {
    const Owner = await this.repo.save(data)

    return Owner
  }

  async index(): Promise<Owner[]> {
    return await this.repo.find()
  }

  async one(id: string): Promise<Owner | undefined> {
    return await this.repo.findOne(id)
  }

  async update(id: string, data: UpdateOwnerInput): Promise<Owner | undefined> {
    const OwnerExists = await this.repo.findOne(id)
    if (!OwnerExists) {
      return undefined
    }
    await this.repo.update(id, data)
    return await this.repo.findOne(id)
  }

  async remove(id: string): Promise<boolean> {
    const hasOwner = await this.repo.findOne(id)

    if (!hasOwner) {
      return false
    }
    const OwnerDeleted = await this.repo.delete(id)
    if (!OwnerDeleted) {
      return false
    }
    return true
  }
}
