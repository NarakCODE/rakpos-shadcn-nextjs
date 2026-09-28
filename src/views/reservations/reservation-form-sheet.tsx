'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, isValid, parseISO } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { NewReservationInput, Reservation } from '@/types/reservations-types'

const DURATION_OPTIONS = [
  { label: '60 min', value: '60' },
  { label: '90 min', value: '90' },
  { label: '120 min', value: '120' },
  { label: '150 min', value: '150' },
  { label: '180 min', value: '180' }
] as const

const STATUS_OPTIONS = [
  { label: 'Upcoming', value: 'Pending' },
  { label: 'Confirmed', value: 'Confirmed' },
  { label: 'Seated', value: 'Seated' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Cancelled', value: 'Cancelled' }
] as const

const GENERAL_TABLE_OPTIONS = [{ label: 'Unassigned', value: 'unassigned' }]

const MAIN_DINING_TABLES = Array.from({ length: 10 }, (_, index) => ({
  label: `Table ${index + 1}`,
  value: `Table ${index + 1}`
}))

const PRIVATE_ROOM_TABLES = Array.from({ length: 4 }, (_, index) => ({
  label: `Table ${index + 11}`,
  value: `Table ${index + 11}`
}))

const OUTDOOR_TABLES = Array.from({ length: 4 }, (_, index) => ({
  label: `Table ${index + 15}`,
  value: `Table ${index + 15}`
}))

const reservationFormSchema = z.object({
  guestName: z.string().trim().min(1, 'Guest name is required.'),
  phone: z.string().trim().min(1, 'Phone is required.'),
  date: z.string().min(1, 'Choose a reservation date.'),
  time: z.string().min(1, 'Choose a reservation time.'),
  guestCount: z
    .string()
    .regex(/^\d+$/, 'Enter a valid party size.')
    .refine(value => Number(value) >= 1, 'Party size must be at least 1.')
    .refine(value => Number(value) <= 24, 'Party size cannot exceed 24.'),
  table: z.string(),
  durationMinutes: z.enum(['60', '90', '120', '150', '180']),
  status: z.enum(['Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled']),
  notes: z.string()
})

type ReservationFormValues = z.infer<typeof reservationFormSchema>

const EMPTY_FORM: ReservationFormValues = {
  guestName: '',
  phone: '',
  date: '',
  time: '',
  guestCount: '2',
  table: 'unassigned',
  durationMinutes: '90',
  status: 'Pending',
  notes: ''
}

type ReservationFormSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservation: Reservation | null
  defaultDate?: string
  onCreate: (input: NewReservationInput) => void
  onUpdate: (reservationId: string, input: NewReservationInput) => void
}

function reservationToFormValues(reservation: Reservation | null, defaultDate = ''): ReservationFormValues {
  if (!reservation) return { ...EMPTY_FORM, date: defaultDate }

  const durationMinutes = String(reservation.durationMinutes)
  const durationOption = DURATION_OPTIONS.find(option => option.value === durationMinutes)

  const rawStatus = reservation.status

  const status = STATUS_OPTIONS.some(opt => opt.value === rawStatus)
    ? (rawStatus as ReservationFormValues['status'])
    : 'Pending'

  return {
    guestName: reservation.guestName,
    phone: reservation.phone,
    date: reservation.date,
    time: reservation.time,
    guestCount: String(reservation.guestCount),
    table: reservation.table ?? 'unassigned',
    durationMinutes: durationOption?.value ?? '90',
    status,
    notes: reservation.notes ?? ''
  }
}

function dateFromValue(value: string) {
  if (!value) return undefined
  const date = parseISO(value)

  return isValid(date) ? date : undefined
}

