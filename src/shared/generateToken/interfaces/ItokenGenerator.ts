export default interface ITokenGenerator {
  generateToken(
    payload: { isActive: boolean },
    secretKey: string,
    options: { subject: string; expiresIn: string }
  ): Promise<string>
}
