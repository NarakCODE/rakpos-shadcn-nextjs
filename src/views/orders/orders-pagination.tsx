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

const ENTRIES_OPTIONS = [10, 25, 50]

const ENTRIES_ITEMS = ENTRIES_OPTIONS.map(option => ({
  label: String(option),
  value: String(option)
}))

export type OrdersPaginationProps = {
  rowsPerPage: number
  onRowsPerPageChange: (rowsPerPage: number) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  total?: number
  showingFrom?: number
  showingTo?: number
}

export function OrdersPagination({
  rowsPerPage,
  onRowsPerPageChange,
  currentPage,
  totalPages,
  onPageChange
}: OrdersPaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages: Math.max(1, totalPages),
    paginationItemsToDisplay: 3
  })

  const handlePageClick = (page: number, e: MouseEvent) => {
    e.preventDefault()
    onPageChange(page)
  }

  const handlePreviousClick = (e: MouseEvent) => {
    e.preventDefault()

    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextClick = (e: MouseEvent) => {
    e.preventDefault()

    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-between gap-3 sm:flex-row'>
      {/* Left: Entries selector */}
      <div className='text-body-small-regular text-muted-foreground flex items-center gap-2'>
        <Label htmlFor='orders-per-page'>Show</Label>
        <Select
          items={ENTRIES_ITEMS}
          value={String(rowsPerPage)}
          onValueChange={(val: string | null) => {
            if (val) onRowsPerPageChange(Number(val))
          }}
        >
          <SelectTrigger id='orders-per-page'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {ENTRIES_OPTIONS.map(option => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <span>entries</span>
      </div>

      {/* Right: Shadcn Pagination Component Tree */}
      <Pagination className='mx-0 w-auto justify-end'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href='#' onClick={handlePreviousClick} aria-disabled={currentPage <= 1} />
          </PaginationItem>

          {showLeftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pages.map(page => {
            const isActive = page === currentPage

            return (
              <PaginationItem key={page}>
                <PaginationLink href='#' isActive={isActive} onClick={e => handlePageClick(page, e)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {showRightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext href='#' onClick={handleNextClick} aria-disabled={currentPage >= totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
