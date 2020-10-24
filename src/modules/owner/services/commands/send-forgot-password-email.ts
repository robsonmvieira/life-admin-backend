import AppError from '@infra/errors/AppError'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'
import IEmail from '@shared/mail/contract/IMail'
import { injectable, inject } from 'tsyringe'

@injectable()
export default class SendForgotPasswordEmail {
  constructor(
    @inject('OwnerRepository') private ownerRepo: IOwnerRepository,
    @inject('CollaboratorRepository')
    private collaboratorRepo: ICollaboratorRepository,
    @inject('MailProvider') private mailProvider: IEmail
  ) {}

  async handle(data: string): Promise<void> {
    const userExists = await this.ownerRepo.findByEmail(data)
    if (!userExists) {
      throw new AppError(
        'o email informado não corresponde há um email cadastrado',
        400
      )
    }
    this.mailProvider.sendEmail(data, 'Pedido de recuperação enviado')
  }
}
