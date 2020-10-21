// import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
// import SalesPDV from '@modules/sales/models/sale'
// import { inject, injectable } from 'tsyringe'

import FakeSalesPDVRepository from '@infra/repositories/fakes/fakesalesPDVRepository'
import ListSalesPDVHandler from '@modules/sales/services/queries/sales.listsalesPDV.handler'

// @injectable()
// export default class ListSalesPDVHandler {
//   constructor(
//     @inject('SalesPDVRepository')
//     private salesPDVRepository: ISalesPDVRepository
//   ) {}

//   async handler(id: string): Promise<SalesPDV[]> {
//     return this.salesPDVRepository.index(id)
//   }
// }
describe('List Sale Handler', () => {
  let listSalesPDVHandler: ListSalesPDVHandler
  let salesPDVRepository: FakeSalesPDVRepository

  beforeEach(() => {
    salesPDVRepository = new FakeSalesPDVRepository()
    listSalesPDVHandler = new ListSalesPDVHandler(salesPDVRepository)
  })
})
