'use client'

import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Reservation } from '@/types/reservations-types'
import { formatReservationDateTime } from './reservation-utils'
import { ReservationStatusBadge } from './reservation-status-badge'

type ReservationsTableProps = {
  reservations: Reservation[]
  onViewReservation: (reservation: Reservation) => void
  onEditReservation: (reservation: Reservation) => void
  onDeleteReservation: (reservation: Reservation) => void
}

export function ReservationsTable({
  reservations,
  onViewReservation,
  onEditReservation,
  onDeleteReservation
}: ReservationsTableProps) {
  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader variant='muted'>
          <TableRow>
            <TableHead className='min-w-48'>Guest</TableHead>
            <TableHead className='w-44'>Phone</TableHead>
            <TableHead className='min-w-52'>Date &amp; Time</TableHead>
            <TableHead className='w-28'>Party Size</TableHead>
            <TableHead className='w-32'>Table</TableHead>
            <TableHead className='w-28'>Duration</TableHead>
            <TableHead className='w-32'>Status</TableHead>
            <TableHead className='w-32 text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reservations.length > 0 ? (
            reservations.map(reservation => (
              <TableRow key={reservation.id}>
                <TableCell className='font-medium'>{reservation.guestName}</TableCell>
                <TableCell>{reservation.phone}</TableCell>
                <TableCell className='whitespace-nowrap'>
                  {formatReservationDateTime(reservation.date, reservation.time)}
                </TableCell>
                <TableCell>
                  {reservation.guestCount} {reservation.guestCount === 1 ? 'guest' : 'guests'}
                </TableCell>
                <TableCell>{reservation.table ?? '—'}</TableCell>
                <TableCell>{reservation.durationMinutes} min</TableCell>
                <TableCell>
                  <ReservationStatusBadge status={reservation.status} />
                </TableCell>
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-1'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon-sm'
                      onClick={() => onViewReservation(reservation)}
                      aria-label={'View ' + reservation.guestName + ' reservation'}
                      title='View'
                    >
                      <EyeIcon className='size-4' aria-hidden='true' />
                    </Button>
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon-sm'
                      onClick={() => onEditReservation(reservation)}
                      aria-label={'Edit ' + reservation.guestName + ' reservation'}
                      title='Edit'
                    >
                      <PencilIcon className='size-4' aria-hidden='true' />
                    </Button>
                    <Button
                      type='button'
                      variant='ghost-destructive-text'
                      size='icon-sm'
                      onClick={() => onDeleteReservation(reservation)}
                      aria-label={'Delete ' + reservation.guestName + ' reservation'}
                      title='Delete'
                    >
                      <Trash2Icon className='size-4' aria-hidden='true' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className='h-28 text-center'>
                <div className='flex flex-col items-center justify-center gap-1.5'>
                  <p className='font-medium'>No reservations found</p>
                  <p className='text-muted-foreground text-sm'>Try another search, date, or status filter.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
