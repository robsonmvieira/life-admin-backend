import SalesPDV from '@modules/sales/models/sale'
export default interface UpdateItemSalesPDV {
  product_quantity?: number
  product_pdv_id?: string
  salesPDV?: SalesPDV
}
