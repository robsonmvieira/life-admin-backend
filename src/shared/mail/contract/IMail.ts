export default interface IEmail {
  sendEmail(to: string, body: string): Promise<void>
}
