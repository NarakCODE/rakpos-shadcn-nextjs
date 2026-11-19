'use client'

import type { ReactElement } from 'react'

import Image from 'next/image'
import { InfoIcon, UtensilsIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import type { RestaurantOrder } from '@/types/orders-types'

import { OrderStatusBadge } from './order-status-badge'
import { OrderTypeBadge } from './order-type-badge'

export type OrderDetailsSheetProps = {
  order: RestaurantOrder | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onMarkAsReady: (orderId: string) => void
  trigger?: ReactElement
}

export function OrderDetailsSheet({
  order,
  open,
  onOpenChange,
  onMarkAsReady,
  trigger
}: OrderDetailsSheetProps) {
  if (!order) return null

  const isAlreadyReady = order.status === 'Ready' || order.status === 'Served'

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger render={trigger} />}

      <SheetContent side='right' className='flex flex-col sm:max-w-md md:max-w-lg'>
        <SheetHeader>
          <div className='flex items-center gap-2'>
            <SheetTitle>
              <span className='font-mono text-xl'>{order.orderNumber}</span>
            </SheetTitle>
            <OrderStatusBadge status={order.status} />
          </div>
          <SheetDescription>{order.locationSubtitle}</SheetDescription>
        </SheetHeader>

        <Separator />

        {/* Scrollable body content */}
        <div className='flex-1 space-y-6 overflow-y-auto px-4'>
          {/* Metadata Grid */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <span className='text-xs text-muted-foreground'>Type</span>
              <div>
                <OrderTypeBadge type={order.type} />
              </div>
            </div>
            <div className='space-y-1'>
              <span className='text-xs text-muted-foreground'>Placed at</span>
              <p className='text-sm'>{order.placedAt}</p>
            </div>
          </div>

          <Separator />

          {/* Items Section */}
          <div className='space-y-3'>
            <h3 className='text-sm font-semibold'>
              Items ({order.itemCount})
            </h3>

            <div className='divide-y divide-border'>
              {order.items.map(item => {
                const lineTotal = (item.quantity * item.price).toFixed(2)

                return (
                  <div key={item.id} className='flex items-start gap-3 py-3 first:pt-0 last:pb-0'>
                    <div className='relative size-12 shrink-0 overflow-hidden rounded-lg border bg-muted'>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes='48px'
                          className='object-cover'
                        />
                      ) : (
                        <div className='flex size-full items-center justify-center text-muted-foreground'>
                          <UtensilsIcon className='size-5' />
                        </div>
                      )}
                    </div>

                    <div className='min-w-0 flex-1 space-y-0.5'>
                      <div className='flex items-baseline justify-between gap-2'>
                        <h4 className='truncate text-sm font-semibold'>{item.name}</h4>
                        <span className='shrink-0 font-mono text-sm tabular-nums'>
                          ${lineTotal}
                        </span>
                      </div>
                      <p className='font-mono text-xs text-muted-foreground'>
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                      {item.modifiers && (
                        <p className='line-clamp-2 text-xs text-muted-foreground'>
                          {item.modifiers}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {order.notes && (
            <Alert>
              <InfoIcon />
              <AlertTitle>Kitchen Note</AlertTitle>
              <AlertDescription>{order.notes}</AlertDescription>
            </Alert>
          )}
        </div>

        <Separator />



        <SheetFooter>
          {/* Billing Summary */}
          <div className='space-y-2 mb-4'>
            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>Subtotal</span>
              <span className='font-mono tabular-nums'>${order.subtotal.toFixed(2)}</span>
            </div>

            <div className='flex items-center justify-between text-sm text-muted-foreground'>
              <span>Tax ({order.taxRate ?? 5}%)</span>
              <span className='font-mono tabular-nums'>${order.tax.toFixed(2)}</span>
            </div>

            {order.discount !== undefined && order.discount > 0 && (
              <div className='flex items-center justify-between text-sm text-green-600 dark:text-green-400'>
                <span>Discount</span>
                <span className='font-mono tabular-nums'>−${order.discount.toFixed(2)}</span>
              </div>
            )}

            <Separator className='my-1' />

            <div className='flex items-center justify-between text-base font-semibold'>
              <span>Total</span>
              <span className='font-mono tabular-nums'>${order.total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            type='button'
            className='w-full'
            disabled={order.status === 'Cancelled'}
            onClick={() => onMarkAsReady(order.id)}
          >
            {isAlreadyReady ? 'Order Ready' : 'Mark as Ready'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
