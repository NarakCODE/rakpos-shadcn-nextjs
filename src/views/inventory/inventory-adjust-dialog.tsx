'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import { MinusIcon, PlusIcon, SlidersIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { InventoryAdjustmentReason, InventoryAdjustmentValues, InventoryItem } from '@/types/inventory-types'

type InventoryAdjustDialogProps = {
  item: InventoryItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdjust: (item: InventoryItem, values: InventoryAdjustmentValues) => void
}

const ADJUSTMENT_REASONS: { label: string; value: InventoryAdjustmentReason }[] = [
  { label: 'Received shipment (Restock)', value: 'Received shipment' },
  { label: 'Kitchen usage / consumption', value: 'Kitchen usage' },
  { label: 'Inventory recount / audit', value: 'Inventory recount / audit' },
  { label: 'Wastage / damaged / spoiled', value: 'Wastage / damaged' },
  { label: 'Return to vendor', value: 'Return to vendor' }
]

export function InventoryAdjustDialog({ item, open, onOpenChange, onAdjust }: InventoryAdjustDialogProps) {
  const [mode, setMode] = useState<'set' | 'add' | 'subtract'>('set')
  const [amount, setAmount] = useState<string>(item ? String(item.currentStock) : '0')
  const [reason, setReason] = useState<InventoryAdjustmentReason>('Inventory recount / audit')
  const [notes, setNotes] = useState('')

  if (!item) return null

  const currentStock = item.currentStock
  const numAmount = Number(amount) || 0

  let resultingStock = currentStock

  if (mode === 'set') {
    resultingStock = Math.max(0, numAmount)
  } else if (mode === 'add') {
    resultingStock = currentStock + numAmount
  } else if (mode === 'subtract') {
    resultingStock = Math.max(0, currentStock - numAmount)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onAdjust(item, {
      mode,
      quantity: numAmount,
      reason,
      notes: notes.trim() || undefined
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <DialogHeader>
            <DialogTitle>
              <span className='flex items-center gap-2'>
                <SlidersIcon className='text-primary size-5' />
                <span>Adjust Stock: {item.name}</span>
              </span>
            </DialogTitle>
            <DialogDescription>Update on-hand inventory quantity and track adjustment reason.</DialogDescription>
          </DialogHeader>

          <div className='bg-muted/60 text-body-small-regular flex items-center justify-between rounded-lg p-3'>
            <div>
              <span className='text-body-mini-regular text-muted-foreground'>Current Stock</span>
              <p className='text-foreground text-body-regular-semibold'>
                {currentStock} {item.unit}
              </p>
            </div>
            <div className='text-right'>
              <span className='text-body-mini-regular text-muted-foreground'>Thresholds</span>
              <p className='text-body-mini-medium text-foreground'>
                Min: {item.minStock} / Max: {item.maxStock} {item.unit}
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className='grid grid-cols-3 gap-2'>
            <Button
              type='button'
              variant={mode === 'set' ? 'default' : 'outline'}
              size='sm'
              onClick={() => {
                setMode('set')
                setAmount(String(item.currentStock))
                setReason('Inventory recount / audit')
              }}
            >
              <span>Set Total</span>
            </Button>
            <Button
              type='button'
              variant={mode === 'add' ? 'default' : 'outline'}
              size='sm'
              onClick={() => {
                setMode('add')
                setAmount('1')
                setReason('Received shipment')
              }}
            >
              <PlusIcon className='size-3.5' />
              <span>Add Stock</span>
            </Button>
            <Button
              type='button'
              variant={mode === 'subtract' ? 'default' : 'outline'}
              size='sm'
              onClick={() => {
                setMode('subtract')
                setAmount('1')
                setReason('Kitchen usage')
              }}
            >
              <MinusIcon className='size-3.5' />
              <span>Reduce</span>
            </Button>
          </div>

          {/* Amount input */}
          <div className='grid gap-2'>
            <Label htmlFor='adjust-amount'>
              {mode === 'set' ? 'New Total Quantity' : mode === 'add' ? 'Quantity to Add' : 'Quantity to Deduct'} (
              {item.unit})
            </Label>
            <Input
              id='adjust-amount'
              type='number'
              min='0'
              step='any'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* Result preview */}
          <div className='text-body-mini-regular flex items-center justify-between rounded-md border border-dashed px-3 py-2'>
            <span className='text-muted-foreground'>New Resulting Stock:</span>
            <span className='text-foreground font-bold'>
              {resultingStock} {item.unit}
            </span>
          </div>

          {/* Reason */}
          <div className='grid gap-2'>
            <Label htmlFor='adjust-reason'>Adjustment Reason</Label>
            <Select
              items={ADJUSTMENT_REASONS}
              value={reason}
              onValueChange={val => {
                if (val) setReason(val as InventoryAdjustmentReason)
              }}
            >
              <SelectTrigger id='adjust-reason'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ADJUSTMENT_REASONS.map(r => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className='grid gap-2'>
            <Label htmlFor='adjust-notes'>Notes (Optional)</Label>
            <Input
              id='adjust-notes'
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder='e.g. Supplier invoice #1048 or spoilage reason'
            />
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit'>Save Adjustment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
