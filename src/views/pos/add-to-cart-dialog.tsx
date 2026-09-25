'use client'

import { useState } from 'react'

import { MinusIcon, PlusIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { getProductCustomizations, type PosCategory } from '@/views/pos/pos-customizations'

export type PosProduct = {
  id: string
  name: string
  category: PosCategory
  dietary: 'veg' | 'non-veg' | 'egg'
  price: number
  image: string
  description?: string
}

export type CartItemSelection = {
  key: string
  product: PosProduct
  quantity: number
  unitPriceCents: number
  optionLabels: string[]
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const price = (cents: number) => currency.format(cents / 100)

type AddToCartDialogProps = {
  product: PosProduct
  onClose: () => void
  onAdd: (selection: CartItemSelection) => void
}

export function AddToCartDialog({ product, onClose, onAdd }: AddToCartDialogProps) {
  const customization = getProductCustomizations(product)

  const [selections, setSelections] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(
      customization.options.map(group => [group.id, group.mode === 'single' ? [group.defaultId] : group.defaultIds])
    )
  )

  const [addOn, setAddOn] = useState('none')
  const [quantity, setQuantity] = useState(1)

  const selectedAddOn = customization.addOns.find(option => option.id === addOn)

  const chosenGroups = customization.options.map(group => ({
    id: group.id,
    label: group.label,
    options: group.options.filter(option => selections[group.id]?.includes(option.id))
  }))

  const unitPriceCents =
    Math.round(product.price * 100) +
    (selectedAddOn?.priceCents ?? 0) +
    chosenGroups.reduce((total, group) => total + group.options.reduce((sum, option) => sum + option.priceCents, 0), 0)

  const toggleOption = (groupId: string, optionId: string, checked: boolean, maxSelections: number) => {
    setSelections(current => {
      const selected = current[groupId] ?? []

      if (!checked) return { ...current, [groupId]: selected.filter(id => id !== optionId) }
      if (selected.includes(optionId) || selected.length >= maxSelections) return current

      return { ...current, [groupId]: [...selected, optionId] }
    })
  }

  const handleAdd = () => {
    onAdd({
      key: JSON.stringify([
        product.id,
        ...chosenGroups.map(group => [group.id, ...group.options.map(option => option.id)]),
        addOn
      ]),
      product,
      quantity,
      unitPriceCents,
      optionLabels: [
        ...chosenGroups.flatMap(group => group.options.map(option => `${group.label}: ${option.label}`)),
        ...(selectedAddOn ? [`Add-ons: ${selectedAddOn.label}`] : [])
      ]
    })
  }

  return (
    <Dialog open onOpenChange={open => !open && onClose()}>
      <DialogContent className='max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-xl'>
        <DialogHeader className='pr-8'>
          <div className='flex flex-wrap items-center gap-2'>
            <DialogTitle size='lg'>{product.name}</DialogTitle>
            <Badge variant={product.dietary === 'veg' ? 'success' : 'secondary'}>
              {product.dietary === 'veg' ? 'Veg' : product.dietary === 'egg' ? 'Egg' : 'Non-Veg'}
            </Badge>
          </div>
          <DialogDescription>
            {product.description ?? `Freshly prepared ${product.category.toLowerCase()}.`}
          </DialogDescription>
          <p className='text-muted-foreground text-sm'>Base price {price(Math.round(product.price * 100))}</p>
        </DialogHeader>

        <Separator />

        {customization.options.map(group => (
          <div key={group.id} className='flex flex-col gap-5'>
            <FieldSet>
              <FieldLegend>
                {group.label}{' '}
                <Badge variant='secondary'>
                  {group.mode === 'single' ? 'Required' : `Optional · up to ${group.maxSelections}`}
                </Badge>
              </FieldLegend>
              {group.mode === 'single' && (group.id === 'size' || group.id === 'portion') ? (
                <RadioGroup
                  value={selections[group.id]?.[0] ?? group.defaultId}
                  onValueChange={value => setSelections(current => ({ ...current, [group.id]: [value] }))}
                  aria-label={group.label}
                  className='grid-cols-2'
                >
                  {group.options.map(option => {
                    const optionId = `${product.id}-${group.id}-${option.id}`

                    return (
                      <FieldLabel key={option.id} htmlFor={optionId}>
                        <Field orientation='horizontal'>
                          <FieldContent>
                            <FieldTitle>{option.label}</FieldTitle>
                            <FieldDescription>
                              {option.priceCents ? `+${price(option.priceCents)}` : 'Included'}
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value={option.id} id={optionId} />
                        </Field>
                      </FieldLabel>
                    )
                  })}
                </RadioGroup>
              ) : group.mode === 'single' ? (
                <ToggleGroup
                  multiple={false}
                  value={selections[group.id] ?? [group.defaultId]}
                  onValueChange={values => {
                    if (values[0]) setSelections(current => ({ ...current, [group.id]: [values[0]] }))
                  }}
                  variant='pos-option'
                  className='grid w-full grid-cols-2 sm:grid-cols-4'
                  aria-label={group.label}
                >
                  {group.options.map(option => (
                    <ToggleGroupItem key={option.id} value={option.id} className='min-w-0 flex-col items-start'>
                      <span>{option.label}</span>
                      <span className='text-xs opacity-70'>
                        {option.priceCents ? `+${price(option.priceCents)}` : 'Included'}
                      </span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              ) : (
                <div className='grid gap-2 sm:grid-cols-2'>
                  {group.options.map(option => {
                    const selected = selections[group.id] ?? []
                    const checked = selected.includes(option.id)

                    return (
                      <Field key={option.id} orientation='horizontal' surface='outline' className='p-3'>
                        <Checkbox
                          id={`${product.id}-${group.id}-${option.id}`}
                          checked={checked}
                          disabled={!checked && selected.length >= group.maxSelections}
                          onCheckedChange={value => toggleOption(group.id, option.id, value, group.maxSelections)}
                        />
                        <FieldLabel
                          htmlFor={`${product.id}-${group.id}-${option.id}`}
                          className='min-w-0 flex-1 justify-between'
                        >
                          <span>{option.label}</span>
                          <span className='text-muted-foreground ml-auto tabular-nums'>
                            {option.priceCents ? `+${price(option.priceCents)}` : 'Included'}
                          </span>
                        </FieldLabel>
                      </Field>
                    )
                  })}
                </div>
              )}
            </FieldSet>
            <Separator />
          </div>
        ))}

        <FieldSet>
          <FieldLegend>
            Add-ons <Badge variant='secondary'>Optional · choose 1</Badge>
          </FieldLegend>
          <RadioGroup value={addOn} onValueChange={setAddOn} className='sm:grid-cols-2'>
            {[{ id: 'none', label: 'No add-on', priceCents: 0 }, ...customization.addOns].map(option => (
              <Field key={option.id} orientation='horizontal' surface='outline' className='p-3'>
                <RadioGroupItem id={`${product.id}-addon-${option.id}`} value={option.id} />
                <FieldLabel htmlFor={`${product.id}-addon-${option.id}`} className='min-w-0 flex-1 justify-between'>
                  <span>{option.label}</span>
                  <span className='text-muted-foreground ml-auto tabular-nums'>
                    {option.priceCents ? `+${price(option.priceCents)}` : 'Included'}
                  </span>
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>

        <Separator />

        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground text-sm'>Quantity</span>
            <Button
              variant='outline'
              size='icon-sm'
              aria-label='Decrease quantity'
              disabled={quantity === 1}
              onClick={() => setQuantity(current => Math.max(1, current - 1))}
            >
              <MinusIcon />
            </Button>
            <span className='min-w-5 text-center font-medium tabular-nums' aria-live='polite'>
              {quantity}
            </span>
            <Button
              variant='outline'
              size='icon-sm'
              aria-label='Increase quantity'
              onClick={() => setQuantity(current => current + 1)}
            >
              <PlusIcon />
            </Button>
          </div>
          <div className='text-right'>
            <p className='text-muted-foreground text-xs'>Total</p>
            <strong className='text-xl tabular-nums' aria-live='polite'>
              {price(unitPriceCents * quantity)}
            </strong>
          </div>
        </div>
        <Button className='w-full' onClick={handleAdd}>
          Add to Cart
        </Button>
      </DialogContent>
    </Dialog>
  )
}
