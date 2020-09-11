import { injectable, inject } from "tsyringe"
import AppError from "@infra/errors/AppError"
import UserRepository from "@infra/repositories/userRepository"
import User from "@modules/users/models/user"

@injectable()
export default class ListUsersHandler{

  constructor(@inject("UserRepository") private repo: UserRepository) {}

  async handler(): Promise<User[]>{

    try {
      const users = await this.repo.index()
      return users
    } catch (error) {
      throw new AppError("Um erro interno aconteceu. Tente mais tarde", 500, error)
    }
  }
}