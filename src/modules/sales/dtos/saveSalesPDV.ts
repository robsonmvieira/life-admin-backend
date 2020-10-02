import Collaborator from '@modules/collaborators/models/collaborator'
import ItemSalesPDV from '@modules/itemSalesPDV/models/itemSalesPDV'
import Owner from '@modules/owner/models/owner'

export default interface SaveSalesPDV {
  collaborator_id?: string
  type_of_payment: string
  sub_total?: string
  descount?: number
  total?: string
  owner_id?: string
  owner?: Owner
  collaborator?: Collaborator
  productsPDV: ItemSalesPDV[]
}
