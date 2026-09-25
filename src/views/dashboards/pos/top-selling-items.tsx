'use client'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export type SellingItem = {
  id: string
  name: string
  category: string
  sales: string
  volume: number
  image: string
}

const topDishes: SellingItem[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Risotto',
    category: 'Mains',
    sales: '$1,840.00',
    volume: 92,
    image: '/images/dashboard/risotto.jpg'
  },
  {
    id: '2',
    name: 'Wagyu Smash Burger',
    category: 'Burgers',
    sales: '$1,560.00',
    volume: 104,
    image: '/images/dashboard/burger.jpg'
  },
  {
    id: '3',
    name: 'Wood-fired Margherita Pizza',
    category: 'Pizza',
    sales: '$1,350.00',
    volume: 75,
    image: '/images/dashboard/pizza.jpg'
  },
  {
    id: '4',
    name: 'Fresh Salmon Poke Bowl',
    category: 'Bowls',
    sales: '$1,120.00',
    volume: 68,
    image: '/images/dashboard/poke.jpg'
  }
]

export const TopSellingItems = () => {
  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='pb-3'>
        <CardTitle>
          <span className='text-lg font-bold'>Top Selling Items</span>
        </CardTitle>
        <CardDescription>
          <span className='text-muted-foreground text-xs'>
            Best-performing dishes by weekly revenue and order volume
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='space-y-3'>
          {topDishes.map(dish => (
            <div key={dish.id} className='flex items-center justify-between gap-3'>
              <div className='flex min-w-0 items-center gap-3'>
                {/* Thumbnail Image */}
                <div className='bg-muted relative size-10 shrink-0 overflow-hidden rounded-(--radius) border'>
                  <img src={dish.image} alt={dish.name} className='h-full w-full object-cover' />
                </div>

                {/* Name and Category */}
                <div className='min-w-0 space-y-0.5'>
                  <p className='text-foreground truncate text-sm font-semibold'>{dish.name}</p>
                  <p className='text-muted-foreground truncate text-xs'>{dish.category}</p>
                </div>
              </div>

              {/* Sales and Volume */}
              <div className='shrink-0 text-right'>
                <span className='text-foreground text-sm font-bold tabular-nums'>{dish.sales}</span>
                <p className='text-muted-foreground text-xs tabular-nums'>{dish.volume} orders</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TopSellingItems
