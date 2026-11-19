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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import {
  INVENTORY_CATEGORIES,
  INVENTORY_UNITS,
  type InventoryCategory,
  type InventoryItem,
  type InventoryItemFormValues,
  type InventoryUnit
} from '@/types/inventory-types'

type InventoryItemSheetProps = {
  item: InventoryItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (values: InventoryItemFormValues) => void
}

const CATEGORY_ITEMS = INVENTORY_CATEGORIES.map(category => ({
  label: category,
  value: category
}))

const UNIT_ITEMS = INVENTORY_UNITS.map(unit => ({
  label: unit,
  value: unit
}))

export function InventoryItemSheet({ item, open, onOpenChange, onSave }: InventoryItemSheetProps) {
  const [name, setName] = useState(item?.name ?? '')
  const [category, setCategory] = useState<InventoryCategory>(item?.category ?? 'Vegetables')
  const [unit, setUnit] = useState<InventoryUnit>(item?.unit ?? 'kg')
  const [currentStock, setCurrentStock] = useState(item ? String(item.currentStock) : '')
  const [minStock, setMinStock] = useState(item ? String(item.minStock) : '5')
  const [maxStock, setMaxStock] = useState(item ? String(item.maxStock) : '20')
  const [costPerUnit, setCostPerUnit] = useState(item ? String(item.costPerUnit) : '1.00')
  const [notes, setNotes] = useState(item?.notes ?? '')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onSave({
      name: name.trim(),
      category,
      unit,
      currentStock: Number(currentStock) || 0,
      minStock: Number(minStock) || 0,
      maxStock: Number(maxStock) || 1,
      costPerUnit: Number(costPerUnit) || 0,
      notes: notes.trim() || undefined
    })

    onOpenChange(false)
  }

  const isEditing = Boolean(item)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-lg'>
        <form onSubmit={handleSubmit} className='flex h-full flex-col'>
          <SheetHeader>
            <SheetTitle>{isEditing ? 'Edit Inventory Item' : 'Add Inventory Item'}</SheetTitle>
            <SheetDescription>
              {isEditing
                ? 'Update stock thresholds, unit costs, and item details.'
                : 'Add a new raw ingredient or tracked stock item to the inventory system.'}
            </SheetDescription>
          </SheetHeader>

          <div className='grid gap-4 overflow-y-auto px-4 py-4'>
            {/* Item Name */}
            <div className='grid gap-2'>
              <Label htmlFor='inv-name'>Ingredient / Item Name</Label>
              <Input
                id='inv-name'
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder='e.g. Basmati Rice'
                required
              />
            </div>

            {/* Category and Unit */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='inv-category'>Category</Label>
                <Select
                  items={CATEGORY_ITEMS}
                  value={category}
                  onValueChange={value => {
                    if (value) setCategory(value as InventoryCategory)
                  }}
                >
                  <SelectTrigger id='inv-category'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CATEGORY_ITEMS.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='inv-unit'>Measurement Unit</Label>
                <Select
                  items={UNIT_ITEMS}
                  value={unit}
                  onValueChange={value => {
                    if (value) setUnit(value as InventoryUnit)
                  }}
                >
                  <SelectTrigger id='inv-unit'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {UNIT_ITEMS.map(u => (
                        <SelectItem key={u.value} value={u.value}>
                          {u.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Current Stock */}
            <div className='grid gap-2'>
              <Label htmlFor='inv-current-stock'>Current Stock Level ({unit})</Label>
              <Input
                id='inv-current-stock'
                type='number'
                min='0'
                step='any'
                value={currentStock}
                onChange={event => setCurrentStock(event.target.value)}
                placeholder='e.g. 80'
                required
              />
            </div>

            {/* Min and Max Stock */}
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='grid gap-2'>
                <Label htmlFor='inv-min-stock'>Min Stock (Low Alert)</Label>
                <Input
                  id='inv-min-stock'
                  type='number'
                  min='0'
                  step='any'
                  value={minStock}
                  onChange={event => setMinStock(event.target.value)}
                  placeholder='e.g. 30'
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='inv-max-stock'>Max Stock Capacity</Label>
                <Input
                  id='inv-max-stock'
                  type='number'
                  min='1'
                  step='any'
                  value={maxStock}
                  onChange={event => setMaxStock(event.target.value)}
                  placeholder='e.g. 150'
                  required
                />
              </div>
            </div>

            {/* Cost Per Unit */}
            <div className='grid gap-2'>
              <Label htmlFor='inv-cost'>Cost Per Unit ($)</Label>
              <Input
                id='inv-cost'
                type='number'
                min='0'
                step='0.01'
                value={costPerUnit}
                onChange={event => setCostPerUnit(event.target.value)}
                placeholder='e.g. 1.25'
                required
              />
            </div>

            {/* Notes */}
            <div className='grid gap-2'>
              <Label htmlFor='inv-notes'>Notes / Specifications (Optional)</Label>
              <Textarea
                id='inv-notes'
                value={notes}
                onChange={event => setNotes(event.target.value)}
                placeholder='Storage instructions, preferred brand or supplier details...'
                rows={3}
              />
            </div>
          </div>

          <SheetFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type='submit'>{isEditing ? 'Save Changes' : 'Add Item'}</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
