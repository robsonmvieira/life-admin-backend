import AppError from '@infra/errors/AppError'
import IUserRepository from '@modules/users/interfaces/IUserRepository'
import IEmail from '@shared/mail/contract/IMail'
import { injectable, inject } from 'tsyringe'

@injectable()
export default class SendForgotPasswordEmail {
  constructor(
    @inject('UserRepository') private repo: IUserRepository,
    @inject('MailProvider') private mailProvider: IEmail
  ) {}

  async handle(data: string): Promise<void> {
    const userExists = await this.repo.findByEmail(data)
    if (!userExists) {
      throw new AppError(
        'o email informado não corresponde há um email cadastrado',
        400
      )
    }
    this.mailProvider.sendEmail(data, 'Pedido de recuperação enviado')
  }
}
