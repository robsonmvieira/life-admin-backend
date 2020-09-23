import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import IEncripter from '@shared/encrypter/implementation/encripter'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
import MakeLoginInput from '@modules/sessions/dtos/login-input'
import ITokenGenerator from '@shared/generateToken/interfaces/ItokenGenerator'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
@injectable()
export default class MakeLoginHandler {
  constructor(
    @inject('UserRepository') private repo: IUserRepository,
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
    @inject('HashPassword') private encripterProvider: IEncripter,
    @inject('TokenGenerator') private tokenGenerator: ITokenGenerator
  ) {}

  async handler(data: MakeLoginInput): Promise<string | undefined> {
    const userExists = await this.repo.findByEmail(data.email)
    const collaboratorExists = await this.collaboratorRepository.findByEmail(
      data.email
    )

    if (!userExists && !collaboratorExists) {
      throw new AppError('Email ou senha incorretos', 401)
    }
    if (userExists) {
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

    if (collaboratorExists) {
      const passwordMatched = await this.encripterProvider.comparePassword(
        data.password,
        collaboratorExists.password
      )
      const secret = `${process.env.APP_SECRET}`
      const expiresIn = `${process.env.APP_EXESPIRE_IN}`
      if (!passwordMatched) {
        throw new AppError('Email ou senha incorretos', 401)
      }
      const token = await this.tokenGenerator.generateToken(
        { isActive: collaboratorExists.isActive },
        secret,
        {
          subject: collaboratorExists.id,
          expiresIn
        }
      )
      return token
    }
  }
}
