'use client'

import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const STATUS_ITEMS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Preparing', value: 'Preparing' },
  { label: 'New', value: 'New' },
  { label: 'Ready', value: 'Ready' },
  { label: 'Served', value: 'Served' },
  { label: 'Cancelled', value: 'Cancelled' }
]

const TYPE_ITEMS = [
  { label: 'All types', value: 'all' },
  { label: 'Dine-In', value: 'Dine-In' },
  { label: 'Takeaway', value: 'Takeaway' },
  { label: 'Delivery', value: 'Delivery' }
]

export type ColumnToggle = {
  id: string
  label: string
}

export const ORDER_COLUMNS: ColumnToggle[] = [
  { id: 'orderNumber', label: 'Order ID' },
  { id: 'type', label: 'Type' },
  { id: 'status', label: 'Status' },
  { id: 'forDestination', label: 'For' },
  { id: 'itemCount', label: 'Items' },
  { id: 'total', label: 'Total' },
  { id: 'placedAt', label: 'Placed At' }
]

export type OrdersTableToolbarProps = {
  search: string
  onSearchChange: (search: string) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  typeFilter: string
  onTypeFilterChange: (type: string) => void
  columnVisibility: Record<string, boolean>
  onColumnVisibilityToggle: (columnId: string, visible: boolean) => void
  rowsPerPage?: number
  onRowsPerPageChange?: (rowsPerPage: number) => void
}

export function OrdersTableToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  columnVisibility,
  onColumnVisibilityToggle
}: OrdersTableToolbarProps) {
  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
      {/* Search bar */}
      <div className='w-full sm:w-72'>
        <Label htmlFor='orders-search' className='sr-only'>
          Search orders
        </Label>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon className='size-4' aria-hidden='true' />
          </InputGroupAddon>
          <InputGroupInput
            id='orders-search'
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder='Search orders…'
            type='text'
          />
        </InputGroup>
      </div>

      {/* Filters & Actions */}
      <div className='flex flex-wrap items-center gap-2.5 sm:gap-3'>

        {/* Status filter */}
        <div>
          <Label htmlFor='orders-status-filter' className='sr-only'>
            Status filter
          </Label>
          <Select
            items={STATUS_ITEMS}
            value={statusFilter}
            onValueChange={(val: string | null) => onStatusFilterChange(val ?? 'all')}
          >
            <SelectTrigger id='orders-status-filter'>
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

        {/* Type filter */}
        <div>
          <Label htmlFor='orders-type-filter' className='sr-only'>
            Type filter
          </Label>
          <Select
            items={TYPE_ITEMS}
            value={typeFilter}
            onValueChange={(val: string | null) => onTypeFilterChange(val ?? 'all')}
          >
            <SelectTrigger id='orders-type-filter'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {TYPE_ITEMS.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* View settings button */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant='outline'>
                <SlidersHorizontalIcon aria-hidden='true' />
                <span>View</span>
              </Button>
            }
          />
          <DropdownMenuContent align='end'>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {ORDER_COLUMNS.map(col => {
                const isVisible = columnVisibility[col.id] !== false

                return (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={isVisible}
                    onCheckedChange={checked => onColumnVisibilityToggle(col.id, !!checked)}
                  >
                    {col.label}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
