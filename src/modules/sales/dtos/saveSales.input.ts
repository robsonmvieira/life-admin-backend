export default interface SaveSalesInput {
  collaborator_id?: string
  owner_id?: string
  type_of_payment: string
  sub_total?: string
  descount?: number
  total?: string
  itemsSalesPDV: []
}
