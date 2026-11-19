'use client'

import { useMemo, useState } from 'react'

import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Button } from '@/components/ui/button'
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel } from '@/components/ui/frame'
import { mockReservations } from '@/fake-db/reservations'
import type { NewReservationInput, Reservation } from '@/types/reservations-types'
import { ReservationDetailsSheet } from './reservation-details-sheet'
import { ReservationFormSheet } from './reservation-form-sheet'
import { ReservationsPagination } from './reservations-pagination'
import { ReservationsTable } from './reservations-table'
import { ReservationsTableToolbar, type ReservationStatusFilter } from './reservations-table-toolbar'
import { getTodayDateValue, type ReservationDateRange } from './reservation-utils'

export default function ReservationsView() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations)
  const [search, setSearch] = useState('')
  const [dateRange, setDateRange] = useState<ReservationDateRange>('all')
  const [selectedDate, setSelectedDate] = useState('')
  const [statusFilter, setStatusFilter] = useState<ReservationStatusFilter>('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<Reservation | null>(null)

  const filteredReservations = useMemo(() => {
    const query = search.trim().toLowerCase()
    const today = dateRange === 'all' ? '' : getTodayDateValue()

    return reservations.filter(reservation => {
      if (query) {
        const searchableValues = [
          reservation.guestName,
          reservation.phone,
          reservation.reservationNumber,
          reservation.table ?? ''
        ]

        const matchesSearch = searchableValues.some(value => value.toLowerCase().includes(query))

        if (!matchesSearch) return false
      }

      if (dateRange === 'today' && reservation.date !== today) return false
      if (dateRange === 'upcoming' && reservation.date < today) return false
      if (dateRange === 'past' && reservation.date >= today) return false
      if (selectedDate && reservation.date !== selectedDate) return false
      if (statusFilter !== 'all' && reservation.status !== statusFilter) return false

      return true
    })
  }, [dateRange, reservations, search, selectedDate, statusFilter])

  const totalCount = filteredReservations.length
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedReservations = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * rowsPerPage

    return filteredReservations.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredReservations, rowsPerPage, safeCurrentPage])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleDateRangeChange = (value: ReservationDateRange) => {
    setDateRange(value)
    setSelectedDate('')
    setCurrentPage(1)
  }

  const handleDateChange = (value: string) => {
    setSelectedDate(value)
    setDateRange('all')
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (value: ReservationStatusFilter) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handleRowsPerPageChange = (size: number) => {
    setRowsPerPage(size)
    setCurrentPage(1)
  }

  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setIsDetailsOpen(true)
  }

  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation(reservation)
    setIsDetailsOpen(false)
    setIsFormOpen(true)
  }

  const handleCreateReservation = (input: NewReservationInput) => {
    const timestamp = Date.now()

    const newReservation: Reservation = {
      ...input,
      id: 'reservation-' + timestamp,
      reservationNumber: 'RS-' + String(timestamp).slice(-6)
    }

    setReservations(previous => [newReservation, ...previous])
    setSearch('')
    setDateRange('all')
    setSelectedDate('')
    setStatusFilter('all')
    setCurrentPage(1)
    setIsFormOpen(false)
    toast.success('Reservation created')
  }

  const handleUpdateReservation = (reservationId: string, input: NewReservationInput) => {
    setReservations(previous =>
      previous.map(reservation => (reservation.id === reservationId ? { ...reservation, ...input } : reservation))
    )
    setSelectedReservation(previous => (previous?.id === reservationId ? { ...previous, ...input } : previous))
    setEditingReservation(null)
    setIsFormOpen(false)
    toast.success('Reservation updated')
  }

  const handleDeleteReservation = (reservation: Reservation) => {
    setReservations(previous => previous.filter(item => item.id !== reservation.id))

    if (selectedReservation?.id === reservation.id) {
      setSelectedReservation(null)
      setIsDetailsOpen(false)
    }

    setPendingDelete(null)
    toast.success('Reservation deleted')
  }

  const openCreateDialog = () => {
    setEditingReservation(null)
    setIsFormOpen(true)
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Reservations</h1>
          <FrameDescription>Manage upcoming and completed guest reservations</FrameDescription>
        </div>
        <Button onClick={openCreateDialog}>
          <PlusIcon aria-hidden='true' />
          <span>New reservation</span>
        </Button>
      </div>

      <Frame className='w-full'>
        <FrameHeader>
          <ReservationsTableToolbar
            search={search}
            onSearchChange={handleSearchChange}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
          />
        </FrameHeader>

        <FramePanel className='p-0'>
          <ReservationsTable
            reservations={paginatedReservations}
            onViewReservation={handleViewReservation}
            onEditReservation={handleEditReservation}
            onDeleteReservation={setPendingDelete}
          />
        </FramePanel>

        <FrameFooter>
          <ReservationsPagination
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            total={totalCount}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </FrameFooter>
      </Frame>

      <ReservationDetailsSheet
        reservation={selectedReservation}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onEditReservation={handleEditReservation}
      />

      <ReservationFormSheet
        key={editingReservation?.id ?? 'new'}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        reservation={editingReservation}
        onCreate={handleCreateReservation}
        onUpdate={handleUpdateReservation}
      />

      <ConfirmDialog
        title='Delete reservation?'
        description={
          'This will permanently remove the reservation for ' + (pendingDelete?.guestName ?? 'this guest') + '.'
        }
        cancelLabel='Keep reservation'
        confirmLabel='Delete reservation'
        confirmVariant='destructive'
        open={Boolean(pendingDelete)}
        onOpenChange={open => {
          if (!open) setPendingDelete(null)
        }}
        onConfirm={() => {
          if (pendingDelete) handleDeleteReservation(pendingDelete)
        }}
      />
    </div>
  )
}
