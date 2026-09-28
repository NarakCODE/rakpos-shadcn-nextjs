'use client'

import { useEffect, useMemo, useState } from 'react'

import {
  ArrowRightIcon,
  BikeIcon,
  CheckIcon,
  ChefHatIcon,
  Clock3Icon,
  ClipboardListIcon,
  MapPinIcon,
  MessageSquareTextIcon,
  SearchIcon,
  ShoppingBagIcon,
  UtensilsIcon,
  XIcon
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockOrders } from '@/fake-db/orders'
import type { OrderFulfillmentType, OrderStatus, RestaurantOrder } from '@/types/orders-types'

type KitchenStatus = Extract<OrderStatus, 'New' | 'Preparing' | 'Ready'>
type OrderTypeFilter = 'all' | 'dine-in' | 'takeaway' | 'delivery'
type KitchenTicket = RestaurantOrder & { waitMinutes: number }

const INITIAL_WAIT_MINUTES = [8, 4, 16, 3, 6, 12, 21, 7, 11, 15, 2, 9, 20, 5, 13, 10, 24, 6, 1, 18, 14, 5, 22, 2, 17]

const ORDER_TYPE_FILTERS: { label: string; value: OrderTypeFilter }[] = [
  { label: 'All order types', value: 'all' },
  { label: 'Dine-in', value: 'dine-in' },
  { label: 'Takeaway', value: 'takeaway' },
  { label: 'Delivery', value: 'delivery' }
]

const COLUMNS: { status: KitchenStatus; description: string; color: string }[] = [
  { status: 'New', description: 'Waiting to start', color: 'bg-sky-500' },
  { status: 'Preparing', description: 'On the line', color: 'bg-amber-500' },
  { status: 'Ready', description: 'Ready for handoff', color: 'bg-emerald-500' }
]

function getOrderTypeDetails(type: OrderFulfillmentType) {
  switch (type) {
    case 'Dine-in':
    case 'Dine-In':
      return { label: 'Dine-in', Icon: UtensilsIcon }
    case 'Takeaway':
      return { label: 'Takeaway', Icon: ShoppingBagIcon }
    case 'Delivery':
      return { label: 'Delivery', Icon: BikeIcon }
  }
}

function formatWaitTime(minutes: number) {
  if (minutes < 60) return `${minutes}m`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return remainingMinutes === 0 ? `${hours}h` : `${hours}h ${remainingMinutes}m`
}

