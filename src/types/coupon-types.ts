export const COUPON_TYPES = ['Percentage (%)', 'Flat Amount ($)'] as const

export type CouponType = (typeof COUPON_TYPES)[number]
export type CouponStatus = 'Active' | 'Inactive'
export type CouponColumn = 'code' | 'description' | 'type' | 'value' | 'minOrder' | 'expires' | 'used' | 'status'

export type Coupon = {
  id: string
  code: string
  description: string
  type: CouponType
  value: number
  minOrder: number
  expires: string
  used: number
  usageLimit?: number
  status: CouponStatus
}

export type CouponFormValues = Omit<Coupon, 'id' | 'used' | 'status'>
