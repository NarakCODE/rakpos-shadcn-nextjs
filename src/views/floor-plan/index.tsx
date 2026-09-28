'use client'

import { useMemo, useState } from 'react'

import { format } from 'date-fns'
import {
  CalendarDaysIcon,
  CheckIcon,
  ChevronDownIcon,
  Clock3Icon,
  MapPinIcon,
  MessageSquareTextIcon,
  PhoneIcon,
  SlidersHorizontalIcon,
  UsersIcon
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { mockFloorPlanReservations, mockFloorPlanTables } from '@/fake-db/floor-plan'
import type { DiningZone, FloorPlanTable, FloorTableStatus } from '@/fake-db/floor-plan'
import type { NewReservationInput, Reservation } from '@/types/reservations-types'
import { ReservationFormSheet } from '@/views/reservations/reservation-form-sheet'

type ZoneFilter = 'All' | DiningZone
type StatusFilter = 'all' | FloorTableStatus
type TableView = FloorPlanTable & {
  status: FloorTableStatus
  context: string
  detail?: string
}

const DEFAULT_DATE = '2026-09-28'
const CAPACITY_OPTIONS = [2, 4, 6, 8, 10, 12]

const ZONES: ZoneFilter[] = ['All', 'Main Dining', 'Private Room', 'Outdoor']

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: 'All statuses', value: 'all' },
  { label: 'Available', value: 'Available' },
  { label: 'Occupied', value: 'Occupied' },
  { label: 'Reserved', value: 'Reserved' },
  { label: 'Cleaning', value: 'Cleaning' }
]

const TABLE_STATUS_META: Record<FloorTableStatus, { variant: 'success' | 'danger' | 'warning' | 'accent' }> = {
  Available: { variant: 'success' },
  Occupied: { variant: 'danger' },
  Reserved: { variant: 'warning' },
  Cleaning: { variant: 'accent' }
}

function dateFromValue(value: string) {
  const [year, month, day] = value.split('-').map(Number)

  return new Date(year, month - 1, day)
}

function formatFloorDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(dateFromValue(value))
}

function getTableViews(tables: FloorPlanTable[], reservations: Reservation[], date: string): TableView[] {
  const activeReservations = reservations.filter(
    reservation => reservation.date === date && reservation.status !== 'Completed' && reservation.status !== 'Cancelled'
  )

  return tables.map(table => {
    if (table.activeOrder) {
      return {
        ...table,
        status: 'Occupied',
        context: `Order ${table.activeOrder.orderNumber}`,
        detail: `${table.activeOrder.guestCount} ${table.activeOrder.guestCount === 1 ? 'guest' : 'guests'}`
      }
    }

    if (table.cleaning) {
      return { ...table, status: 'Cleaning', context: 'Being turned over', detail: 'Please wait' }
    }

    const reservation = activeReservations.find(item => item.table === `Table ${table.number}`)

    if (reservation?.status === 'Seated') {
      return {
        ...table,
        status: 'Occupied',
        context: reservation.guestName,
        detail: `Seated · ${reservation.guestCount} guests`
      }
    }

    if (reservation) {
      return {
        ...table,
        status: 'Reserved',
        context: reservation.guestName,
        detail: `${reservation.time} · ${reservation.guestCount} ${reservation.guestCount === 1 ? 'guest' : 'guests'}`
      }
    }

    return { ...table, status: 'Available', context: 'Ready for seating' }
  })
}

