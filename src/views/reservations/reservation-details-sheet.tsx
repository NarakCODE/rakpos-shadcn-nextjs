'use client'

import { CalendarDaysIcon, Clock3Icon, MailIcon, MapPinIcon, PhoneIcon, UsersIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { Reservation } from '@/types/reservations-types'
import { formatReservationDate, formatReservationTime } from './reservation-utils'
import { ReservationStatusBadge } from './reservation-status-badge'

type ReservationDetailsSheetProps = {
  reservation: Reservation | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEditReservation: (reservation: Reservation) => void
}

export function ReservationDetailsSheet({
  reservation,
  open,
  onOpenChange,
  onEditReservation
}: ReservationDetailsSheetProps) {
  if (!reservation) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='right' className='flex flex-col sm:max-w-md md:max-w-lg'>
        <SheetHeader>
          <div className='flex flex-wrap items-center gap-2'>
            <SheetTitle>
              <span className='text-xl'>{reservation.guestName}</span>
            </SheetTitle>
            <ReservationStatusBadge status={reservation.status} />
          </div>
          <SheetDescription>Reservation {reservation.reservationNumber}</SheetDescription>
        </SheetHeader>

        <Separator />

        <div className='flex-1 space-y-6 overflow-y-auto px-4'>
          <section className='space-y-3' aria-labelledby='reservation-details-heading'>
            <h3 id='reservation-details-heading' className='text-sm font-semibold'>
              Reservation details
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-xs'>Date</span>
                <p className='flex items-center gap-2 text-sm'>
                  <CalendarDaysIcon className='text-muted-foreground size-4' aria-hidden='true' />
                  {formatReservationDate(reservation.date)}
                </p>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-xs'>Time</span>
                <p className='flex items-center gap-2 text-sm'>
                  <Clock3Icon className='text-muted-foreground size-4' aria-hidden='true' />
                  {formatReservationTime(reservation.time)}
                </p>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-xs'>Party size</span>
                <p className='flex items-center gap-2 text-sm'>
                  <UsersIcon className='text-muted-foreground size-4' aria-hidden='true' />
                  {reservation.guestCount} {reservation.guestCount === 1 ? 'guest' : 'guests'}
                </p>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-xs'>Table</span>
                <p className='flex items-center gap-2 text-sm'>
                  <MapPinIcon className='text-muted-foreground size-4' aria-hidden='true' />
                  {reservation.table ?? '—'}
                </p>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-xs'>Duration</span>
                <p className='text-sm'>{reservation.durationMinutes} min</p>
              </div>
            </div>
          </section>

          <Separator />

          <section className='space-y-3' aria-labelledby='reservation-guest-heading'>
            <h3 id='reservation-guest-heading' className='text-sm font-semibold'>
              Contact
            </h3>
            <div className='space-y-2 text-sm'>
              <a className='text-muted-foreground hover:text-foreground' href={'tel:' + reservation.phone}>
                <span className='inline-flex items-center gap-2'>
                  <PhoneIcon className='size-4' aria-hidden='true' />
                  {reservation.phone}
                </span>
              </a>
              {reservation.email && (
                <a className='text-muted-foreground hover:text-foreground block' href={'mailto:' + reservation.email}>
                  <span className='inline-flex items-center gap-2'>
                    <MailIcon className='size-4' aria-hidden='true' />
                    {reservation.email}
                  </span>
                </a>
              )}
            </div>
          </section>

          {reservation.notes && (
            <>
              <Separator />
              <div className='space-y-2'>
                <h3 className='text-sm font-semibold'>Notes</h3>
                <p className='text-muted-foreground text-sm'>{reservation.notes}</p>
              </div>
            </>
          )}
        </div>

        <Separator />

        <SheetFooter>
          <Button type='button' className='w-full' onClick={() => onEditReservation(reservation)}>
            Edit reservation
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
