import FakeUserRepository from '@infra/repositories/fakes/fakeUserRepository'
import SendForgotPasswordEmail from './send-forgot-password-email'
import FakeEmail from '@shared/mail/fakes/fakeMail.ts'
import AppError from '@infra/errors/AppError'

describe('SendForgetEmail', () => {
  it('Should be able recover the password using email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeMailProvider = new FakeEmail()

    const sendMail = jest.spyOn(fakeMailProvider, 'sendEmail')
    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepository,
      fakeMailProvider
    )
    await fakeUserRepository.create({
      email: 'johndoe@email.com',
      password: '12365',
      name: 'john Doe',
      isActive: true,
      isAdmin: true,
      roles: '',
      permissions: ''
    })
    await sendForgotPasswordEmail.handle('johndoe@email.com')
    expect(sendMail).toHaveBeenCalled()
  })

  it('Should not be able reset password if email does not exists', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeMailProvider = new FakeEmail()

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepository,
      fakeMailProvider
    )
    // await fakeUserRepository.create({
    //   email: 'johndoe@email.com',
    //   password: '12365',
    //   name: 'john Doe',
    //   isActive: true,
    //   isAdmin: true,
    //   roles: '',
    //   permissions: ''
    // })
    await expect(
      sendForgotPasswordEmail.handle('johndoe@email.com')
    ).rejects.toBeInstanceOf(AppError)
  })
})
