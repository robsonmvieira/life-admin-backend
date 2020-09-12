export default interface IHashPassword {
  comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>
  hashPassword(plainPassword: string): Promise<string>
}
