// import AppError from '@infra/errors/AppError'
import FakeRoleRepository from '@infra/repositories/fakes/roleRepository'
// import FakeRoleRepository from '@infra/repositories/fakes/roleRepository'
import CreateRoleHandler from './create-role-handler'

const roleRepository = new FakeRoleRepository()
const createRole = new CreateRoleHandler(roleRepository)
describe('create role Handler', () => {
  it('should be able  create a new role', async () => {
    const data = {
      description: 'any_description',
      name: 'any_name',
      slug: 'any-slug'
    }
    const role = await createRole.handler(data)
    expect(role).toHaveProperty('id')
  })

  // it('should return error if description does not provide', async () => {
  //   await expect(
  //     createRole.handler({
  //       name: 'any_name',
  //       slug: 'any-slug'
  //     })
  //   ).rejects.toBeInstanceOf(AppError)
  // })
})
