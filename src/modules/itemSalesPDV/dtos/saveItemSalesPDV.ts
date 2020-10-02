import SalesPDV from '@modules/sales/models/sale'
export default interface SaveItemSalesPDV {
  product_quantity: number
  total: number
  product_pdv_id: string
  salesPDV: SalesPDV
}
