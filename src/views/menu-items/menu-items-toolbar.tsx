'use client'

import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  MENU_CATEGORIES,
  type DietaryType,
  type MenuCategoryName,
  type MenuItemColumn,
  type MenuItemColumnVisibility,
  type MenuItemStatus
} from '@/types/menu-item-types'

export type MenuItemCategoryFilter = MenuCategoryName | 'all'
export type MenuItemTypeFilter = DietaryType | 'all'
export type MenuItemStatusFilter = MenuItemStatus | 'all'

const PAGE_SIZE_OPTIONS = [10, 25, 50]
const PAGE_SIZE_ITEMS = PAGE_SIZE_OPTIONS.map(size => ({ label: String(size), value: String(size) }))

const CATEGORY_ITEMS = [
  { label: 'All categories', value: 'all' },
  ...MENU_CATEGORIES.map(category => ({ label: category, value: category }))
]

const TYPE_ITEMS = [
  { label: 'All types', value: 'all' },
  { label: 'Veg', value: 'Veg' },
  { label: 'Non-Veg', value: 'Non-Veg' },
  { label: 'Egg', value: 'Egg' }
]

const STATUS_ITEMS = [
  { label: 'All status', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' }
]

const COLUMN_ITEMS: { id: MenuItemColumn; label: string }[] = [
  { id: 'category', label: 'Category' },
  { id: 'price', label: 'Price' },
  { id: 'type', label: 'Type' },
  { id: 'addons', label: 'Addons' },
  { id: 'status', label: 'Status' }
]

type MenuItemsToolbarProps = {
  search: string
  onSearchChange: (search: string) => void
  categoryFilter: MenuItemCategoryFilter
  onCategoryFilterChange: (category: MenuItemCategoryFilter) => void
  typeFilter: MenuItemTypeFilter
  onTypeFilterChange: (type: MenuItemTypeFilter) => void
  statusFilter: MenuItemStatusFilter
  onStatusFilterChange: (status: MenuItemStatusFilter) => void
  rowsPerPage: number
  onRowsPerPageChange: (rowsPerPage: number) => void
  columnVisibility: MenuItemColumnVisibility
  onColumnVisibilityToggle: (column: MenuItemColumn, visible: boolean) => void
}

export function MenuItemsToolbar({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  rowsPerPage,
  onRowsPerPageChange,
  columnVisibility,
  onColumnVisibilityToggle
}: MenuItemsToolbarProps) {
  return (
    <div className='flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between'>
      <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
        <div className='flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground'>
          <Label htmlFor='menu-items-page-size'>Show</Label>
          <Select
            items={PAGE_SIZE_ITEMS}
            value={String(rowsPerPage)}
            onValueChange={value => {
              if (value) onRowsPerPageChange(Number(value))
            }}
          >
            <SelectTrigger id='menu-items-page-size' className='w-20' aria-label='Items per page'>
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

        <div className='w-full sm:w-60'>
          <Label htmlFor='menu-items-search' className='sr-only'>
            Search items
          </Label>
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon className='size-4' aria-hidden='true' />
            </InputGroupAddon>
            <InputGroupInput
              id='menu-items-search'
              type='search'
              value={search}
              onChange={event => onSearchChange(event.target.value)}
              placeholder='Search items…'
            />
          </InputGroup>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <div>
          <Label htmlFor='menu-items-category-filter' className='sr-only'>
            Filter by category
          </Label>
          <Select
            items={CATEGORY_ITEMS}
            value={categoryFilter}
            onValueChange={value => onCategoryFilterChange((value as MenuItemCategoryFilter | null) ?? 'all')}
          >
            <SelectTrigger id='menu-items-category-filter' className='w-40' aria-label='Filter by category'>
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

        <div>
          <Label htmlFor='menu-items-type-filter' className='sr-only'>
            Filter by dietary type
          </Label>
          <Select
            items={TYPE_ITEMS}
            value={typeFilter}
            onValueChange={value => onTypeFilterChange((value as MenuItemTypeFilter | null) ?? 'all')}
          >
            <SelectTrigger id='menu-items-type-filter' className='w-36' aria-label='Filter by dietary type'>
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

        <div>
          <Label htmlFor='menu-items-status-filter' className='sr-only'>
            Filter by item status
          </Label>
          <Select
            items={STATUS_ITEMS}
            value={statusFilter}
            onValueChange={value => onStatusFilterChange((value as MenuItemStatusFilter | null) ?? 'all')}
          >
            <SelectTrigger id='menu-items-status-filter' className='w-32' aria-label='Filter by status'>
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

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant='outline'>
                <SlidersHorizontalIcon aria-hidden='true' />
                <span>View</span>
              </Button>
            }
          />
          <DropdownMenuContent align='end' className='w-44'>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Show columns</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {COLUMN_ITEMS.map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={columnVisibility[column.id]}
                  onCheckedChange={checked => onColumnVisibilityToggle(column.id, !!checked)}
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
