import { container } from 'tsyringe'
import IHashPassword from './encrypter/contract/encrypter'
import HashPassword from './encrypter/implementation/encripter'
container.registerSingleton<IHashPassword>('HashPassword', HashPassword)
