'use client'

import { useMemo, useState } from 'react'

import { PlusIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
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
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel } from '@/components/ui/frame'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockCoupons } from '@/fake-db/coupons'
import type { Coupon, CouponColumn, CouponFormValues, CouponStatus } from '@/types/coupon-types'
import { CouponFormSheet } from './coupon-form-sheet'

type CouponStatusFilter = 'all' | CouponStatus
type CouponColumnVisibility = Record<CouponColumn, boolean>

const PAGE_SIZE_OPTIONS = [10, 25, 50]
const PAGE_SIZE_ITEMS = PAGE_SIZE_OPTIONS.map(size => ({ label: String(size), value: String(size) }))

const STATUS_ITEMS = [
  { label: 'All status', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' }
]

const COLUMN_ITEMS: { id: CouponColumn; label: string }[] = [
  { id: 'code', label: 'Code' },
  { id: 'description', label: 'Description' },
  { id: 'type', label: 'Type' },
  { id: 'value', label: 'Value' },
  { id: 'minOrder', label: 'Min. Order' },
  { id: 'expires', label: 'Expires' },
  { id: 'used', label: 'Used' },
  { id: 'status', label: 'Status' }
]

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

const INITIAL_COLUMN_VISIBILITY: CouponColumnVisibility = {
  code: true,
  description: true,
  type: true,
  value: true,
  minOrder: true,
  expires: true,
  used: true,
  status: true
}

function formatCouponValue(coupon: Coupon) {
  return coupon.type === 'Percentage (%)' ? `${coupon.value}%` : currencyFormatter.format(coupon.value)
}

function formatUsedCount(coupon: Coupon) {
  return coupon.usageLimit ? `${coupon.used}/${coupon.usageLimit}` : String(coupon.used)
}

export default function CouponsView() {
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<CouponStatusFilter>('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [columnVisibility, setColumnVisibility] = useState<CouponColumnVisibility>(INITIAL_COLUMN_VISIBILITY)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredCoupons = useMemo(() => {
    const query = search.trim().toLowerCase()

    return coupons.filter(coupon => {
      const matchesSearch =
        !query ||
        coupon.code.toLowerCase().includes(query) ||
        coupon.description.toLowerCase().includes(query) ||
        coupon.type.toLowerCase().includes(query)

      const matchesStatus = statusFilter === 'all' || coupon.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [coupons, search, statusFilter])

  const visibleCoupons = filteredCoupons.slice(0, rowsPerPage)
  const visibleColumnCount = Object.values(columnVisibility).filter(Boolean).length
  const showingFrom = filteredCoupons.length === 0 ? 0 : 1
  const showingTo = Math.min(rowsPerPage, filteredCoupons.length)

  const handleAddCoupon = (values: CouponFormValues) => {
    const newCoupon: Coupon = {
      ...values,
      id: crypto.randomUUID(),
      used: 0,
      status: 'Active'
    }

    setCoupons(current => [newCoupon, ...current])
    setSearch('')
    setStatusFilter('all')
    toast.success('Coupon added')
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Coupons</h1>
          <FrameDescription>Manage discount coupons for your POS</FrameDescription>
        </div>
        <Button type='button' variant='default' onClick={() => setIsCreateOpen(true)}>
          <PlusIcon aria-hidden='true' />
          <span>Add Coupon</span>
        </Button>
      </div>

      <Frame className='w-full'>
        <FrameHeader>
          <div className='grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[auto_minmax(14rem,1fr)_10rem_auto] xl:items-center'>
            <div className='flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground'>
              <Label htmlFor='coupons-page-size'>Show</Label>
              <Select
                items={PAGE_SIZE_ITEMS}
                value={String(rowsPerPage)}
                onValueChange={value => {
                  if (value) setRowsPerPage(Number(value))
                }}
              >
                <SelectTrigger id='coupons-page-size' className='w-20' aria-label='Items per page'>
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

            <div>
              <Label htmlFor='coupons-search' className='sr-only'>
                Search coupons
              </Label>
              <InputGroup>
                <InputGroupAddon>
                  <SearchIcon aria-hidden='true' />
                </InputGroupAddon>
                <InputGroupInput
                  id='coupons-search'
                  type='search'
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                  placeholder='Search by code, title…'
                />
              </InputGroup>
            </div>

            <div>
              <Label htmlFor='coupons-status-filter' className='sr-only'>
                Filter by status
              </Label>
              <Select
                items={STATUS_ITEMS}
                value={statusFilter}
                onValueChange={value => setStatusFilter((value as CouponStatusFilter | null) ?? 'all')}
              >
                <SelectTrigger id='coupons-status-filter' className='w-full' aria-label='Filter by status'>
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

            <div className='flex items-center justify-end'>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant='outline' aria-label='Customize columns'>
                      <SlidersHorizontalIcon aria-hidden='true' />
                      <span>Columns</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align='end' className='w-48'>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {COLUMN_ITEMS.map(column => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={columnVisibility[column.id]}
                        onCheckedChange={checked =>
                          setColumnVisibility(current => ({
                            ...current,
                            [column.id]: checked
                          }))
                        }
                      >
                        {column.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </FrameHeader>

        <FramePanel className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader variant='muted'>
                <TableRow>
                  {columnVisibility.code && <TableHead>Code</TableHead>}
                  {columnVisibility.description && <TableHead>Description</TableHead>}
                  {columnVisibility.type && <TableHead>Type</TableHead>}
                  {columnVisibility.value && <TableHead>Value</TableHead>}
                  {columnVisibility.minOrder && <TableHead>Min. Order</TableHead>}
                  {columnVisibility.expires && <TableHead>Expires</TableHead>}
                  {columnVisibility.used && <TableHead>Used</TableHead>}
                  {columnVisibility.status && <TableHead>Status</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleCoupons.length > 0 ? (
                  visibleCoupons.map(coupon => (
                    <TableRow key={coupon.id}>
                      {columnVisibility.code && (
                        <TableCell>
                          <span className='font-mono font-semibold'>{coupon.code}</span>
                        </TableCell>
                      )}
                      {columnVisibility.description && (
                        <TableCell>
                          <span className='text-muted-foreground'>{coupon.description}</span>
                        </TableCell>
                      )}
                      {columnVisibility.type && (
                        <TableCell>
                          <span>{coupon.type}</span>
                        </TableCell>
                      )}
                      {columnVisibility.value && (
                        <TableCell>
                          <span className='font-medium'>{formatCouponValue(coupon)}</span>
                        </TableCell>
                      )}
                      {columnVisibility.minOrder && (
                        <TableCell>
                          <span>{currencyFormatter.format(coupon.minOrder)}</span>
                        </TableCell>
                      )}
                      {columnVisibility.expires && (
                        <TableCell>
                          <span className='text-muted-foreground'>{coupon.expires}</span>
                        </TableCell>
                      )}
                      {columnVisibility.used && (
                        <TableCell>
                          <span className='font-mono'>{formatUsedCount(coupon)}</span>
                        </TableCell>
                      )}
                      {columnVisibility.status && (
                        <TableCell>
                          <Badge variant={coupon.status === 'Active' ? 'success' : 'outline'}>
                            {coupon.status}
                          </Badge>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={visibleColumnCount} className='h-32 text-center'>
                      <span className='text-muted-foreground'>No coupons found.</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </FramePanel>

        <FrameFooter>
          <p className='text-sm text-muted-foreground'>
            Showing {showingFrom} to {showingTo} of {filteredCoupons.length} entries
          </p>
        </FrameFooter>
      </Frame>

      <CouponFormSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} onSave={handleAddCoupon} />
    </div>
  )
}
