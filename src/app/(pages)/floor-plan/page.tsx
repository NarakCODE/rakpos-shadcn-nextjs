import type { Metadata } from 'next'

import FloorPlanView from '@/views/floor-plan'

export const metadata: Metadata = {
  title: 'Tables | RakPOS',
  description: 'View table availability, active orders, and upcoming reservations.'
}

const FloorPlanPage = () => <FloorPlanView />

export default FloorPlanPage
