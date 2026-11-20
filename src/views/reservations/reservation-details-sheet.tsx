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
              <span className='text-title-mini-regular'>{reservation.guestName}</span>
            </SheetTitle>
            <ReservationStatusBadge status={reservation.status} />
          </div>
          <SheetDescription>Reservation {reservation.reservationNumber}</SheetDescription>
        </SheetHeader>

        <Separator />

        <div className='flex-1 space-y-6 overflow-y-auto px-4'>
          <section className='space-y-3' aria-labelledby='reservation-details-heading'>
            <h3 id='reservation-details-heading' className='text-body-small-semibold'>
              Reservation details
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-body-mini-regular'>Date</span>
                <p className='text-body-small-regular flex items-center gap-2'>
                  <CalendarDaysIcon className='text-muted-foreground size-4' aria-hidden='true' />
                  {formatReservationDate(reservation.date)}
                </p>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-body-mini-regular'>Time</span>
                <p className='text-body-small-regular flex items-center gap-2'>
                  <Clock3Icon className='text-muted-foreground size-4' aria-hidden='true' />
                  {formatReservationTime(reservation.time)}
                </p>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-body-mini-regular'>Party size</span>
                <p className='text-body-small-regular flex items-center gap-2'>
                  <UsersIcon className='text-muted-foreground size-4' aria-hidden='true' />
                  {reservation.guestCount} {reservation.guestCount === 1 ? 'guest' : 'guests'}
                </p>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-body-mini-regular'>Table</span>
                <p className='text-body-small-regular flex items-center gap-2'>
                  <MapPinIcon className='text-muted-foreground size-4' aria-hidden='true' />
                  {reservation.table ?? '—'}
                </p>
              </div>
              <div className='space-y-1'>
                <span className='text-muted-foreground text-body-mini-regular'>Duration</span>
                <p className='text-body-small-regular'>{reservation.durationMinutes} min</p>
              </div>
            </div>
          </section>

          <Separator />

          <section className='space-y-3' aria-labelledby='reservation-guest-heading'>
            <h3 id='reservation-guest-heading' className='text-body-small-semibold'>
              Contact
            </h3>
            <div className='text-body-small-regular space-y-2'>
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
                <h3 className='text-body-small-semibold'>Notes</h3>
                <p className='text-muted-foreground text-body-small-regular'>{reservation.notes}</p>
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
