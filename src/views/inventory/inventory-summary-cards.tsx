'use client'

import { AlertOctagonIcon, AlertTriangleIcon, BoxesIcon, DollarSignIcon } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { currencyFormatter } from './inventory-utils'

type InventorySummaryCardsProps = {
  totalItems: number
  lowStockCount: number
  outOfStockCount: number
  totalValue: number
}

export function InventorySummaryCards({
  totalItems,
  lowStockCount,
  outOfStockCount,
  totalValue
}: InventorySummaryCardsProps) {
  const cards = [
    {
      id: 'total-items',
      title: 'Total Items',
      value: String(totalItems),
      subtext: 'Items tracked',
      icon: BoxesIcon,
      iconBg: 'bg-primary/10 text-primary dark:bg-primary/20',
      badgeClass: 'text-muted-foreground bg-muted'
    },
    {
      id: 'low-stock',
      title: 'Low Stock',
      value: String(lowStockCount),
      subtext: `${lowStockCount} need attention`,
      icon: AlertTriangleIcon,
      iconBg: 'bg-bg-amber text-text-amber',
      badgeClass: 'bg-bg-amber text-text-amber'
    },
    {
      id: 'out-of-stock',
      title: 'Out of Stock',
      value: String(outOfStockCount),
      subtext: `${outOfStockCount} unavailable`,
      icon: AlertOctagonIcon,
      iconBg: 'bg-bg-red text-text-red',
      badgeClass: 'bg-bg-red text-text-red'
    },
    {
      id: 'total-value',
      title: 'Total Value',
      value: currencyFormatter.format(totalValue),
      subtext: 'Inventory value',
      icon: DollarSignIcon,
      iconBg: 'bg-bg-green text-text-green',
      badgeClass: 'bg-bg-green text-text-green'
    }
  ]

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {cards.map(card => {
        const Icon = card.icon

        return (
          <Card key={card.id} className='h-full'>
            <CardContent className='flex flex-col justify-between gap-4 p-5'>
              <div className='flex items-center justify-between'>
                <span className='text-body-small-medium text-muted-foreground'>{card.title}</span>
                <div className={cn('flex size-9 items-center justify-center rounded-lg', card.iconBg)}>
                  <Icon className='size-5' aria-hidden='true' />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <span className='text-title-regular text-foreground tabular-nums'>{card.value}</span>
                <div className='flex items-center gap-1.5'>
                  <span
                    className={cn(
                      'text-body-mini-medium inline-flex items-center rounded-full px-2 py-0.5',
                      card.badgeClass
                    )}
                  >
                    {card.subtext}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
