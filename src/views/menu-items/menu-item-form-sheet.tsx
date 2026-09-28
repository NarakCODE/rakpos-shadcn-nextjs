'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import Image from 'next/image'

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
  MENU_CATEGORIES,
  type DietaryType,
  type MenuCategoryName,
  type MenuItem,
  type MenuItemFormValues,
  type MenuItemStatus
} from '@/types/menu-item-types'

const CATEGORY_ITEMS = MENU_CATEGORIES.map(category => ({ label: category, value: category }))

const TYPE_ITEMS: { label: DietaryType; value: DietaryType }[] = [
  { label: 'Veg', value: 'Veg' },
  { label: 'Non-Veg', value: 'Non-Veg' },
  { label: 'Egg', value: 'Egg' }
]

const STATUS_ITEMS: { label: MenuItemStatus; value: MenuItemStatus }[] = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' }
]

const ADDON_GROUP_ITEMS = [0, 1, 2, 3, 4].map(count => ({
  label: `${count} ${count === 1 ? 'group' : 'groups'}`,
  value: String(count)
}))

const IMAGE_ITEMS = [
  { label: 'Stone-baked pizza', value: '/images/dashboard/pizza.jpg' },
  { label: 'Classic burger', value: '/images/dashboard/burger.jpg' },
  { label: 'Fresh salad bowl', value: '/images/dashboard/poke.jpg' },
  { label: 'Warm bowl', value: '/images/dashboard/risotto.jpg' }
]

type MenuItemFormSheetProps = {
  item: MenuItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (values: MenuItemFormValues) => void
}

export function MenuItemFormSheet({ item, open, onOpenChange, onSave }: MenuItemFormSheetProps) {
  const [title, setTitle] = useState(item?.title ?? '')
  const [description, setDescription] = useState(item?.description ?? '')
  const [category, setCategory] = useState<MenuCategoryName>(item?.category ?? 'Pizza')
  const [price, setPrice] = useState(item ? String(item.price) : '')
  const [dietaryType, setDietaryType] = useState<DietaryType>(item?.dietaryType ?? 'Veg')
  const [addonGroupCount, setAddonGroupCount] = useState(String(item?.addonGroupCount ?? 0))
  const [status, setStatus] = useState<MenuItemStatus>(item?.status ?? 'Active')
  const [image, setImage] = useState(item?.image ?? IMAGE_ITEMS[0].value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedPrice = Number(price)

    if (!title.trim() || !description.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) return

    onSave({
      title: title.trim(),
      description: description.trim(),
      category,
      price: parsedPrice,
      dietaryType,
      addonGroupCount: Number(addonGroupCount),
      status,
      image
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-lg'>
        <form className='flex min-h-full flex-col' onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>{item ? 'Edit menu item' : 'Add menu item'}</SheetTitle>
            <SheetDescription>
              {item ? 'Update the item details shown in your POS menu.' : 'Add a dish to the menu available at the POS.'}
            </SheetDescription>
          </SheetHeader>

          <div className='flex flex-col gap-4 overflow-y-auto px-4 pb-4'>
            <div className='flex items-center gap-3'>
              <div className='relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted'>
                <Image src={image} alt='' fill sizes='64px' className='object-cover' />
              </div>
              <div className='flex min-w-0 flex-1 flex-col gap-2'>
                <Label htmlFor='menu-item-image'>Food thumbnail</Label>
                <Select
                  items={IMAGE_ITEMS}
                  value={image}
                  onValueChange={value => {
                    if (value) setImage(value)
                  }}
                >
                  <SelectTrigger id='menu-item-image' className='w-full' aria-label='Food thumbnail'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {IMAGE_ITEMS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='menu-item-title'>Item name</Label>
              <Input
                id='menu-item-title'
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder='e.g. Margherita Pizza'
                maxLength={80}
                required
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='menu-item-description'>Description</Label>
              <Textarea
                id='menu-item-description'
                value={description}
                onChange={event => setDescription(event.target.value)}
                placeholder='Describe the dish and its ingredients'
                rows={3}
                maxLength={180}
                required
              />
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='menu-item-category'>Category</Label>
                <Select
                  items={CATEGORY_ITEMS}
                  value={category}
                  onValueChange={value => {
                    if (MENU_CATEGORIES.includes(value as MenuCategoryName)) setCategory(value as MenuCategoryName)
                  }}
                >
                  <SelectTrigger id='menu-item-category' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CATEGORY_ITEMS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2'>
                <Label htmlFor='menu-item-price'>Price (USD)</Label>
                <Input
                  id='menu-item-price'
                  type='number'
                  inputMode='decimal'
                  min='0'
                  step='0.01'
                  value={price}
                  onChange={event => setPrice(event.target.value)}
                  placeholder='0.00'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <Label htmlFor='menu-item-type'>Dietary type</Label>
                <Select
                  items={TYPE_ITEMS}
                  value={dietaryType}
                  onValueChange={value => {
                    if (value === 'Veg' || value === 'Non-Veg' || value === 'Egg') setDietaryType(value)
                  }}
                >
                  <SelectTrigger id='menu-item-type' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {TYPE_ITEMS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2'>
                <Label htmlFor='menu-item-addons'>Addon groups</Label>
                <Select
                  items={ADDON_GROUP_ITEMS}
                  value={addonGroupCount}
                  onValueChange={value => {
                    if (value) setAddonGroupCount(value)
                  }}
                >
                  <SelectTrigger id='menu-item-addons' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ADDON_GROUP_ITEMS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2 sm:col-span-2'>
                <Label htmlFor='menu-item-status'>Availability</Label>
                <Select
                  items={STATUS_ITEMS}
                  value={status}
                  onValueChange={value => {
                    if (value === 'Active' || value === 'Inactive') setStatus(value)
                  }}
                >
                  <SelectTrigger id='menu-item-status' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {STATUS_ITEMS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <SheetFooter>
            <div className='flex items-center justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type='submit' variant='default' disabled={!title.trim() || !description.trim() || !price}>
                {item ? 'Save changes' : 'Add item'}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