function TableLayoutGraphic({ table }: { table: FloorPlanTable }) {
  const horizontalSeats = (table.capacity - 2) / 2

  return (
    <svg
      viewBox='0 0 160 88'
      className='h-[4.5rem] w-full'
      role='img'
      aria-label={`${table.capacity}-seat ${table.shape} table layout`}
    >
      {table.shape === 'round' ? (
        <>
          <circle cx='80' cy='44' r='19' className='fill-muted stroke-border' strokeWidth='1.5' />
          {Array.from({ length: table.capacity }, (_, index) => {
            const angle = (2 * Math.PI * index) / table.capacity - Math.PI / 2
            const x = 80 + Math.cos(angle) * 34
            const y = 44 + Math.sin(angle) * 30

            return (
              <rect
                key={index}
                x={x - 5}
                y={y - 3.5}
                width='10'
                height='7'
                rx='2.5'
                transform={`rotate(${(angle * 180) / Math.PI + 90} ${x} ${y})`}
                className='fill-background stroke-muted-foreground/50'
                strokeWidth='1.25'
              />
            )
          })}
        </>
      ) : (
        <>
          <rect x='41' y='31' width='78' height='26' rx='5' className='fill-muted stroke-border' strokeWidth='1.5' />
          {Array.from({ length: horizontalSeats }, (_, index) => {
            const x = horizontalSeats === 1 ? 80 : 49 + (index * 62) / (horizontalSeats - 1)

            return (
              <g key={index}>
                <rect
                  x={x - 5}
                  y='16'
                  width='10'
                  height='8'
                  rx='2.5'
                  className='fill-background stroke-muted-foreground/50'
                  strokeWidth='1.25'
                />
                <rect
                  x={x - 5}
                  y='64'
                  width='10'
                  height='8'
                  rx='2.5'
                  className='fill-background stroke-muted-foreground/50'
                  strokeWidth='1.25'
                />
              </g>
            )
          })}
          <rect
            x='23'
            y='39'
            width='8'
            height='10'
            rx='2.5'
            transform='rotate(90 27 44)'
            className='fill-background stroke-muted-foreground/50'
            strokeWidth='1.25'
          />
          <rect
            x='129'
            y='39'
            width='8'
            height='10'
            rx='2.5'
            transform='rotate(90 133 44)'
            className='fill-background stroke-muted-foreground/50'
            strokeWidth='1.25'
          />
        </>
      )}
    </svg>
  )
}

function TableCard({ table }: { table: TableView }) {
  const statusMeta = TABLE_STATUS_META[table.status]

  return (
    <Card className='gap-0 overflow-hidden py-0'>
      <CardHeader className='gap-1.5 p-3 pb-0'>
        <div className='flex items-center justify-between gap-2'>
          <h3 className='text-sm font-semibold'>Table {table.number}</h3>
          <Badge variant={statusMeta.variant}>{table.status}</Badge>
        </div>
        <p className='text-muted-foreground text-xs'>
          {table.capacity} seats <span aria-hidden='true'>·</span> {table.zone}
        </p>
      </CardHeader>
      <div className='px-2 pt-1'>
        <TableLayoutGraphic table={table} />
      </div>
      <CardContent className='min-h-12 px-3 pt-0 pb-3'>
        <p className='truncate text-xs font-medium' title={table.context}>
          {table.context}
        </p>
        {table.detail && <p className='text-muted-foreground mt-0.5 truncate text-xs'>{table.detail}</p>}
      </CardContent>
    </Card>
  )
}

function ReservationStatusBadge({ status }: { status: Reservation['status'] }) {
  const isSeated = status === 'Seated'

  return <Badge variant={isSeated ? 'warning' : 'accent'}>{isSeated ? 'Seated' : 'Upcoming'}</Badge>
}

