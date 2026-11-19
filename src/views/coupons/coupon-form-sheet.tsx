'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { COUPON_TYPES, type CouponFormValues, type CouponType } from '@/types/coupon-types'

type CouponFormSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (values: CouponFormValues) => void
}

type CouponFormState = {
  code: string
  description: string
  type: CouponType
  value: string
  minOrder: string
  expires: string
  usageLimit: string
}

const INITIAL_FORM: CouponFormState = {
  code: '',
  description: '',
  type: 'Percentage (%)',
  value: '',
  minOrder: '',
  expires: 'No expiry',
  usageLimit: ''
}

const TYPE_ITEMS = COUPON_TYPES.map(type => ({ label: type, value: type }))

export function CouponFormSheet({ open, onOpenChange, onSave }: CouponFormSheetProps) {
  const [form, setForm] = useState<CouponFormState>(INITIAL_FORM)

  const updateField = <K extends keyof CouponFormState>(field: K, value: CouponFormState[K]) => {
    setForm(current => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onSave({
      code: form.code.trim().toUpperCase(),
      description: form.description.trim(),
      type: form.type,
      value: Number(form.value),
      minOrder: Number(form.minOrder),
      expires: form.expires.trim() || 'No expiry',
      ...(form.usageLimit ? { usageLimit: Number(form.usageLimit) } : {})
    })
    setForm(INITIAL_FORM)
    onOpenChange(false)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={nextOpen => {
        if (!nextOpen) setForm(INITIAL_FORM)
        onOpenChange(nextOpen)
      }}
    >
      <SheetContent className='sm:max-w-lg'>
        <form onSubmit={handleSubmit} className='flex h-full flex-col'>
          <SheetHeader>
            <SheetTitle>Add Coupon</SheetTitle>
            <SheetDescription>Create a discount coupon for your POS.</SheetDescription>
          </SheetHeader>

          <div className='grid gap-4 overflow-y-auto px-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='coupon-code'>Code</Label>
              <Input
                id='coupon-code'
                value={form.code}
                onChange={event => updateField('code', event.target.value)}
                placeholder='e.g. DINE15'
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='coupon-description'>Description</Label>
              <Input
                id='coupon-description'
                value={form.description}
                onChange={event => updateField('description', event.target.value)}
                placeholder='Describe the coupon'
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='coupon-type'>Type</Label>
              <Select
                items={TYPE_ITEMS}
                value={form.type}
                onValueChange={value => {
                  if (value) updateField('type', value as CouponType)
                }}
              >
                <SelectTrigger id='coupon-type' aria-label='Coupon type'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {TYPE_ITEMS.map(item => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='coupon-value'>Value</Label>
                <Input
                  id='coupon-value'
                  type='number'
                  min='0'
                  step='0.01'
                  value={form.value}
                  onChange={event => updateField('value', event.target.value)}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='coupon-min-order'>Min. Order ($)</Label>
                <Input
                  id='coupon-min-order'
                  type='number'
                  min='0'
                  step='0.01'
                  value={form.minOrder}
                  onChange={event => updateField('minOrder', event.target.value)}
                  required
                />
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='coupon-expires'>Expires</Label>
                <Input
                  id='coupon-expires'
                  value={form.expires}
                  onChange={event => updateField('expires', event.target.value)}
                  placeholder='No expiry'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='coupon-limit'>Usage limit</Label>
                <Input
                  id='coupon-limit'
                  type='number'
                  min='1'
                  step='1'
                  value={form.usageLimit}
                  onChange={event => updateField('usageLimit', event.target.value)}
                  placeholder='Unlimited'
                />
              </div>
            </div>
          </div>

          <SheetFooter className='mt-auto flex-row justify-end'>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit' variant='default'>
              Add Coupon
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
