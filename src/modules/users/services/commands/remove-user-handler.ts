import { injectable, inject } from "tsyringe";
import AppError from '@infra/errors/AppError'
import UserRepository from "@infra/repositories/userRepository";
@injectable()
export default class RemoveUserHandler{

  constructor(@inject("UserRepository") private repo: UserRepository) {}

  async handler(data: string): Promise<boolean>{

    try {
      return await this.repo.remove(data)
    } catch (error) {
      throw new AppError("Não foi possível deltar o Usuário solicitado", 400, error)
    }
  }
}