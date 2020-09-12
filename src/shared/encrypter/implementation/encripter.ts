import bcryptjs from 'bcryptjs'
import IHashPassword from '../contract/encrypter'

export default class HashPassword implements IHashPassword {
  async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    const result = await bcryptjs.compare(plainPassword, hashedPassword)
    return result
  }

  async hashPassword(plainPassword: string): Promise<string> {
    const data = bcryptjs.hash(plainPassword, 8)
    return data
  }
}
