import FakeOwnerRepository from '@infra/repositories/fakes/fakeOwnerRepository'
import FakeSalesPDVRepository from '@infra/repositories/fakes/fakesalesPDVRepository'
import ListSalesPDVHandler from './sales.listsalesPDV.handler'
describe('List Sale PDV per Associate', () => {
  let fakeSalesPDVRepository: FakeSalesPDVRepository
  let fakeOwnerRepository: FakeOwnerRepository
  let listSalesPDVHandler: ListSalesPDVHandler
  beforeEach(() => {
    fakeSalesPDVRepository = new FakeSalesPDVRepository()
    listSalesPDVHandler = new ListSalesPDVHandler(fakeSalesPDVRepository)
  })
})
