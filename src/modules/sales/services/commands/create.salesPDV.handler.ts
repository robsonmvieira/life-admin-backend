import AppError from '@infra/errors/AppError'
import ICollaboratorRepository from '@modules/collaborators/interfaces/ICollaboratorRepository'
import IItemSalesPDVRepository from '@modules/itemSalesPDV/interfaces/IItemSalesPDVRepository'
import CreateItemSalesPDVHandler from '@modules/itemSalesPDV/services/commands/create.itemsalesPDV.handler'
import IOwnerRepository from '@modules/owner/interfaces/IOwnerRepository'
import SaveSalesInput from '@modules/sales/dtos/saveSales.input'
import ISalesPDVRepository from '@modules/sales/interfaces/ISalesPDVRepository'
import SalesPDV from '@modules/sales/models/sale'

import { injectable, inject, container } from 'tsyringe'

@injectable()
export default class CreateSalesPDVHandler {
  constructor(
    @inject('SalesPDVRepository') private salesRepository: ISalesPDVRepository,
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
    @inject('OwnerRepository') private ownerRepository: IOwnerRepository,
    @inject('ItemSalesPDVRepository')
    private itemSalesPDVRepository: IItemSalesPDVRepository
  ) {}

  async handler(data: SaveSalesInput): Promise<SalesPDV | undefined> {
    const newSales = {
      type_of_payment: data.type_of_payment,
      descount: data.descount ? data.descount : 0

      // sub_total: data.sub_total, // tirar isso aqui
      // total: data.total // tirar isso aqui
    }
    // console.log(data)
    let salesWithCollaborator = null
    let salesWithOwner = null

    if (!data.collaborator_id && !data.owner_id) {
      throw new AppError(
        'Você não pode efetuar uma venda sem estar autenticado',
        401
      )
    }

    if (data.collaborator_id) {
      const collaborator = await this.collaboratorRepository.one(
        data.collaborator_id
      )
      if (collaborator) {
        salesWithCollaborator = Object.assign(newSales, {
          collaborator,
          collaborator_id: collaborator.id,
          productsPDV: []
        })
        const salvedSale = await this.salesRepository.create(
          salesWithCollaborator
        )
        for (const item of data.itemsSalesPDV) {
          const createItemSalesPDVServices = container.resolve(
            CreateItemSalesPDVHandler
          )
          const itemSaved = await createItemSalesPDVServices.handler(item)
          if (itemSaved) {
            salvedSale.productsPDV?.push(itemSaved)
          }
        }
        const updatedSalesPDV = await this.salesRepository.save(salvedSale)
        return updatedSalesPDV
      }
    } else {
      if (data.owner_id) {
        const owner = await this.ownerRepository.one(data.owner_id)
        if (owner) {
          salesWithOwner = Object.assign(newSales, {
            owner,
            owner_id: owner.id,
            productsPDV: []
          })

          const savedSale = await this.salesRepository.create(salesWithOwner)
          for (const item of data.itemsSalesPDV) {
            const createItemSalesPDVServices = container.resolve(
              CreateItemSalesPDVHandler
            )
            const itemSale = Object.assign(item, { salesPDV: savedSale.id })
            const itemSaved = await createItemSalesPDVServices.handler(itemSale)

            if (itemSaved) {
              savedSale.productsPDV?.push(itemSaved)
            }
          }
          savedSale.sub_total = String(
            savedSale.productsPDV?.reduce((a, b) => a + b.total, 0)
          )
          savedSale.total = String(
            data.descount <= 0
              ? savedSale.sub_total
              : Number(savedSale.sub_total) - data.descount
          )

          if (data.descount > Number(savedSale.sub_total)) {
            throw new AppError(
              'Você não pode dar um desconto maior do que o sub total da venda',
              401
            )
          }
          const updatedSalesPDV = await this.salesRepository.save(savedSale)
          return updatedSalesPDV
        }
      }
    }
  }
}
