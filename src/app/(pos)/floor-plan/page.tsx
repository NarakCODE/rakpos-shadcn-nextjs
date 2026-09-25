import type { Metadata } from 'next'
import { LayoutGridIcon } from 'lucide-react'

import PosPlaceholder from '@/views/pos/pos-placeholder'

export const metadata: Metadata = { title: 'Floor plan | RakPOS' }

const FloorPlanPage = () => (
  <PosPlaceholder
    title='Floor plan'
    description='Table layout and seating are not available in this demo yet.'
    icon={LayoutGridIcon}
  />
)

export default FloorPlanPage
