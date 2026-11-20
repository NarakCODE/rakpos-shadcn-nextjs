import { BikeIcon, ShoppingBagIcon, UtensilsIcon } from 'lucide-react'

import type { OrderFulfillmentType } from '@/types/orders-types'

export function OrderTypeBadge({ type }: { type: OrderFulfillmentType }) {
  switch (type) {
    case 'Dine-in':
    case 'Dine-In':
      return (
        <span className='text-foreground text-body-small-medium inline-flex items-center gap-1.5'>
          <UtensilsIcon className='text-muted-foreground size-4 shrink-0' aria-hidden='true' />
          <span>Dine-In</span>
        </span>
      )
    case 'Takeaway':
      return (
        <span className='text-foreground text-body-small-medium inline-flex items-center gap-1.5'>
          <ShoppingBagIcon className='text-muted-foreground size-4 shrink-0' aria-hidden='true' />
          <span>Takeaway</span>
        </span>
      )
    case 'Delivery':
      return (
        <span className='text-foreground text-body-small-medium inline-flex items-center gap-1.5'>
          <BikeIcon className='text-muted-foreground size-4 shrink-0' aria-hidden='true' />
          <span>Delivery</span>
        </span>
      )
    default:
      return <span>{type}</span>
  }
}
