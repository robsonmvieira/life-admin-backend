import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import IEncripter from '@shared/encrypter/implementation/encripter'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
import MakeLoginInput from '@modules/sessions/dtos/login-input'
import ITokenGenerator from '@shared/generateToken/interfaces/ItokenGenerator'
@injectable()
export default class MakeLoginHandler {
  constructor(
    @inject('UserRepository') private repo: IUserRepository,
    @inject('HashPassword') private encripterProvider: IEncripter,
    @inject('TokenGenerator') private tokenGenerator: ITokenGenerator
  ) {}

  async handler(data: MakeLoginInput): Promise<string> {
    const userExists = await this.repo.findByEmail(data.email)
    if (!userExists) {
      throw new AppError('Email ou senha incorretos', 401)
    }

    const passwordMatched = await this.encripterProvider.comparePassword(
      data.password,
      userExists.password
    )
    const secret = `${process.env.APP_SECRET}`
    const expiresIn = `${process.env.APP_EXESPIRE_IN}`
    if (!passwordMatched) {
      throw new AppError('Email ou senha incorretos', 401)
    }
    const token = await this.tokenGenerator.generateToken(
      { isActive: userExists.isActive },
      secret,
      {
        subject: userExists.id,
        expiresIn
      }
    )
    return token
  }
}
