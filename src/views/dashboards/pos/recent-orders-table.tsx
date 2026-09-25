'use client'

// Third-party Imports
import { UtensilsIcon, ShoppingBagIcon, BikeIcon } from 'lucide-react'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export type OrderStatus = 'Completed' | 'In Progress' | 'Pending' | 'Cancelled'
export type DiningChannel = 'dine-in' | 'takeout' | 'delivery'

export type OrderRecord = {
  id: string
  orderNumber: string
  channel: DiningChannel
  location: string
  items: string
  status: OrderStatus
  price: string
  timeAgo: string
}

const recentOrdersData: OrderRecord[] = [
  {
    id: '1',
    orderNumber: '#ORD-9024',
    channel: 'dine-in',
    location: 'Table 4',
    items: '2x Truffle Mushroom Risotto, 1x San Pellegrino',
    status: 'Completed',
    price: '$48.50',
    timeAgo: '3m ago'
  },
  {
    id: '2',
    orderNumber: '#ORD-9023',
    channel: 'dine-in',
    location: 'Table 7',
    items: '1x Wagyu Smash Burger, 1x Truffle Fries, 1x Craft IPA',
    status: 'In Progress',
    price: '$34.00',
    timeAgo: '8m ago'
  },
  {
    id: '3',
    orderNumber: '#ORD-9022',
    channel: 'takeout',
    location: 'Takeout #14',
    items: '2x Wood-fired Margherita Pizza, 1x Garlic Bread',
    status: 'Completed',
    price: '$42.00',
    timeAgo: '14m ago'
  },
  {
    id: '4',
    orderNumber: '#ORD-9021',
    channel: 'delivery',
    location: 'DoorDash Delivery',
    items: '1x Salmon Poke Bowl, 1x Matcha Crepe Cake, 1x Iced Tea',
    status: 'In Progress',
    price: '$38.50',
    timeAgo: '22m ago'
  },
  {
    id: '5',
    orderNumber: '#ORD-9020',
    channel: 'dine-in',
    location: 'Table 2',
    items: '1x Wagyu Burger, 1x Margherita Pizza, 2x Draft Beer',
    status: 'Pending',
    price: '$56.00',
    timeAgo: '31m ago'
  },
  {
    id: '6',
    orderNumber: '#ORD-9019',
    channel: 'dine-in',
    location: 'Table 11',
    items: '3x Truffle Mushroom Risotto, 1x House Red Wine Bottle',
    status: 'Completed',
    price: '$115.00',
    timeAgo: '45m ago'
  },
  {
    id: '7',
    orderNumber: '#ORD-9018',
    channel: 'takeout',
    location: 'Takeout #12',
    items: '1x Salmon Poke Bowl, 1x Lemon Soda',
    status: 'Cancelled',
    price: '$22.00',
    timeAgo: '58m ago'
  },
  {
    id: '8',
    orderNumber: '#ORD-9017',
    channel: 'dine-in',
    location: 'Table 5',
    items: '2x Wood-fired Margherita Pizza, 2x Caesar Salad',
    status: 'Completed',
    price: '$49.00',
    timeAgo: '1h 15m ago'
  }
]

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case 'Completed':
      return <Badge variant='secondary'>Completed</Badge>
    case 'In Progress':
      return <Badge>In Progress</Badge>
    case 'Pending':
      return <Badge variant='outline'>Pending</Badge>
    case 'Cancelled':
      return <Badge variant='destructive'>Cancelled</Badge>
  }
}

const getChannelIcon = (channel: DiningChannel) => {
  switch (channel) {
    case 'dine-in':
      return <UtensilsIcon className='text-muted-foreground size-3' />
    case 'takeout':
      return <ShoppingBagIcon className='text-muted-foreground size-3' />
    case 'delivery':
      return <BikeIcon className='text-muted-foreground size-3' />
  }
}

export const RecentOrdersTable = () => {
  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg font-bold'>Recent Orders</CardTitle>
        <CardDescription className='text-muted-foreground text-xs'>
          Live tracking of the latest orders across dining channels
        </CardDescription>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader className='bg-muted/40'>
              <TableRow>
                <TableHead className='w-40 font-semibold'>Order ID & Location</TableHead>
                <TableHead className='font-semibold'>Items Ordered</TableHead>
                <TableHead className='w-32 font-semibold'>Status</TableHead>
                <TableHead className='w-28 text-right font-semibold'>Price</TableHead>
                <TableHead className='w-28 text-right font-semibold'>Elapsed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrdersData.map(order => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className='space-y-0.5'>
                      <span className='text-foreground font-mono text-xs font-bold'>{order.orderNumber}</span>
                      <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
                        {getChannelIcon(order.channel)}
                        <span>{order.location}</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className='text-foreground max-w-md truncate text-sm font-medium'>{order.items}</p>
                  </TableCell>

                  <TableCell>{getStatusBadge(order.status)}</TableCell>

                  <TableCell className='text-right'>
                    <span className='text-foreground text-sm font-bold'>{order.price}</span>
                  </TableCell>

                  <TableCell className='text-muted-foreground text-right text-xs'>{order.timeAgo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentOrdersTable
