import FakeOwnerRepository from '@infra/repositories/fakes/fakeOwnerRepository'
import FakeSalesPDVRepository from '@infra/repositories/fakes/fakesalesPDVRepository'
import ListSalesOfDayPDVHandler from './listSalesOfDayPDV.handler'

let fakeSalesRepository: FakeSalesPDVRepository
let fakeOwnerRepository: FakeOwnerRepository
let listSalesOfDayPDVHandler: ListSalesOfDayPDVHandler

describe('List Sales of Day', () => {
  beforeEach(() => {
    fakeOwnerRepository = new FakeOwnerRepository()
    fakeSalesRepository = new FakeSalesPDVRepository()
    listSalesOfDayPDVHandler = new ListSalesOfDayPDVHandler(fakeSalesRepository)
  })
  it('should return sales current day list ', async () => {
    const newOwner = await fakeOwnerRepository.create({
      name: 'jhon doe',
      email: 'jd@email',
      password: 'any',
      permissions: [],
      roles: []
    })

    const data = {
      type_of_payment: 'debito',
      owner_id: 'any',
      created_at: new Date(2020, 9, 4),
      updated_at: new Date(2020, 9, 4),
      productsPDV: []
    }

    const sale1 = await fakeSalesRepository.create(data)
    const sale2 = await fakeSalesRepository.create(data)
    const list = await listSalesOfDayPDVHandler.handler(newOwner.id)
    expect(list).toEqual(
      expect.arrayContaining([
        {
          type_of_payment: 'debito',
          owner_id: 'any',
          created_at: new Date(2020, 9, 4),
          updated_at: new Date(2020, 9, 4),
          productsPDV: []
        },
        {
          type_of_payment: 'debito',
          owner_id: 'any',
          created_at: new Date(2020, 9, 4),
          updated_at: new Date(2020, 9, 4),
          productsPDV: []
        }
      ])
    )
  })
})
