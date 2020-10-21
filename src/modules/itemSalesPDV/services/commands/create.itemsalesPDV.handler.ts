import AppError from '@infra/errors/AppError'
import SaveItemSalesInput from '@modules/itemSalesPDV/dtos/saveItemSalesPDV.input'
import IItemSalesPDVRepository from '@modules/itemSalesPDV/interfaces/IItemSalesPDVRepository'
import ItemSalesPDV from '@modules/itemSalesPDV/models/itemSalesPDV'
import GetOneProductHandler from '@modules/products/services/queries/getone-product-handler'
import GetOneSalesPDVHandler from '@modules/sales/services/queries/sales.getonesalePDV.handler'
import { injectable, inject, container } from 'tsyringe'

@injectable()
export default class CreateItemSalesPDVHandler {
  constructor(
    @inject('ItemSalesPDVRepository')
    private itemSalesPDVRepository: IItemSalesPDVRepository
  ) {}

  async handler(data: SaveItemSalesInput): Promise<ItemSalesPDV | undefined> {
    const getOneProductService = container.resolve(GetOneProductHandler)
    const hasProduct = await getOneProductService.handler(data.product_pdv_id)
    const getOneSalesService = container.resolve(GetOneSalesPDVHandler)
    const hasSale = await getOneSalesService.handler(data.salesPDV)
    if (hasProduct) {
      // verifica a quantidade no estoque do produto antes de iniciar a venda
      if (data.product_quantity > hasProduct.quantity) {
        throw new AppError(
          `A Quantidade escolhida para o produto ${hasProduct.name} foi maior do que a quantidade em estoque`,
          401
        )
      }

      if (hasSale) {
        const newItem = {
          product_quantity: data.product_quantity,
          total: data.product_quantity * hasProduct.price_suggest,
          product_pdv_id: hasProduct.id,
          salesPDV: hasSale
        }
        const itemSalesCreated = await this.itemSalesPDVRepository.create(
          newItem
        )

        return itemSalesCreated
      }
      //   if(hasProduct){
      //     const newItem = {
      //       product_quantity: number
      // total: number
      // product_pdv_id: string
      // salesPDV: SalesPDV
      //     }
      //   }
      // for (const prod of data.productsPDV) {

      //   if (hasProduct) {
      //     // verifica a quantidade no estoque do produto antes de iniciar a venda
      //     if (prod.product_quantity > hasProduct.quantity) {
      //       throw new AppError(
      //         `A Quantidade escolhida para o produto ${hasProduct.name}`,
      //         401
      //       )
      //     }
      //     const itemSale =
      //     const items: ProductSale[] = await this.itemSalesPDVRepository.create()
      //   }

      //   if (!hasProduct) {
      //     throw new AppError(
      //       'você escolheu um produto que não existe na sua cesta',
      //       401
      //     )
      //   }
    }
  }
}
