export default interface ITokenGenerator {
  generateToken(
    payload: { id: string },
    secretKey: string,
    options: { subject: string; expiresIn: string }
  ): Promise<string>
}
