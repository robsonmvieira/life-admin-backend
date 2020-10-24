export default interface createClientInput {
  name: string

  data_of_birth: Date

  sexo: string

  phone: string

  CPF: string

  email: string

  position: string

  address: string

  neighborhood: string

  city: string

  state: string

  weight: number

  height: number

  allergies?: string

  others?: string

  last_sale?: Date

  premium?: boolean

  triglicerideos?: boolean

  alergia?: boolean

  anemia?: boolean

  colesterol?: boolean

  dor_nas_pernas?: boolean

  pressao_baixa?: boolean

  artrose?: boolean

  sonolencia?: boolean

  dor_de_Cabeca?: boolean

  hipertensao?: boolean

  insonia?: boolean

  rinite?: boolean

  depressao?: boolean

  asma?: boolean

  indisposicao?: boolean

  gastrite?: boolean

  diabetes?: boolean

  osteoporose?: boolean

  cardiopatias?: boolean

  intestino_preso?: boolean

  salesPdv?: []

  owner_id: string
}
