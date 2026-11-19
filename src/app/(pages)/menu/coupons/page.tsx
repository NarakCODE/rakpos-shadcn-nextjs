import type { Metadata } from 'next'

import CouponsView from '@/views/coupons'

export const metadata: Metadata = {
  title: 'Coupons | RakPOS',
  description: 'Manage discount coupons for your POS.'
}

const CouponsPage = () => <CouponsView />

export default CouponsPage
