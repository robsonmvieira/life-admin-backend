import IEmail from '../contract/IMail'

export default class SendEmailProvider implements IEmail {
  sendEmail(to: string, body: string): Promise<void> {}
}