function KitchenTicketCard({ order, onAdvance }: { order: KitchenTicket; onAdvance: (order: KitchenTicket) => void }) {
  const { label, Icon } = getOrderTypeDetails(order.type)
  const waitVariant = order.waitMinutes >= 25 ? 'danger' : order.waitMinutes >= 15 ? 'warning' : 'secondary'

  const destination = order.tableNumber
    ? `${order.tableNumber}${order.coverCount ? ` · ${order.coverCount} covers` : ''}`
    : (order.customerName ?? order.forDestination)

  const action =
    order.status === 'New'
      ? { label: 'Start preparing', nextStatus: 'Preparing' as const, Icon: ArrowRightIcon }
      : order.status === 'Preparing'
        ? { label: 'Mark ready', nextStatus: 'Ready' as const, Icon: CheckIcon }
        : { label: 'Mark served', nextStatus: 'Served' as const, Icon: CheckIcon }

  return (
    <Card className='gap-0 overflow-hidden py-0'>
      <CardHeader className='gap-3 p-4 pb-3'>
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0 space-y-2'>
            <div className='flex flex-wrap items-center gap-2'>
              <h3 className='text-base font-semibold tabular-nums'>{order.orderNumber}</h3>
              <Badge variant='outline' className='h-6'>
                <Icon aria-hidden='true' />
                {label}
              </Badge>
            </div>
            <div className='text-muted-foreground flex min-w-0 items-center gap-1.5 text-sm'>
              <MapPinIcon className='size-3.5 shrink-0' aria-hidden='true' />
              <span className='truncate'>{destination}</span>
            </div>
          </div>
          <Badge variant={waitVariant} className='mt-0.5 shrink-0'>
            <Clock3Icon aria-hidden='true' />
            {formatWaitTime(order.waitMinutes)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className='space-y-3 px-4 pb-4'>
        <ul className='space-y-2 border-t pt-3'>
          {order.items.slice(0, 4).map(item => (
            <li key={item.id} className='flex items-start gap-2.5'>
              <span className='bg-muted text-foreground inline-flex size-5 shrink-0 items-center justify-center rounded text-xs font-semibold tabular-nums'>
                {item.quantity}×
              </span>
              <div className='min-w-0 flex-1'>
                <p className='text-sm leading-5 font-medium'>{item.name}</p>
                {item.modifiers && <p className='text-muted-foreground mt-0.5 text-xs leading-4'>{item.modifiers}</p>}
              </div>
            </li>
          ))}
          {order.items.length > 4 && (
            <li className='text-muted-foreground pl-7 text-xs'>+{order.items.length - 4} more items</li>
          )}
        </ul>

        {order.notes && (
          <div className='flex gap-2 rounded-md bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100'>
            <MessageSquareTextIcon className='mt-0.5 size-3.5 shrink-0' aria-hidden='true' />
            <p className='line-clamp-2'>{order.notes}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className='px-4 py-3'>
        <div className='flex w-full items-center justify-between gap-3'>
          <span className='text-muted-foreground text-xs tabular-nums'>
            {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
          </span>
          <Button size='sm' onClick={() => onAdvance(order)}>
            <action.Icon aria-hidden='true' />
            {action.label}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function KitchenColumn({
  status,
  description,
  color,
  orders,
  hasFilters,
  onAdvance
}: {
  status: KitchenStatus
  description: string
  color: string
  orders: KitchenTicket[]
  hasFilters: boolean
  onAdvance: (order: KitchenTicket) => void
}) {
  const titleId = `kitchen-column-${status.toLowerCase()}`

  return (
    <section aria-labelledby={titleId} className='bg-muted/30 flex h-full min-h-0 min-w-0 flex-col rounded-xl border'>
      <header className='flex items-center justify-between gap-3 border-b px-4 py-3'>
        <div className='flex min-w-0 items-center gap-2.5'>
          <span className={`size-2.5 shrink-0 rounded-full ${color}`} aria-hidden='true' />
          <div className='min-w-0'>
            <h2 id={titleId} className='text-sm font-semibold'>
              {status}
            </h2>
            <p className='text-muted-foreground text-xs'>{description}</p>
          </div>
        </div>
        <Badge variant='secondary' className='min-w-7 justify-center'>
          {orders.length}
        </Badge>
      </header>

      <div className='min-h-0 flex-1 space-y-3 overflow-y-auto p-3'>
        {orders.length ? (
          orders.map(order => <KitchenTicketCard key={order.id} order={order} onAdvance={onAdvance} />)
        ) : (
          <div className='bg-background/60 flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed px-5 text-center'>
            <span className='bg-muted text-muted-foreground mb-3 flex size-9 items-center justify-center rounded-full'>
              <ClipboardListIcon className='size-4' aria-hidden='true' />
            </span>
            <p className='text-sm font-medium'>
              {hasFilters ? 'No matching tickets' : `No ${status.toLowerCase()} tickets`}
            </p>
            <p className='text-muted-foreground mt-1 max-w-48 text-xs leading-5'>
              {hasFilters ? 'Try another search or order type.' : 'New tickets will appear here as they come in.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default function KitchenView() {
  const [orders, setOrders] = useState<KitchenTicket[]>(() =>
    mockOrders.map((order, index) => ({
      ...order,
      waitMinutes: INITIAL_WAIT_MINUTES[index % INITIAL_WAIT_MINUTES.length]
    }))
  )

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<OrderTypeFilter>('all')

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setOrders(currentOrders =>
        currentOrders.map(order =>
          order.status === 'Served' || order.status === 'Cancelled'
            ? order
            : { ...order, waitMinutes: order.waitMinutes + 1 }
        )
      )
    }, 60_000)

    return () => window.clearInterval(intervalId)
  }, [])

  const activeOrders = useMemo(
    () => orders.filter(order => order.status === 'New' || order.status === 'Preparing' || order.status === 'Ready'),
    [orders]
  )

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()

    return activeOrders.filter(order => {
      const matchesType = typeFilter === 'all' || order.type.toLowerCase() === typeFilter

      if (!matchesType) return false
      if (!query) return true

      const matchesOrder = [
        order.orderNumber,
        order.forDestination,
        order.customerName ?? '',
        order.tableNumber ?? ''
      ].some(value => value.toLowerCase().includes(query))

      const matchesItems = order.items.some(
        item => item.name.toLowerCase().includes(query) || Boolean(item.modifiers?.toLowerCase().includes(query))
      )

      return matchesOrder || matchesItems
    })
  }, [activeOrders, search, typeFilter])

  const longestWait = activeOrders.reduce((longest, order) => Math.max(longest, order.waitMinutes), 0)
  const hasFilters = Boolean(search.trim()) || typeFilter !== 'all'

  const handleAdvanceOrder = (order: KitchenTicket) => {
    const nextStatus = order.status === 'New' ? 'Preparing' : order.status === 'Preparing' ? 'Ready' : 'Served'

    setOrders(currentOrders =>
      currentOrders.map(currentOrder =>
        currentOrder.id === order.id ? { ...currentOrder, status: nextStatus } : currentOrder
      )
    )

    const actionMessage = nextStatus === 'Served' ? 'marked as served' : `moved to ${nextStatus.toLowerCase()}`

    toast.success(`${order.orderNumber} ${actionMessage}`)
  }

  const clearFilters = () => {
    setSearch('')
    setTypeFilter('all')
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Kitchen Display</h1>
          <p className='text-muted-foreground text-sm'>Keep each order moving from the line to handoff.</p>
        </div>
        <div className='text-muted-foreground flex items-center gap-2 text-xs'>
          <ChefHatIcon className='size-4' aria-hidden='true' />
          <span>Wait times update every minute</span>
        </div>
      </div>

      <section aria-label='Kitchen queue summary' className='bg-card grid grid-cols-3 divide-x rounded-xl border'>
        <div className='min-w-0 px-3 py-3 sm:px-5'>
          <p className='text-muted-foreground text-xs'>In kitchen</p>
          <p className='mt-1 text-lg font-semibold tabular-nums'>{activeOrders.length}</p>
        </div>
        <div className='min-w-0 px-3 py-3 sm:px-5'>
          <p className='text-muted-foreground text-xs'>New orders</p>
          <p className='mt-1 text-lg font-semibold tabular-nums'>
            {activeOrders.filter(order => order.status === 'New').length}
          </p>
        </div>
        <div className='min-w-0 px-3 py-3 sm:px-5'>
          <p className='text-muted-foreground text-xs'>Longest wait</p>
          <p className='mt-1 text-lg font-semibold tabular-nums'>
            {activeOrders.length ? formatWaitTime(longestWait) : '—'}
          </p>
        </div>
      </section>

      <div className='bg-card flex flex-col gap-3 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4'>
        <div className='w-full sm:max-w-sm'>
          <Label htmlFor='kitchen-search' className='sr-only'>
            Search kitchen tickets
          </Label>
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon className='size-4' aria-hidden='true' />
            </InputGroupAddon>
            <InputGroupInput
              id='kitchen-search'
              value={search}
              onChange={event => setSearch(event.target.value)}
              placeholder='Search orders, items, or table…'
            />
          </InputGroup>
        </div>

        <div className='flex items-center gap-2'>
          <Label htmlFor='kitchen-type-filter' className='sr-only'>
            Filter by order type
          </Label>
          <Select
            items={ORDER_TYPE_FILTERS}
            value={typeFilter}
            onValueChange={value => setTypeFilter((value as OrderTypeFilter | null) ?? 'all')}
          >
            <SelectTrigger id='kitchen-type-filter' className='w-full sm:w-44'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ORDER_TYPE_FILTERS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button type='button' variant='ghost' size='sm' onClick={clearFilters}>
              <XIcon aria-hidden='true' />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className='grid min-w-0 gap-4 xl:h-[calc(100dvh-21rem)] xl:min-h-80 xl:grid-cols-3'>
        {COLUMNS.map(column => {
          const columnOrders = filteredOrders
            .filter(order => order.status === column.status)
            .sort((first, second) => second.waitMinutes - first.waitMinutes)

          return (
            <KitchenColumn
              key={column.status}
              status={column.status}
              description={column.description}
              color={column.color}
              orders={columnOrders}
              hasFilters={hasFilters}
              onAdvance={handleAdvanceOrder}
            />
          )
        })}
      </div>
    </div>
  )
}
