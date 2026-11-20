import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type InventoryPaginationProps = {
  total: number
  rowsPerPage: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function InventoryPagination({
  total,
  rowsPerPage,
  currentPage,
  totalPages,
  onPageChange
}: InventoryPaginationProps) {
  const showingFrom = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const showingTo = Math.min(currentPage * rowsPerPage, total)
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <p className='text-body-small-regular text-muted-foreground'>
        Showing {showingFrom}–{showingTo} of {total} entries
      </p>

      {totalPages > 1 && (
        <nav aria-label='Inventory pagination'>
          <ul className='flex items-center gap-1'>
            <li>
              <Button
                type='button'
                variant='outline'
                size='icon'
                aria-label='Previous page'
                disabled={currentPage <= 1}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              >
                <ChevronLeftIcon className='size-4' aria-hidden='true' />
              </Button>
            </li>
            {pages.map(page => (
              <li key={page}>
                <Button
                  type='button'
                  variant={page === currentPage ? 'default' : 'outline'}
                  size='icon'
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              </li>
            ))}
            <li>
              <Button
                type='button'
                variant='outline'
                size='icon'
                aria-label='Next page'
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              >
                <ChevronRightIcon className='size-4' aria-hidden='true' />
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}