export function ReservationFormSheet({
  open,
  onOpenChange,
  reservation,
  defaultDate,
  onCreate,
  onUpdate
}: ReservationFormSheetProps) {
  const [datePopoverOpen, setDatePopoverOpen] = useState(false)
  const isEditing = reservation !== null

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: reservationToFormValues(reservation, defaultDate)
  })

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      form.reset(reservationToFormValues(reservation, defaultDate))
      setDatePopoverOpen(false)
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = (values: ReservationFormValues) => {
    const input: NewReservationInput = {
      guestName: values.guestName.trim(),
      phone: values.phone.trim(),
      email: reservation?.email,
      date: values.date,
      time: values.time,
      guestCount: Number(values.guestCount),
      table: values.table === 'unassigned' ? null : values.table,
      durationMinutes: Number(values.durationMinutes),
      status: values.status,
      notes: values.notes.trim() || undefined
    }

    if (reservation) {
      onUpdate(reservation.id, input)
    } else {
      onCreate(input)
    }

    handleOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side='right' className='flex flex-col sm:max-w-md'>
        <SheetHeader>
          <SheetTitle>{isEditing ? 'Edit reservation' : 'New reservation'}</SheetTitle>
          <SheetDescription>
            {isEditing ? 'Update the guest and booking details.' : 'Add guest details and reservation information.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-y-auto'>
          <Form {...form}>
            <form id='reservation-form' onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 px-4 py-2'>
              {/* Guest */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='guestName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest name</FormLabel>
                      <FormControl>
                        <Input placeholder='e.g. Johnson Family' autoComplete='name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type='tel' placeholder='+1 (555) 123-4567' autoComplete='tel' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Date & Time */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => {
                    const selectedDate = dateFromValue(field.value)

                    return (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Date</FormLabel>
                        <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
                          <FormControl>
                            <PopoverTrigger
                              render={
                                <Button type='button' variant='outline' className='w-full justify-between'>
                                  {selectedDate ? format(selectedDate, 'PPP') : 'Select a date'}
                                  <ChevronDownIcon className='size-4 opacity-50' />
                                </Button>
                              }
                            />
                          </FormControl>
                          <PopoverContent density='calendar' align='start'>
                            <Calendar
                              selected={selectedDate}
                              defaultMonth={selectedDate}
                              onSelect={date => {
                                field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                                setDatePopoverOpen(false)
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name='time'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type='time' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Party & Table */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='guestCount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Party size</FormLabel>
                      <FormControl>
                        <Input type='number' min={1} max={24} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='table'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Table</FormLabel>
                      <Select value={field.value} onValueChange={value => field.onChange(value ?? 'unassigned')}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a table' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>General</SelectLabel>
                            {GENERAL_TABLE_OPTIONS.map(item => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Main Dining</SelectLabel>
                            {MAIN_DINING_TABLES.map(item => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Private Room</SelectLabel>
                            {PRIVATE_ROOM_TABLES.map(item => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Outdoor</SelectLabel>
                            {OUTDOOR_TABLES.map(item => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Duration */}
              <FormField
                control={form.control}
                name='durationMinutes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        multiple={false}
                        value={[field.value]}
                        onValueChange={value => {
                          if (value[0]) field.onChange(value[0])
                        }}
                        variant='outline'
                        className='grid w-full grid-cols-3 sm:grid-cols-5'
                      >
                        {DURATION_OPTIONS.map(option => (
                          <ToggleGroupItem key={option.value} value={option.value}>
                            {option.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Status – standard shadcn radio pattern */}
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className='grid grid-cols-2'>
                        {STATUS_OPTIONS.map(option => (
                          <FormItem key={option.value} className='mr-3 mb-3 flex-row items-center'>
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel>{option.label}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Notes */}
              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Special requests, dietary requirements…'
                        className='resize-none'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <SheetFooter className='gap-2 sm:flex-row sm:justify-end'>
          <SheetClose render={<Button type='button' variant='outline' />}>Cancel</SheetClose>
          <Button type='submit' form='reservation-form'>
            {isEditing ? 'Save changes' : 'Create reservation'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
