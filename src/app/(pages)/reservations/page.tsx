import type { Metadata } from 'next'

import ReservationsView from '@/views/reservations'

export const metadata: Metadata = {
  title: 'Reservations | RakPOS',
  description: 'Manage guest reservations, seating details, and booking status.'
}

const ReservationsPage = () => <ReservationsView />

export default ReservationsPage
