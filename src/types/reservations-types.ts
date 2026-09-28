export const RESERVATION_STATUSES = ['Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled'] as const

export type ReservationStatus = (typeof RESERVATION_STATUSES)[number]

export type Reservation = {
  id: string
  reservationNumber: string
  guestName: string
  phone: string
  email?: string
  date: string
  time: string
  guestCount: number
  table: string | null
  durationMinutes: number
  status: ReservationStatus
  notes?: string
}

export type NewReservationInput = Omit<Reservation, 'id' | 'reservationNumber'>
