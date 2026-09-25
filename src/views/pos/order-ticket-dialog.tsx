'use client'

import { CircleCheckIcon, PrinterIcon, UtensilsCrossedIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import type { CartItemSelection } from '@/views/pos/add-to-cart-dialog'
import type { PaymentMethod } from '@/views/pos/confirm-payment-dialog'

import './order-ticket-print.css'

export type OrderTicket = {
  number: number
  createdAt: Date
  orderTypeLabel: string
  table: string | null
  covers: number
  customerName: string
  phone: string
  deliveryAddress: string
  lines: CartItemSelection[]
  subtotalCents: number
  discountCents: number
  taxCents: number
  totalCents: number
  paymentMethod: PaymentMethod
}

const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash: 'Cash',
  card: 'Card',
  upi: 'UPI',
  online: 'Online'
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const formatCents = (cents: number) => currency.format(cents / 100)

const ticketDateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
})

type OrderTicketDialogProps = {
  ticket: OrderTicket
  onClose: () => void
  onNewOrder: () => void
}

export function OrderTicketDialog({ ticket, onClose, onNewOrder }: OrderTicketDialogProps) {
  const createdAt = ticketDateFormat.format(ticket.createdAt).replace(/\b(am|pm)\b/i, period => period.toUpperCase())

  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent data-kot-ticket className='max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg'>
        <DialogHeader className='pr-8'>
          <div className='flex items-center gap-2'>
            <UtensilsCrossedIcon aria-hidden='true' />
            <DialogTitle size='lg'>Kitchen Order Ticket</DialogTitle>
          </div>
          <DialogDescription>{createdAt}</DialogDescription>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <strong className='text-2xl tabular-nums'>#{ticket.number}</strong>
            <Badge variant='accent'>{ticket.orderTypeLabel}</Badge>
          </div>
          {ticket.table ? (
            <p className='text-muted-foreground text-sm'>
              Table {ticket.table} · {ticket.covers} {ticket.covers === 1 ? 'cover' : 'covers'}
            </p>
          ) : (
            <div className='text-muted-foreground flex flex-col text-sm'>
              {ticket.customerName && <span>{ticket.customerName}</span>}
              {ticket.phone && <span>{ticket.phone}</span>}
              {ticket.deliveryAddress && <span>{ticket.deliveryAddress}</span>}
            </div>
          )}
        </div>

        <Separator />

        <section aria-labelledby='ticket-items-heading'>
          <h3 id='ticket-items-heading' className='mb-3 font-medium'>
            Kitchen items
          </h3>
          <ul className='divide-border divide-y'>
            {ticket.lines.map(line => (
              <li key={line.key} className='py-3 first:pt-0 last:pb-0'>
                <div className='flex items-start justify-between gap-3'>
                  <p className='min-w-0 font-medium'>
                    <span className='tabular-nums'>{line.quantity} ×</span> {line.product.name}
                  </p>
                  <span className='shrink-0 font-medium tabular-nums'>
                    {formatCents(line.unitPriceCents * line.quantity)}
                  </span>
                </div>
                {line.quantity > 1 && (
                  <p className='text-muted-foreground mt-1 text-xs'>{formatCents(line.unitPriceCents)} each</p>
                )}
                {line.optionLabels.length > 0 && (
                  <ul className='text-muted-foreground mt-1 flex flex-col text-xs'>
                    {line.optionLabels.map(label => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <div className='flex flex-col gap-2 text-sm'>
          <div className='flex items-center justify-between gap-3'>
            <span className='text-muted-foreground'>Subtotal</span>
            <span className='tabular-nums'>{formatCents(ticket.subtotalCents)}</span>
          </div>
          {ticket.discountCents > 0 && (
            <div className='flex items-center justify-between gap-3'>
              <span className='text-muted-foreground'>Discount</span>
              <span className='tabular-nums'>-{formatCents(ticket.discountCents)}</span>
            </div>
          )}
          <div className='flex items-center justify-between gap-3'>
            <span className='text-muted-foreground'>Tax (5%)</span>
            <span className='tabular-nums'>{formatCents(ticket.taxCents)}</span>
          </div>
          <div className='flex items-center justify-between gap-3 pt-1 font-semibold'>
            <span>Total</span>
            <strong className='text-lg tabular-nums'>{formatCents(ticket.totalCents)}</strong>
          </div>
        </div>

        <div className='bg-muted text-muted-foreground flex items-center gap-2 rounded-md p-3 text-sm'>
          <CircleCheckIcon className='size-4' aria-hidden='true' />
          <div className='flex flex-col'>
            <span>Completed via {paymentMethodLabels[ticket.paymentMethod]}</span>
            <span className='text-xs'>Demo only · no payment captured</span>
          </div>
        </div>

        <DialogFooter data-kot-actions className='sm:justify-between'>
          <Button variant='secondary' onClick={() => window.print()}>
            <PrinterIcon data-icon='inline-start' />
            Print KOT
          </Button>
          <Button onClick={onNewOrder}>New Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
