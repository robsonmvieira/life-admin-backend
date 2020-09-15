import UserRepository from '@infra/repositories/userRepository'
import ILogin from '@modules/sessions/interfaces/IUserRepository'
import { container } from 'tsyringe'
import IHashPassword from './encrypter/contract/encrypter'
import HashPassword from './encrypter/implementation/encripter'
import TokenGenerator from './generateToken/implementation/TokenGenerator'
import ITokenGenerator from './generateToken/interfaces/ItokenGenerator'
container.registerSingleton<IHashPassword>('HashPassword', HashPassword)
container.registerSingleton<ILogin>('ILogin', UserRepository)
container.registerSingleton<ITokenGenerator>('TokenGenerator', TokenGenerator)
