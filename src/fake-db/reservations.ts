import type { Reservation } from '@/types/reservations-types'

export const mockReservations: Reservation[] = [
  {
    id: 'reservation-1042',
    reservationNumber: 'RS-1042',
    guestName: 'Victoria Aldridge',
    phone: '+44 7700 900019',
    date: '2026-09-12',
    time: '20:00',
    guestCount: 5,
    table: null,
    durationMinutes: 120,
    status: 'Cancelled'
  },
  {
    id: 'reservation-1041',
    reservationNumber: 'RS-1041',
    guestName: 'Oliver Fletcher',
    phone: '+44 7700 900020',
    date: '2026-09-16',
    time: '13:30',
    guestCount: 2,
    table: 'Table 1',
    durationMinutes: 60,
    status: 'Cancelled'
  },
  {
    id: 'reservation-1040',
    reservationNumber: 'RS-1040',
    guestName: 'Henry Blackwood',
    phone: '+44 7700 900013',
    date: '2026-09-19',
    time: '19:30',
    guestCount: 4,
    table: 'Table 4',
    durationMinutes: 90,
    status: 'Completed'
  },
  {
    id: 'reservation-1039',
    reservationNumber: 'RS-1039',
    guestName: 'Rebecca Lawson',
    phone: '+44 7700 900014',
    date: '2026-09-20',
    time: '20:00',
    guestCount: 3,
    table: 'Table 9',
    durationMinutes: 90,
    status: 'Completed'
  },
  {
    id: 'reservation-1038',
    reservationNumber: 'RS-1038',
    guestName: 'Andrew Clifton',
    phone: '+44 7700 900015',
    date: '2026-09-21',
    time: '13:00',
    guestCount: 6,
    table: 'Table 11',
    durationMinutes: 120,
    status: 'Completed'
  },
  {
    id: 'reservation-1037',
    reservationNumber: 'RS-1037',
    guestName: 'Elizabeth Fairfax',
    phone: '+44 7700 900016',
    date: '2026-09-21',
    time: '19:00',
    guestCount: 2,
    table: 'Table 2',
    durationMinutes: 60,
    status: 'Completed'
  },
  {
    id: 'reservation-1036',
    reservationNumber: 'RS-1036',
    guestName: 'Thomas Barrow',
    phone: '+44 7700 900017',
    date: '2026-09-22',
    time: '20:30',
    guestCount: 7,
    table: 'Table 13',
    durationMinutes: 150,
    status: 'Completed'
  },
  {
    id: 'reservation-1035',
    reservationNumber: 'RS-1035',
    guestName: 'Dorothy Whitfield',
    phone: '+44 7700 900018',
    date: '2026-09-24',
    time: '12:30',
    guestCount: 3,
    table: 'Table 6',
    durationMinutes: 90,
    status: 'Completed'
  },
  {
    id: 'reservation-1034',
    reservationNumber: 'RS-1034',
    guestName: 'Sophie Bennett',
    phone: '+44 7756 789005',
    date: '2026-09-25',
    time: '19:30',
    guestCount: 2,
    table: 'Table 3',
    durationMinutes: 90,
    status: 'Completed'
  },
  {
    id: 'reservation-1033',
    reservationNumber: 'RS-1033',
    guestName: 'James Hartley',
    phone: '+44 7700 900001',
    date: '2026-09-26',
    time: '13:00',
    guestCount: 4,
    table: 'Table 5',
    durationMinutes: 90,
    status: 'Seated'
  }
]
