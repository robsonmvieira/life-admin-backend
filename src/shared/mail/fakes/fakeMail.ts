import IEmail from '../contract/IMail'
export interface ShapeEmail {
  to: string
  body: string
}
export default class FakeEmail implements IEmail {
  sentEmail: ShapeEmail[] = []
  async sendEmail(to: string, body: string): Promise<void> {
    this.sentEmail.push({ to, body })
  }
}
