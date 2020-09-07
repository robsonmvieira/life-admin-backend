export default interface UpdateProductSaleInput{
  sku?: string
  title?: string
  volume_points?: number
  price_suggest?: number
  from_zero_to_four_hundred_ninety_nine?: number
  from_five_hundred_to_nine_hundred_ninety_nine?: number
  from_one_thousand_to_three_thousand_nine_hundred_ninety_nine?: number
  more_than_four_thousand?: number
  cost_per_pv?: number
  category_id?: string
}