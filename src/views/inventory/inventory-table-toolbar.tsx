'use client'

import { DownloadIcon, PlusIcon, RefreshCwIcon, SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  INVENTORY_CATEGORIES,
  INVENTORY_STATUSES,
  type InventoryCategory,
  type InventoryStatus
} from '@/types/inventory-types'

export type InventoryStatusFilter = 'all' | InventoryStatus
export type InventoryCategoryFilter = 'all' | InventoryCategory

const PAGE_SIZE_OPTIONS = [10, 25, 50]
const PAGE_SIZE_ITEMS = PAGE_SIZE_OPTIONS.map(size => ({ label: String(size), value: String(size) }))

const STATUS_ITEMS = [
  { label: 'All statuses', value: 'all' },
  ...INVENTORY_STATUSES.map(status => ({ label: status, value: status }))
]

const CATEGORY_ITEMS = [
  { label: 'All Categories', value: 'all' },
  ...INVENTORY_CATEGORIES.map(category => ({ label: category, value: category }))
]

type InventoryTableToolbarProps = {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: InventoryStatusFilter
  onStatusFilterChange: (value: InventoryStatusFilter) => void
  categoryFilter: InventoryCategoryFilter
  onCategoryFilterChange: (value: InventoryCategoryFilter) => void
  rowsPerPage: number
  onRowsPerPageChange: (value: number) => void
  onExport: () => void
  onSync: () => void
  onAddItem: () => void
  isSyncing?: boolean
}

export function InventoryTableToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  rowsPerPage,
  onRowsPerPageChange,
  onExport,
  onSync,
  onAddItem,
  isSyncing = false
}: InventoryTableToolbarProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between'>
        {/* Left side: Show entries & Search */}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground'>
            <Label htmlFor='inventory-page-size'>Show</Label>
            <Select
              items={PAGE_SIZE_ITEMS}
              value={String(rowsPerPage)}
              onValueChange={value => {
                if (value) onRowsPerPageChange(Number(value))
              }}
            >
              <SelectTrigger id='inventory-page-size' className='w-20' aria-label='Items per page'>
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
            <span>entries</span>
          </div>

          <div className='relative w-full sm:w-72'>
            <Label htmlFor='inventory-search' className='sr-only'>
              Search ingredients
            </Label>
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon className='size-4 text-muted-foreground' aria-hidden='true' />
              </InputGroupAddon>
              <InputGroupInput
                id='inventory-search'
                type='search'
                value={search}
                onChange={e => onSearchChange(e.target.value)}
                placeholder='Search ingredients...'
              />
              {search && (
                <button
                  type='button'
                  onClick={() => onSearchChange('')}
                  className='absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  aria-label='Clear search'
                >
                  <XIcon className='size-3.5' />
                </button>
              )}
            </InputGroup>
          </div>
        </div>

        {/* Right side: Filters & Actions */}
        <div className='flex flex-wrap items-center gap-2'>
          {/* Status Filter */}
          <div>
            <Label htmlFor='inventory-status-filter' className='sr-only'>
              Filter by status
            </Label>
            <Select
              items={STATUS_ITEMS}
              value={statusFilter}
              onValueChange={value => onStatusFilterChange((value as InventoryStatusFilter | null) ?? 'all')}
            >
              <SelectTrigger id='inventory-status-filter' className='w-36' aria-label='Filter by status'>
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

          {/* Category Filter */}
          <div>
            <Label htmlFor='inventory-category-filter' className='sr-only'>
              Filter by category
            </Label>
            <Select
              items={CATEGORY_ITEMS}
              value={categoryFilter}
              onValueChange={value => onCategoryFilterChange((value as InventoryCategoryFilter | null) ?? 'all')}
            >
              <SelectTrigger id='inventory-category-filter' className='w-40' aria-label='Filter by category'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORY_ITEMS.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Export Button */}
          <Button type='button' variant='outline' onClick={onExport}>
            <DownloadIcon aria-hidden='true' />
            <span>Export</span>
          </Button>

          {/* Sync Button */}
          <Button
            type='button'
            variant='outline'
            onClick={onSync}
            disabled={isSyncing}
            aria-label='Sync inventory'
          >
            <RefreshCwIcon className={isSyncing ? 'animate-spin' : undefined} aria-hidden='true' />
            <span>Sync</span>
          </Button>

          {/* + Add Item Button */}
          <Button type='button' variant='default' onClick={onAddItem}>
            <PlusIcon aria-hidden='true' />
            <span>Add Item</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
