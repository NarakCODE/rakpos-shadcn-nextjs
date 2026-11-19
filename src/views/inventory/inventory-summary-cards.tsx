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
      iconBg: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
      badgeClass: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-950/60'
    },
    {
      id: 'out-of-stock',
      title: 'Out of Stock',
      value: String(outOfStockCount),
      subtext: `${outOfStockCount} unavailable`,
      icon: AlertOctagonIcon,
      iconBg: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
      badgeClass: 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-950/60'
    },
    {
      id: 'total-value',
      title: 'Total Value',
      value: currencyFormatter.format(totalValue),
      subtext: 'Inventory value',
      icon: DollarSignIcon,
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
      badgeClass: 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-950/60'
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
                <span className='text-sm font-medium text-muted-foreground'>{card.title}</span>
                <div className={cn('flex size-9 items-center justify-center rounded-lg', card.iconBg)}>
                  <Icon className='size-5' aria-hidden='true' />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <span className='text-2xl font-bold tracking-tight text-foreground tabular-nums sm:text-3xl'>
                  {card.value}
                </span>
                <div className='flex items-center gap-1.5'>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
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
