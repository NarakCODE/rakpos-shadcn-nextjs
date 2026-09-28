'use client'

import { useState } from 'react'

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CalendarProps = {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  defaultMonth?: Date
  className?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function Calendar({ selected, onSelect, defaultMonth, className }: CalendarProps) {
  const [month, setMonth] = useState(() => startOfMonth(selected ?? defaultMonth ?? new Date()))

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month))
  })

  return (
    <div className={cn('w-64 space-y-3', className)}>
      <div className='flex items-center justify-between'>
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          aria-label='Previous month'
          onClick={() => setMonth(previous => addMonths(previous, -1))}
        >
          <ChevronLeftIcon className='size-4' aria-hidden='true' />
        </Button>
        <p className='text-sm font-medium' aria-live='polite'>
          {format(month, 'MMMM yyyy')}
        </p>
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          aria-label='Next month'
          onClick={() => setMonth(previous => addMonths(previous, 1))}
        >
          <ChevronRightIcon className='size-4' aria-hidden='true' />
        </Button>
      </div>

      <div role='grid' aria-label={format(month, 'MMMM yyyy')}>
        <div className='grid grid-cols-7' role='row'>
          {WEEKDAYS.map(day => (
            <span
              key={day}
              role='columnheader'
              className='text-muted-foreground grid size-8 place-items-center text-xs'
            >
              {day}
            </span>
          ))}
        </div>
        <div className='grid grid-cols-7' role='rowgroup'>
          {days.map(day => {
            const isSelected = selected ? isSameDay(day, selected) : false
            const isCurrentMonth = isSameMonth(day, month)

            return (
              <div key={day.toISOString()} role='presentation' className='grid size-8 place-items-center'>
                <Button
                  type='button'
                  variant={isSelected ? 'default' : 'ghost'}
                  size='icon-sm'
                  className={cn(
                    'size-8 p-0 font-normal',
                    !isCurrentMonth && 'text-muted-foreground opacity-50',
                    !isSelected && 'hover:bg-muted'
                  )}
                  aria-label={format(day, 'EEEE, MMMM d, yyyy')}
                  aria-pressed={isSelected}
                  onClick={() => {
                    onSelect?.(day)
                    setMonth(startOfMonth(day))
                  }}
                >
                  {format(day, 'd')}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { Calendar }
