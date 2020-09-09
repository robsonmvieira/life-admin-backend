import xlsx from 'xlsx'
import path from 'path'
import { container } from 'tsyringe';
import GetCategoryByNameHandler from '@modules/categories/services/queries/get-by-name-category-handler';
import CreateProductSalerHandler from '@modules/products/services/commands/create-product-sale-handler';
import CreateProductSaleInput from '@modules/products/dtos/create-product-sale-input';


export default class XlsxToJsonParser {
  async parserToJson(): Promise<void>{
    const filePath = path.join(__dirname, '..', '..', 'shared', '/assets', '/files', '/tables', 'tabela-herba.xlsx')
    const workeBook = xlsx.readFile(filePath)
    const tabList = workeBook.SheetNames;
    let data: CreateProductSaleInput = { name: '', 
      category_id: '', sku: '', quantity: 0,
      volume_points: 0,price_suggest: 0, cost_per_pv: 0,
      from_zero_to_four_hundred_ninety_nine: 0,
      from_five_hundred_to_nine_hundred_ninety_nine: 0,
      from_one_thousand_to_three_thousand_nine_hundred_ninety_nine: 0,
      more_than_four_thousand: 0}


      const tabs = tabList.map((t, index) => workeBook.Sheets[tabList[index]])
      
      const tabsToJson: any[] = tabs.map(t => xlsx.utils.sheet_to_json(t))
    
      const addProductHandler = container.resolve(CreateProductSalerHandler)
      for (const tabs of tabsToJson) {
          for (const tab of tabs) {
            const categoryName = tab.__EMPTY
            const sku = tab.__EMPTY_1
            const name = tab.__EMPTY_2
            const volume_points = tab.__EMPTY_3
            const price_suggest = tab.__EMPTY_4
            const cost_per_pv =  tab.__EMPTY_6
            const categoryHandler = container.resolve(GetCategoryByNameHandler)
            const cat = await categoryHandler.handler(categoryName)
            if(cat){
              data = {
                name, 
                category_id: cat.id, 
                sku, quantity: 20, volume_points, price_suggest, cost_per_pv,
                from_zero_to_four_hundred_ninety_nine: 0,
                from_five_hundred_to_nine_hundred_ninety_nine: 0,
                from_one_thousand_to_three_thousand_nine_hundred_ninety_nine: 0,
                more_than_four_thousand: 0}
                
                await addProductHandler.handler(data)
             
            }
          }
           
      }
    
  }
}