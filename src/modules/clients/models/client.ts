import Owner from '@modules/owner/models/owner'
import SalesPDV from '@modules/sales/models/sale'
import Base from '@shared/baseEntity/entity'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@Entity('clients')
export default class Client extends Base {
  @Column({ nullable: false })
  name: string

  @Column()
  data_of_birth: Date

  @Column()
  sexo: string

  @Column()
  phone: string

  @Column({ unique: true })
  CPF: string

  @Column({ unique: true })
  email: string

  @Column()
  position: string

  @Column()
  address: string

  @Column()
  neighborhood: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  weight: number

  @Column()
  height: number

  @Column()
  allergies: string

  @Column()
  last_sale: Date

  @Column({ nullable: false, default: false })
  premium: boolean

  @Column({ nullable: false, default: false })
  triglicerideos: boolean

  @Column({ nullable: false, default: false })
  alergia: boolean

  @Column({ nullable: false, default: false })
  anemia: boolean

  @Column({ nullable: false, default: false })
  colesterol: boolean

  @Column({ nullable: false, default: false })
  dor_nas_pernas: boolean

  @Column({ nullable: false, default: false })
  pressao_baixa: boolean

  @Column({ nullable: false, default: false })
  artrose: boolean

  @Column({ nullable: false, default: false })
  sonolencia: boolean

  @Column({ nullable: false, default: false })
  dor_de_Cabeca: boolean

  @Column({ nullable: false, default: false })
  hipertensao: boolean

  @Column({ nullable: false, default: false })
  insonia: boolean

  @Column({ nullable: false, default: false })
  rinite: boolean

  @Column({ nullable: false, default: false })
  depressao: boolean

  @Column({ nullable: false, default: false })
  asma: boolean

  @Column({ nullable: false, default: false })
  indisposicao: boolean

  @Column({ nullable: false, default: false })
  gastrite: boolean

  @Column({ nullable: false, default: false })
  diabetes: boolean

  @Column({ nullable: false, default: false })
  osteoporose: boolean

  @Column({ nullable: false, default: false })
  cardiopatias: boolean

  @Column({ nullable: false, default: false })
  intestino_preso: boolean

  @OneToMany(() => SalesPDV, sales => sales.client)
  salesPdv?: SalesPDV[]

  @ManyToOne(() => Owner)
  owner: Owner
}
