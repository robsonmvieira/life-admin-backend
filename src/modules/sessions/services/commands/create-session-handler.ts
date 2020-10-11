/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { injectable, inject } from 'tsyringe'
import AppError from '@infra/errors/AppError'
import IEncripter from '@shared/encrypter/implementation/encripter'
import MakeLoginInput from '@modules/sessions/dtos/login-input'
import ITokenGenerator from '@shared/generateToken/interfaces/ItokenGenerator'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'

interface IResponse {
  token: string
  id: string
  name: string
}

@injectable()
export default class MakeLoginHandler {
  constructor(
    @inject('OwnerRepository') private repo: IOwnerRepository,
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
    @inject('HashPassword') private encripterProvider: IEncripter,
    @inject('TokenGenerator') private tokenGenerator: ITokenGenerator
  ) {}

  async handler(data: MakeLoginInput): Promise<IResponse> {
    const ownerExists = await this.repo.findByEmail(data.email)
    const collaboratorExists = await this.collaboratorRepository.findByEmail(
      data.email
    )

    if (!ownerExists && !collaboratorExists) {
      throw new AppError('Email ou senha incorretos', 401)
    }
    if (ownerExists) {
      const passwordMatched = await this.encripterProvider.comparePassword(
        data.password,
        ownerExists.password
      )
      const secret = `${process.env.APP_SECRET}`
      const expiresIn = `${process.env.APP_EXESPIRE_IN}`
      if (!passwordMatched) {
        throw new AppError('Email ou senha incorretos', 401)
      }
      const token = await this.tokenGenerator.generateToken(
        { id: ownerExists.id },
        secret,
        {
          subject: ownerExists.id,
          expiresIn
        }
      )

      const response = { token, id: ownerExists.id, name: ownerExists.name }
      return response
    } else {
      const passwordMatched = await this.encripterProvider.comparePassword(
        data.password,
        collaboratorExists!.password
      )
      const secret = `${process.env.APP_SECRET}`
      const expiresIn = `${process.env.APP_EXESPIRE_IN}`
      if (!passwordMatched) {
        throw new AppError('Email ou senha incorretos', 401)
      }

      const token = await this.tokenGenerator.generateToken(
        { id: collaboratorExists!.id },
        secret,
        {
          subject: collaboratorExists!.id,
          expiresIn
        }
      )
      const response = {
        token,
        id: collaboratorExists!.id,
        name: collaboratorExists!.name
      }

      return response
    }
  }

  // if (collaboratorExists) {
  //   const passwordMatched = await this.encripterProvider.comparePassword(
  //     data.password,
  //     collaboratorExists.password
  //   )
  //   const secret = `${process.env.APP_SECRET}`
  //   const expiresIn = `${process.env.APP_EXESPIRE_IN}`
  //   if (!passwordMatched) {
  //     throw new AppError('Email ou senha incorretos', 401)
  //   }
  //   const token = await this.tokenGenerator.generateToken(
  //     { isActive: collaboratorExists.isActive },
  //     secret,
  //     {
  //       subject: collaboratorExists.id,
  //       expiresIn
  //     }
  //   )
  //   const user = {
  //     id: collaboratorExists.id,
  //     name: collaboratorExists.name,
  //     position: collaboratorExists.position,
  //     isActive: collaboratorExists.isActive,
  //     owner_id: collaboratorExists.owner_id
  //   }
  //   const response = { user, token }
  //   return response
  // }
}
