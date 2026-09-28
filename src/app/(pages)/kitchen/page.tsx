import type { Metadata } from 'next'

import KitchenView from '@/views/kitchen'

export const metadata: Metadata = {
  title: 'Kitchen Display | RakPOS',
  description: 'Track new, preparing, and ready kitchen orders.'
}

const KitchenPage = () => <KitchenView />

export default KitchenPage