function ReservationCard({
  reservation,
  onSeat,
  onEdit
}: {
  reservation: Reservation
  onSeat: (reservation: Reservation) => void
  onEdit: (reservation: Reservation) => void
}) {
  const initials = reservation.guestName
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()

  const isSeated = reservation.status === 'Seated'

  return (
    <Card className='h-full gap-0 overflow-hidden py-0'>
      <CardHeader className='gap-3 p-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex min-w-0 items-center gap-3'>
            <span className='bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold'>
              {initials}
            </span>
            <div className='min-w-0'>
              <h3 className='truncate text-sm font-semibold' title={reservation.guestName}>
                {reservation.guestName}
              </h3>
              <a
                href={`tel:${reservation.phone}`}
                className='text-muted-foreground hover:text-foreground mt-1 inline-flex items-center gap-1.5 text-xs'
              >
                <PhoneIcon className='size-3.5' aria-hidden='true' />
                {reservation.phone}
              </a>
            </div>
          </div>
          <ReservationStatusBadge status={reservation.status} />
        </div>
      </CardHeader>

      <Separator />

      <CardContent className='grid grid-cols-2 gap-x-3 gap-y-3 p-4'>
        <div>
          <p className='text-muted-foreground text-xs'>Date</p>
          <p className='mt-1 text-sm font-medium'>{formatFloorDate(reservation.date)}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs'>Time</p>
          <p className='mt-1 inline-flex items-center gap-1.5 text-sm font-medium tabular-nums'>
            <Clock3Icon className='text-muted-foreground size-3.5' aria-hidden='true' />
            {reservation.time}
          </p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs'>Party size</p>
          <p className='mt-1 inline-flex items-center gap-1.5 text-sm font-medium'>
            <UsersIcon className='text-muted-foreground size-3.5' aria-hidden='true' />
            {reservation.guestCount} {reservation.guestCount === 1 ? 'guest' : 'guests'}
          </p>
        </div>
        <div>
          <p className='text-muted-foreground text-xs'>Table</p>
          <p className='mt-1 inline-flex items-center gap-1.5 text-sm font-medium'>
            <MapPinIcon className='text-muted-foreground size-3.5' aria-hidden='true' />
            {reservation.table ?? 'Unassigned'}
          </p>
        </div>
      </CardContent>

      <div className='px-4 pb-4'>
        <div className='bg-muted/50 text-muted-foreground flex min-h-14 gap-2 rounded-md px-3 py-2 text-xs leading-5'>
          <MessageSquareTextIcon className='mt-0.5 size-3.5 shrink-0' aria-hidden='true' />
          <p className='line-clamp-2'>{reservation.notes || 'No special requests'}</p>
        </div>
      </div>

      <Separator />

      <CardFooter className='justify-between gap-2 p-3'>
        <Button
          type='button'
          size='sm'
          variant={isSeated ? 'outline' : 'secondary'}
          disabled={isSeated}
          onClick={() => onSeat(reservation)}
        >
          <CheckIcon aria-hidden='true' />
          {isSeated ? 'Seated' : 'Seat Guest'}
        </Button>
        <Button
          type='button'
          size='sm'
          variant='ghost'
          aria-label={`Edit reservation for ${reservation.guestName}`}
          onClick={() => onEdit(reservation)}
        >
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function FloorPlanView() {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_DATE)
  const [selectedZone, setSelectedZone] = useState<ZoneFilter>('All')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>([])
  const [reservations, setReservations] = useState<Reservation[]>(mockFloorPlanReservations)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isCapacityFilterOpen, setIsCapacityFilterOpen] = useState(false)
  const [isReservationSheetOpen, setIsReservationSheetOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)

  const tableViews = useMemo(
    () => getTableViews(mockFloorPlanTables, reservations, selectedDate),
    [reservations, selectedDate]
  )

  const visibleTables = useMemo(
    () =>
      tableViews.filter(table => {
        if (selectedZone !== 'All' && table.zone !== selectedZone) return false
        if (statusFilter !== 'all' && table.status !== statusFilter) return false
        if (selectedCapacities.length > 0 && !selectedCapacities.includes(table.capacity)) return false

        return true
      }),
    [selectedCapacities, selectedZone, statusFilter, tableViews]
  )

  const upcomingReservations = useMemo(
    () =>
      reservations
        .filter(
          reservation =>
            reservation.date === selectedDate &&
            (reservation.status === 'Pending' || reservation.status === 'Confirmed' || reservation.status === 'Seated')
        )
        .sort((first, second) => first.time.localeCompare(second.time)),
    [reservations, selectedDate]
  )

  const availableCount = tableViews.filter(table => table.status === 'Available').length
  const hasTableFilters = selectedZone !== 'All' || statusFilter !== 'all' || selectedCapacities.length > 0

  const handleOpenNewReservation = () => {
    setEditingReservation(null)
    setIsReservationSheetOpen(true)
  }

  const handleCreateReservation = (input: NewReservationInput) => {
    const timestamp = Date.now()

    const reservation: Reservation = {
      ...input,
      id: `floor-reservation-${timestamp}`,
      reservationNumber: `RS-${String(timestamp).slice(-6)}`
    }

    setReservations(currentReservations => [reservation, ...currentReservations])
    setIsReservationSheetOpen(false)
    toast.success('Reservation created')
  }

  const handleUpdateReservation = (reservationId: string, input: NewReservationInput) => {
    setReservations(currentReservations =>
      currentReservations.map(reservation =>
        reservation.id === reservationId ? { ...reservation, ...input } : reservation
      )
    )
    setEditingReservation(null)
    setIsReservationSheetOpen(false)
    toast.success('Reservation updated')
  }

  const handleSeatGuest = (reservation: Reservation) => {
    setReservations(currentReservations =>
      currentReservations.map(item => (item.id === reservation.id ? { ...item, status: 'Seated' } : item))
    )
    toast.success(`${reservation.guestName} seated at ${reservation.table ?? 'an available table'}`)
  }

  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation(reservation)
    setIsReservationSheetOpen(true)
  }

  const clearTableFilters = () => {
    setSelectedZone('All')
    setStatusFilter('all')
    setSelectedCapacities([])
  }

  return (
    <div className='flex flex-col gap-6'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Tables</h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            Floor overview · {availableCount} tables ready for seating
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger
              render={
                <Button type='button' variant='outline' className='justify-between'>
                  <CalendarDaysIcon aria-hidden='true' />
                  {formatFloorDate(selectedDate)}
                  <ChevronDownIcon className='text-muted-foreground size-4' aria-hidden='true' />
                </Button>
              }
            />
            <PopoverContent align='end' density='calendar'>
              <Calendar
                selected={dateFromValue(selectedDate)}
                defaultMonth={dateFromValue(selectedDate)}
                onSelect={date => {
                  if (date) setSelectedDate(format(date, 'yyyy-MM-dd'))
                  setIsDatePickerOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
          <Button type='button' variant='pos-action' onClick={handleOpenNewReservation}>
            <span aria-hidden='true'>+</span>
            New Reservation
          </Button>
        </div>
      </header>

      <div className='bg-card flex flex-col gap-3 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-wrap items-center gap-1.5' role='group' aria-label='Filter tables by zone'>
          {ZONES.map(zone => (
            <Button
              key={zone}
              type='button'
              size='sm'
              shape='round'
              variant={selectedZone === zone ? 'secondary' : 'ghost'}
              aria-pressed={selectedZone === zone}
              onClick={() => setSelectedZone(zone)}
            >
              {zone}
            </Button>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <Select
            items={STATUS_OPTIONS}
            value={statusFilter}
            onValueChange={value => setStatusFilter((value as StatusFilter | null) ?? 'all')}
          >
            <SelectTrigger aria-label='Filter by table status' className='w-40'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {STATUS_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Popover open={isCapacityFilterOpen} onOpenChange={setIsCapacityFilterOpen}>
            <PopoverTrigger
              render={
                <Button
                  type='button'
                  variant={selectedCapacities.length ? 'secondary' : 'outline'}
                  size='icon-sm'
                  aria-label={
                    selectedCapacities.length
                      ? `Filter by table capacity, ${selectedCapacities.length} selected`
                      : 'Filter by table capacity'
                  }
                  title='Filter by table capacity'
                >
                  <SlidersHorizontalIcon aria-hidden='true' />
                </Button>
              }
            />
            <PopoverContent align='end' density='compact' className='w-56'>
              <div className='px-2 py-2'>
                <p className='text-sm font-medium'>Seat count</p>
                <p className='text-muted-foreground mt-1 text-xs'>Show tables with these capacities</p>
              </div>
              <div className='grid grid-cols-2 gap-1'>
                {CAPACITY_OPTIONS.map(capacity => {
                  const checked = selectedCapacities.includes(capacity)
                  const id = `capacity-filter-${capacity}`

                  return (
                    <label
                      key={capacity}
                      htmlFor={id}
                      className='hover:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm'
                    >
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={nextChecked =>
                          setSelectedCapacities(current =>
                            nextChecked
                              ? [...current, capacity]
                              : current.filter(selectedCapacity => selectedCapacity !== capacity)
                          )
                        }
                      />
                      {capacity} seats
                    </label>
                  )
                })}
              </div>
              {selectedCapacities.length > 0 && (
                <Button
                  type='button'
                  size='sm'
                  variant='ghost'
                  className='mt-2 w-full'
                  onClick={() => setSelectedCapacities([])}
                >
                  Clear seat count
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <section aria-labelledby='floor-layout-heading' className='space-y-4'>
        <div className='flex flex-wrap items-end justify-between gap-3'>
          <div>
            <h2 id='floor-layout-heading' className='text-base font-semibold'>
              Dining floor
            </h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              Showing {visibleTables.length} of {tableViews.length} tables
            </p>
          </div>
          {hasTableFilters && (
            <Button type='button' size='sm' variant='ghost' onClick={clearTableFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {visibleTables.length > 0 ? (
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6'>
            {visibleTables.map(table => (
              <TableCard key={table.number} table={table} />
            ))}
          </div>
        ) : (
          <div className='bg-card flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed px-5 text-center'>
            <p className='text-sm font-medium'>No tables match these filters</p>
            <p className='text-muted-foreground mt-1 text-sm'>
              Adjust the zone, status, or seat count to see more tables.
            </p>
            <Button type='button' variant='outline' size='sm' className='mt-4' onClick={clearTableFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </section>

      <section aria-labelledby='upcoming-reservations-heading' className='space-y-4'>
        <div className='flex flex-wrap items-end justify-between gap-3'>
          <div>
            <h2 id='upcoming-reservations-heading' className='text-base font-semibold'>
              Upcoming Reservations
            </h2>
            <p className='text-muted-foreground mt-1 text-sm'>
              {upcomingReservations.length} bookings for {formatFloorDate(selectedDate)}
            </p>
          </div>
          <Button type='button' variant='ghost' size='sm' onClick={handleOpenNewReservation}>
            New reservation
          </Button>
        </div>

        {upcomingReservations.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4'>
            {upcomingReservations.map(reservation => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onSeat={handleSeatGuest}
                onEdit={handleEditReservation}
              />
            ))}
          </div>
        ) : (
          <div className='bg-card rounded-xl border border-dashed px-5 py-10 text-center'>
            <p className='text-sm font-medium'>No reservations for this date</p>
            <p className='text-muted-foreground mt-1 text-sm'>Add a booking to keep the floor plan up to date.</p>
            <Button type='button' variant='outline' size='sm' className='mt-4' onClick={handleOpenNewReservation}>
              New reservation
            </Button>
          </div>
        )}
      </section>

      <ReservationFormSheet
        key={editingReservation?.id ?? `new-${selectedDate}`}
        open={isReservationSheetOpen}
        onOpenChange={setIsReservationSheetOpen}
        reservation={editingReservation}
        defaultDate={selectedDate}
        onCreate={handleCreateReservation}
        onUpdate={handleUpdateReservation}
      />
    </div>
  )
}
