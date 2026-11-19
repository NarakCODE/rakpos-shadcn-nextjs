'use client'

import type { MouseEvent } from 'react'

import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePagination } from '@/hooks/use-pagination'

const PAGE_SIZE_OPTIONS = [10, 25, 50]
const PAGE_SIZE_ITEMS = PAGE_SIZE_OPTIONS.map(size => ({ label: String(size), value: String(size) }))

type ReservationsPaginationProps = {
  rowsPerPage: number
  onRowsPerPageChange: (rowsPerPage: number) => void
  total: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ReservationsPagination({
  rowsPerPage,
  onRowsPerPageChange,
  total,
  currentPage,
  totalPages,
  onPageChange
}: ReservationsPaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages: Math.max(1, totalPages),
    paginationItemsToDisplay: 3
  })

  const showingFrom = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const showingTo = Math.min(currentPage * rowsPerPage, total)

  const handlePageClick = (page: number, event: MouseEvent) => {
    event.preventDefault()
    onPageChange(page)
  }

  return (
    <div className='flex w-full flex-col items-center justify-between gap-3 sm:flex-row'>
      <div className='text-muted-foreground flex flex-wrap items-center justify-center gap-3 text-sm sm:justify-start'>
        <span aria-live='polite'>
          Showing {showingFrom}-{showingTo} of {total}
        </span>
        <div className='flex items-center gap-2'>
          <Label htmlFor='reservations-per-page'>Rows</Label>
          <Select
            items={PAGE_SIZE_ITEMS}
            value={String(rowsPerPage)}
            onValueChange={(value: string | null) => {
              if (value) onRowsPerPageChange(Number(value))
            }}
          >
            <SelectTrigger id='reservations-per-page' className='w-fit'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {PAGE_SIZE_OPTIONS.map(size => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>
      </div>

      <Pagination className='mx-0 w-auto justify-end'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={event => {
                event.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              aria-disabled={currentPage <= 1}
            />
          </PaginationItem>

          {showLeftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pages.map(page => (
            <PaginationItem key={page}>
              <PaginationLink href='#' isActive={page === currentPage} onClick={event => handlePageClick(page, event)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {showRightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={event => {
                event.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              aria-disabled={currentPage >= totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
