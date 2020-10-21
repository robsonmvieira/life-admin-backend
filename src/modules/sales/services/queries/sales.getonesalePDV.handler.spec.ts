// import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
// import SalesPDV from '@modules/sales/models/sale'
// import { inject, injectable } from 'tsyringe'

import FakeSalesPDVRepository from '@infra/repositories/fakes/fakesalesPDVRepository'
import GetOneSalesPDVHandler from './sales.getonesalePDV.handler'

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
let fakeSalePDVRepository: FakeSalesPDVRepository
let getOneSalesPDVHandler: GetOneSalesPDVHandler
describe('Sales ', () => {
  beforeEach(() => {
    fakeSalePDVRepository = new FakeSalesPDVRepository()
    getOneSalesPDVHandler = new GetOneSalesPDVHandler(fakeSalePDVRepository)
  })
})
