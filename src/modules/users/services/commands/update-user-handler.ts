import { injectable, inject } from "tsyringe";
import AppError from '@infra/errors/AppError'

import UserRepository from "@infra/repositories/userRepository";
import UpdateUserInput from "@modules/users/dtos/update-user-input";
import User from "@modules/users/models/user";
@injectable()
export default class UpdateUserHandler{

  constructor(@inject("UserRepository") private repo: UserRepository) {}


  async handler(id: string,data: UpdateUserInput): Promise<User| undefined>{

    try {
      return await this.repo.update(id, data)
    } catch (error) {
      throw new AppError("Os dados da Novo Usurário estão incorretos", 401, error.message)
    }
  }
}