import type { Metadata } from 'next'
import { ChefHatIcon } from 'lucide-react'

import PosPlaceholder from '@/views/pos/pos-placeholder'

export const metadata: Metadata = { title: 'Kitchen | RakPOS' }

const KitchenPage = () => (
  <PosPlaceholder
    title='Kitchen'
    description='Kitchen tickets are not available in this demo yet.'
    icon={ChefHatIcon}
  />
)

export default KitchenPage
