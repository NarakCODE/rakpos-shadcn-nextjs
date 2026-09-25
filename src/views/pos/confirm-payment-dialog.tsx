'use client'

import { useState } from 'react'

import { BanknoteIcon, CreditCardIcon, QrCodeIcon, WalletIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'

export type PaymentMethod = 'cash' | 'card' | 'upi' | 'online'

const paymentMethods = [
  { value: 'cash', label: 'Cash', description: 'Pay at counter', icon: BanknoteIcon },
  { value: 'card', label: 'Card', description: 'Swipe or tap', icon: CreditCardIcon },
  { value: 'upi', label: 'UPI', description: 'Scan QR', icon: QrCodeIcon },
  { value: 'online', label: 'Online', description: 'Wallet or web', icon: WalletIcon }
] as const

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const formatCents = (cents: number) => currency.format(cents / 100)

type ConfirmPaymentDialogProps = {
  orderTypeLabel: string
  table: string | null
  customerName: string
  phone: string
  deliveryAddress: string
  itemCount: number
  subtotalCents: number
  discountCents: number
  taxCents: number
  totalCents: number
  onClose: () => void
  onConfirm: (method: PaymentMethod) => void
}

export function ConfirmPaymentDialog({
  orderTypeLabel,
  table,
  customerName,
  phone,
  deliveryAddress,
  itemCount,
  subtotalCents,
  discountCents,
  taxCents,
  totalCents,
  onClose,
  onConfirm
}: ConfirmPaymentDialogProps) {
  const [method, setMethod] = useState<PaymentMethod>('cash')

  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent className='max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg'>
        <DialogHeader className='pr-8'>
          <DialogTitle size='lg'>Confirm Payment</DialogTitle>
          <DialogDescription className='flex flex-col'>
            {table && <span>Table {table}</span>}
            <span>
              {orderTypeLabel} · {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </span>
            {customerName && <span>{customerName}</span>}
            {phone && <span>{phone}</span>}
            {deliveryAddress && <span>{deliveryAddress}</span>}
          </DialogDescription>
        </DialogHeader>

        <Card size='sm'>
          <CardHeader>
            <CardDescription>Amount Due</CardDescription>
            <CardTitle className='text-3xl font-semibold tabular-nums'>{formatCents(totalCents)}</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <Separator />
            <div className='flex items-center justify-between gap-3'>
              <span className='text-muted-foreground'>Subtotal</span>
              <span className='tabular-nums'>{formatCents(subtotalCents)}</span>
            </div>
            {discountCents > 0 && (
              <div className='flex items-center justify-between gap-3'>
                <span className='text-muted-foreground'>Discount</span>
                <span className='tabular-nums'>-{formatCents(discountCents)}</span>
              </div>
            )}
            <div className='flex items-center justify-between gap-3'>
              <span className='text-muted-foreground'>Tax (5%)</span>
              <span className='tabular-nums'>{formatCents(taxCents)}</span>
            </div>
          </CardContent>
        </Card>

        <FieldSet>
          <FieldLegend>Select payment method</FieldLegend>
          <RadioGroup
            value={method}
            onValueChange={value => setMethod(value as PaymentMethod)}
            className='grid-cols-2'
            aria-label='Payment method'
          >
            {paymentMethods.map(option => {
              const Icon = option.icon
              const optionId = `payment-method-${option.value}`

              return (
                <FieldLabel key={option.value} htmlFor={optionId}>
                  <Field orientation='horizontal'>
                    <FieldContent>
                      <FieldTitle>
                        <Icon aria-hidden='true' />
                        {option.label}
                      </FieldTitle>
                      <FieldDescription>{option.description}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={option.value} id={optionId} />
                  </Field>
                </FieldLabel>
              )
            })}
          </RadioGroup>
        </FieldSet>

        <DialogFooter className='sm:justify-between'>
          <DialogClose render={<Button variant='ghost' />}>Cancel</DialogClose>
          <Button variant='default' onClick={() => onConfirm(method)}>
            Confirm · {formatCents(totalCents)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
