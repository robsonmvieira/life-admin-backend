import Collaborator from '@modules/collaborators/models/collaborator'
import Owner from '@modules/owner/models/owner'
import ProductSale from '@modules/products/models/product'

export interface SaveSalesInput {
  collaborator_id?: string
  type_of_payment: string
  sub_total: string
  descount: number
  total: string
  owner_id?: string
  owner?: Owner
  collaborator?: Collaborator
  productsPDV: ProductSale[]
}
