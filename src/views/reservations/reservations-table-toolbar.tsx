'use client'

import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RESERVATION_STATUSES, type ReservationStatus } from '@/types/reservations-types'
import type { ReservationDateRange } from './reservation-utils'

export type ReservationStatusFilter = ReservationStatus | 'all'

const DATE_RANGE_ITEMS = [
  { label: 'All Dates', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' }
]

const STATUS_ITEMS = [
  { label: 'All statuses', value: 'all' },
  ...RESERVATION_STATUSES.map(status => ({ label: status, value: status }))
]

type ReservationsTableToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
  dateRange: ReservationDateRange
  onDateRangeChange: (value: ReservationDateRange) => void
  selectedDate: string
  onDateChange: (value: string) => void
  statusFilter: ReservationStatusFilter
  onStatusFilterChange: (value: ReservationStatusFilter) => void
}

export function ReservationsTableToolbar({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  selectedDate,
  onDateChange,
  statusFilter,
  onStatusFilterChange
}: ReservationsTableToolbarProps) {
  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <div className='w-full sm:w-72'>
        <Label htmlFor='reservations-search' className='sr-only'>
          Search reservations
        </Label>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon className='size-4' aria-hidden='true' />
          </InputGroupAddon>
          <InputGroupInput
            id='reservations-search'
            value={search}
            onChange={event => onSearchChange(event.target.value)}
            placeholder='Search reservations'
            type='text'
          />
        </InputGroup>
      </div>

      <div className='flex flex-wrap items-center gap-2.5 sm:gap-3'>
        <div>
          <Label htmlFor='reservations-date-range' className='sr-only'>
            Date range
          </Label>
          <Select
            items={DATE_RANGE_ITEMS}
            value={dateRange}
            onValueChange={(value: string | null) => onDateRangeChange((value as ReservationDateRange) ?? 'all')}
          >
            <SelectTrigger id='reservations-date-range' aria-label='Reservation date range'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {DATE_RANGE_ITEMS.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='reservations-date-filter' className='sr-only'>
            Filter by reservation date
          </Label>
          <Input
            id='reservations-date-filter'
            type='date'
            value={selectedDate}
            onChange={event => onDateChange(event.target.value)}
            className='w-[160px]'
            aria-label='Filter by reservation date'
          />
        </div>

        <div>
          <Label htmlFor='reservations-status-filter' className='sr-only'>
            Reservation status filter
          </Label>
          <Select
            items={STATUS_ITEMS}
            value={statusFilter}
            onValueChange={(value: string | null) => onStatusFilterChange((value as ReservationStatusFilter) ?? 'all')}
          >
            <SelectTrigger id='reservations-status-filter' aria-label='Filter by reservation status'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {STATUS_ITEMS.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
