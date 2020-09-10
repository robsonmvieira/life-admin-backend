export default interface IHashPassword{
  comparePassword(hashedPassword: string, plainPassword: string): Promise<boolean>
  hashPassword(plainPassword: string): Promise<string>
}