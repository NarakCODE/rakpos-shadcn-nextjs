import type { Coupon } from '@/types/coupon-types'

export const mockCoupons: Coupon[] = [
  {
    id: 'dine15',
    code: 'DINE15',
    description: '15% off for dine-in orders',
    type: 'Percentage (%)',
    value: 15,
    minOrder: 6,
    expires: 'No expiry',
    used: 201,
    status: 'Active'
  },
  {
    id: 'flat5',
    code: 'FLAT5',
    description: 'Flat $5 off on orders above $15',
    type: 'Flat Amount ($)',
    value: 5,
    minOrder: 15,
    expires: '2 Dec 2026',
    used: 89,
    usageLimit: 500,
    status: 'Active'
  },
  {
    id: 'save100',
    code: 'SAVE100',
    description: 'Flat $10 off on orders above $25',
    type: 'Flat Amount ($)',
    value: 10,
    minOrder: 25,
    expires: 'No expiry',
    used: 34,
    usageLimit: 200,
    status: 'Active'
  },
  {
    id: 'summer30',
    code: 'SUMMER30',
    description: '30% summer special – expired',
    type: 'Percentage (%)',
    value: 30,
    minOrder: 12,
    expires: '1 Sep 2026',
    used: 567,
    status: 'Inactive'
  },
  {
    id: 'welcome20',
    code: 'WELCOME20',
    description: '20% off on your first order',
    type: 'Percentage (%)',
    value: 20,
    minOrder: 8,
    expires: '4 Mar 2027',
    used: 142,
    usageLimit: 1000,
    status: 'Active'
  }
]
