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
      type_of_payment: data.type_of_payment
      // sub_total: data.sub_total, // tirar isso aqui
      // descount: data.descount,
      // total: data.total // tirar isso aqui
    }
    console.log('30 => ', data)
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
        // console.log(salvedSale)
        for (const item of data.itemsSalesPDV) {
          const createItemSalesPDVServices = container.resolve(
            CreateItemSalesPDVHandler
          )
          const itemSaved = await createItemSalesPDVServices.handler(item)
          console.log('linha => 60', itemSaved)
          if (itemSaved) {
            salvedSale.productsPDV?.push(itemSaved)
          }
        }
        const updatedSalesPDV = await this.salesRepository.save(salvedSale)
        console.log('colla => ', updatedSalesPDV)
        return updatedSalesPDV
      }
    } else {
      if (data.owner_id) {
        const owner = await this.ownerRepository.one(data.owner_id)
        // console.log('entrei..', owner)

        if (owner) {
          salesWithOwner = Object.assign(newSales, {
            owner,
            owner_id: owner.id,
            productsPDV: []
          })

          const savedSale = await this.salesRepository.create(salesWithOwner)
          console.log('82', savedSale)
          for (const item of data.itemsSalesPDV) {
            console.log('84', item)
            const createItemSalesPDVServices = container.resolve(
              CreateItemSalesPDVHandler
            )
            // verificar essa lógica antes do if
            const itemSaved = await createItemSalesPDVServices.handler(item)
            const savedsItens = [itemSaved]
            console.log('91', itemSaved)
            if (itemSaved) {
              // console.log('89', savedSale)
              console.log('94')
              savedSale.productsPDV?.push(itemSaved)
              console.log('96')
            }
          }
          console.log('99')
          const updatedSalesPDV = await this.salesRepository.save(savedSale)
          console.log('100 => ', updatedSalesPDV)
          // return updatedSalesPDV
        }
      }
    }
  }
}
