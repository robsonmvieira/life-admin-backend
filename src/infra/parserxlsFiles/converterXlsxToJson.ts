import xlsx from 'xlsx'
import path from 'path'
import { container } from 'tsyringe'
import GetCategoryByNameHandler from '@modules/categories/services/queries/get-by-name-category-handler'
import CreateProductSalerHandler from '@modules/products/services/commands/create-product-sale-handler'
import CreateProductSaleInput from '@modules/products/dtos/create-product-sale-input'

export default class XlsxToJsonParser {
  async parserToJson(ownerId: string): Promise<void> {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'shared',
      '/assets',
      '/files',
      '/tables',
      'tabela-herba.xlsx'
    )
    const workeBook = xlsx.readFile(filePath)

    let data: CreateProductSaleInput = {
      owner_id: '',
      name: '',
      category_id: '',
      sku: '',
      quantity: 0,
      volume_points: 0,
      price_suggest: 0,
      cost_per_pv: 0,
      from_zero_to_four_hundred_ninety_nine: 0,
      from_five_hundred_to_nine_hundred_ninety_nine: 0,
      from_one_thousand_to_three_thousand_nine_hundred_ninety_nine: 0,
      more_than_four_thousand: 0
    }

    const geralToJson: any[] = xlsx.utils.sheet_to_json(workeBook.Sheets.geral)

    const addProductHandler = container.resolve(CreateProductSalerHandler)

    for (const tabs of geralToJson) {
      const categoryName = String(tabs.__EMPTY).trim()
      const sku = String(tabs.__EMPTY_1).trim()
      const name = String(tabs.__EMPTY_2).trim()
      const volume_points = tabs.__EMPTY_3
      const price_suggest = tabs.__EMPTY_4
      const cost_per_pv = tabs.__EMPTY_6
      const categoryHandler = container.resolve(GetCategoryByNameHandler)
      const cat = await categoryHandler.handler(categoryName)
      if (cat) {
        data = {
          owner_id: ownerId,
          name,
          category_id: cat.id,
          sku,
          quantity: 0,
          volume_points,
          price_suggest,
          cost_per_pv,
          from_zero_to_four_hundred_ninety_nine: 0,
          from_five_hundred_to_nine_hundred_ninety_nine: 0,
          from_one_thousand_to_three_thousand_nine_hundred_ninety_nine: 0,
          more_than_four_thousand: 0
        }
        await addProductHandler.handler(data)
      }
    }
  }
}
