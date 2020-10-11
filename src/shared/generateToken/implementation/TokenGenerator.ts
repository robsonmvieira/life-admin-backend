import ITokenGenerator from '../interfaces/ItokenGenerator'
import { sign } from 'jsonwebtoken'

export default class TokenGenerator implements ITokenGenerator {
  async generateToken(
    payload: { id: string },
    secretKey: string,
    options: { subject: string; expiresIn: string }
  ): Promise<string> {
    const token = sign(payload, secretKey, options)
    return token
  }
}
