import type { Reservation } from '@/types/reservations-types'

export type DiningZone = 'Main Dining' | 'Private Room' | 'Outdoor'
export type FloorTableStatus = 'Available' | 'Occupied' | 'Reserved' | 'Cleaning'

export type FloorPlanTable = {
  number: number
  capacity: number
  zone: DiningZone
  shape: 'round' | 'rectangular'
  activeOrder?: {
    orderNumber: string
    guestCount: number
  }
  cleaning?: boolean
}

export const mockFloorPlanTables: FloorPlanTable[] = [
  { number: 1, capacity: 2, zone: 'Main Dining', shape: 'round' },
  { number: 2, capacity: 4, zone: 'Main Dining', shape: 'round', activeOrder: { orderNumber: '#1001', guestCount: 2 } },
  { number: 3, capacity: 4, zone: 'Main Dining', shape: 'round' },
  {
    number: 4,
    capacity: 6,
    zone: 'Main Dining',
    shape: 'rectangular',
    activeOrder: { orderNumber: '#1002', guestCount: 4 }
  },
  { number: 5, capacity: 6, zone: 'Main Dining', shape: 'rectangular' },
  { number: 6, capacity: 4, zone: 'Main Dining', shape: 'round' },
  { number: 7, capacity: 4, zone: 'Main Dining', shape: 'rectangular', cleaning: true },
  {
    number: 8,
    capacity: 8,
    zone: 'Main Dining',
    shape: 'rectangular',
    activeOrder: { orderNumber: '#1003', guestCount: 6 }
  },
  { number: 9, capacity: 2, zone: 'Main Dining', shape: 'round' },
  { number: 10, capacity: 8, zone: 'Private Room', shape: 'rectangular' },
  {
    number: 11,
    capacity: 6,
    zone: 'Private Room',
    shape: 'rectangular',
    activeOrder: { orderNumber: '#1004', guestCount: 5 }
  },
  { number: 12, capacity: 4, zone: 'Private Room', shape: 'round' },
  { number: 13, capacity: 6, zone: 'Private Room', shape: 'rectangular' },
  { number: 14, capacity: 4, zone: 'Private Room', shape: 'round' },
  { number: 15, capacity: 2, zone: 'Outdoor', shape: 'round' },
  { number: 16, capacity: 10, zone: 'Outdoor', shape: 'rectangular' },
  { number: 17, capacity: 4, zone: 'Outdoor', shape: 'rectangular', cleaning: true },
  { number: 18, capacity: 12, zone: 'Outdoor', shape: 'rectangular' }
]

export const mockFloorPlanReservations: Reservation[] = [
  {
    id: 'floor-reservation-1050',
    reservationNumber: 'RS-1050',
    guestName: 'Bennett Family',
    phone: '+44 7700 900019',
    date: '2026-09-28',
    time: '19:30',
    guestCount: 4,
    table: 'Table 5',
    durationMinutes: 90,
    status: 'Pending',
    notes: 'Please arrange anniversary flowers on the table.'
  },
  {
    id: 'floor-reservation-1051',
    reservationNumber: 'RS-1051',
    guestName: 'Hartley Birthday',
    phone: '+44 7700 900001',
    date: '2026-09-28',
    time: '20:00',
    guestCount: 8,
    table: 'Table 10',
    durationMinutes: 120,
    status: 'Pending',
    notes: 'Birthday cake and simple table decorations requested.'
  },
  {
    id: 'floor-reservation-1052',
    reservationNumber: 'RS-1052',
    guestName: 'William Thornton',
    phone: '+44 7700 900020',
    date: '2026-09-28',
    time: '20:30',
    guestCount: 3,
    table: 'Table 14',
    durationMinutes: 90,
    status: 'Confirmed',
    notes: 'Please have a high chair ready.'
  },
  {
    id: 'floor-reservation-1053',
    reservationNumber: 'RS-1053',
    guestName: 'Olivia Parsons',
    phone: '+44 7700 900021',
    date: '2026-09-28',
    time: '18:45',
    guestCount: 2,
    table: 'Table 2',
    durationMinutes: 90,
    status: 'Seated',
    notes: 'Window seat if available.'
  }
]
