import type { Metadata } from 'next'
import { CalendarDaysIcon } from 'lucide-react'

import PosPlaceholder from '@/views/pos/pos-placeholder'

export const metadata: Metadata = { title: 'Reservations | RakPOS' }

const ReservationsPage = () => (
  <PosPlaceholder
    title='Reservations'
    description='Reservation management is not available in this demo yet.'
    icon={CalendarDaysIcon}
  />
)

export default ReservationsPage
