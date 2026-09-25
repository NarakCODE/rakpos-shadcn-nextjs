'use client'

import { useState } from 'react'

import Image from 'next/image'
import {
  Beef,
  Egg,
  Leaf,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  ShoppingBagIcon,
  TicketPercentIcon,
  Trash2Icon,
  X
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { AddToCartDialog, type CartItemSelection, type PosProduct } from '@/views/pos/add-to-cart-dialog'
import { ConfirmPaymentDialog, type PaymentMethod } from '@/views/pos/confirm-payment-dialog'
import { OrderTicketDialog, type OrderTicket } from '@/views/pos/order-ticket-dialog'

type DietaryType = 'veg' | 'non-veg' | 'egg'
type OrderType = 'dine-in' | 'takeaway' | 'delivery'

type DietaryOption = {
  id: DietaryType
  label: string
  icon: typeof Leaf
}

const menuItems: PosProduct[] = [
  {
    id: 'risotto',
    name: 'Truffle Mushroom Risotto',
    category: 'Mains',
    dietary: 'veg',
    price: 20,
    image: '/images/dashboard/risotto.jpg'
  },
  {
    id: 'burger',
    name: 'Wagyu Smash Burger',
    category: 'Burgers',
    dietary: 'non-veg',
    price: 15,
    image: '/images/dashboard/burger.jpg'
  },
  {
    id: 'pizza',
    name: 'Margherita Pizza',
    category: 'Pizza',
    dietary: 'veg',
    price: 2.96,
    description: 'Classic tomato base with mozzarella and fresh basil',
    image: '/images/dashboard/pizza.jpg'
  },
  {
    id: 'poke',
    name: 'Fresh Salmon Poke Bowl',
    category: 'Bowls',
    dietary: 'non-veg',
    price: 16.5,
    image: '/images/dashboard/poke.jpg'
  },
  {
    id: 'tacos',
    name: 'Crispy Chicken Tacos',
    category: 'Mains',
    dietary: 'non-veg',
    price: 14,
    image: '/images/dashboard/burger.jpg'
  },
  {
    id: 'pasta',
    name: 'Creamy Pesto Penne',
    category: 'Pasta',
    dietary: 'veg',
    price: 17.5,
    image: '/images/dashboard/risotto.jpg'
  },
  {
    id: 'salad',
    name: 'Mediterranean Greek Salad',
    category: 'Salads',
    dietary: 'veg',
    price: 13,
    image: '/images/dashboard/poke.jpg'
  },
  {
    id: 'bbq-ribs',
    name: 'Smoked BBQ Ribs',
    category: 'Mains',
    dietary: 'non-veg',
    price: 24,
    image: '/images/dashboard/burger.jpg'
  },
  {
    id: 'quiche',
    name: 'Four Cheese Quiche',
    category: 'Bakery',
    dietary: 'egg',
    price: 11.5,
    image: '/images/dashboard/pizza.jpg'
  },
  {
    id: 'acai-bowl',
    name: 'Berry Acai Bowl',
    category: 'Bowls',
    dietary: 'veg',
    price: 12,
    image: '/images/dashboard/poke.jpg'
  },
  {
    id: 'paella',
    name: 'Seafood Paella',
    category: 'Mains',
    dietary: 'non-veg',
    price: 26,
    image: '/images/dashboard/risotto.jpg'
  },
  {
    id: 'bacon-burger',
    name: 'Double Bacon Burger',
    category: 'Burgers',
    dietary: 'non-veg',
    price: 16.5,
    image: '/images/dashboard/burger.jpg'
  },
  {
    id: 'pepperoni',
    name: 'Spicy Pepperoni Pizza',
    category: 'Pizza',
    dietary: 'non-veg',
    price: 19,
    image: '/images/dashboard/pizza.jpg'
  },
  {
    id: 'tuna-poke',
    name: 'Tuna Sashimi Poke',
    category: 'Bowls',
    dietary: 'non-veg',
    price: 18,
    image: '/images/dashboard/poke.jpg'
  },
  {
    id: 'eggs-benedict',
    name: 'Classic Eggs Benedict',
    category: 'Mains',
    dietary: 'egg',
    price: 15,
    image: '/images/dashboard/burger.jpg'
  },
  {
    id: 'tamagoyaki',
    name: 'Japanese Tamagoyaki Bowl',
    category: 'Bowls',
    dietary: 'egg',
    price: 13.5,
    image: '/images/dashboard/poke.jpg'
  }
]

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const formatCents = (cents: number) => currency.format(cents / 100)
const tableOptions = Array.from({ length: 8 }, (_, index) => `T-${String(index + 1).padStart(2, '0')}`)

const orderTypes: { value: OrderType; label: string }[] = [
  { value: 'dine-in', label: 'Dine-in' },
  { value: 'takeaway', label: 'Takeaway' },
  { value: 'delivery', label: 'Delivery' }
]

const dietaryOptions: DietaryOption[] = [
  { id: 'veg', label: 'Vegetable', icon: Leaf },
  { id: 'non-veg', label: 'Non-vegetable', icon: Beef },
  { id: 'egg', label: 'Egg', icon: Egg }
]

const categories = [
  { value: 'all', label: 'All' },
  { value: 'Mains', label: 'Mains' },
  { value: 'Burgers', label: 'Burgers' },
  { value: 'Pizza', label: 'Pizza' },
  { value: 'Bowls', label: 'Bowls' },
  { value: 'Pasta', label: 'Pasta' },
  { value: 'Salads', label: 'Salads' },
  { value: 'Bakery', label: 'Bakery' }
] as const

const PosWorkspace = () => {
  const [search, setSearch] = useState('')
  const [selectedDietary, setSelectedDietary] = useState<DietaryType[]>([])
  const [orderLines, setOrderLines] = useState<CartItemSelection[]>([])
  const [activeProduct, setActiveProduct] = useState<PosProduct | null>(null)
  const [orderType, setOrderType] = useState<OrderType>('dine-in')
  const [table, setTable] = useState('T-01')
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState('')
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [ticket, setTicket] = useState<OrderTicket | null>(null)
  const [nextTicketNumber, setNextTicketNumber] = useState(1016)

  const toggleDietary = (type: DietaryType) => {
    setSelectedDietary(current => (current.includes(type) ? current.filter(item => item !== type) : [...current, type]))
  }

  const clearDietary = (type: DietaryType) => {
    setSelectedDietary(current => current.filter(item => item !== type))
  }

  const visibleItems = menuItems.filter(item => {
    const matchesSearch = `${item.name} ${item.category}`.toLowerCase().includes(search.trim().toLowerCase())
    const matchesDietary = selectedDietary.length === 0 || selectedDietary.includes(item.dietary)

    return matchesSearch && matchesDietary
  })

  const itemCount = orderLines.reduce((count, line) => count + line.quantity, 0)
  const subtotalCents = orderLines.reduce((total, line) => total + line.unitPriceCents * line.quantity, 0)
  const discountCents = appliedCoupon === 'SAVE10' ? Math.round(subtotalCents * 0.1) : 0
  const taxCents = Math.round((subtotalCents - discountCents) * 0.05)
  const totalCents = subtotalCents - discountCents + taxCents

  const addItem = (selection: CartItemSelection) => {
    setOrderLines(current => {
      const existing = current.find(line => line.key === selection.key)

      if (existing) {
        return current.map(line =>
          line.key === selection.key ? { ...line, quantity: line.quantity + selection.quantity } : line
        )
      }

      return [...current, selection]
    })
    setActiveProduct(null)
  }

  const increaseItem = (key: string) => {
    setOrderLines(current => current.map(line => (line.key === key ? { ...line, quantity: line.quantity + 1 } : line)))
  }

  const decreaseItem = (key: string) => {
    setOrderLines(current =>
      current.map(line => (line.key === key ? { ...line, quantity: Math.max(1, line.quantity - 1) } : line))
    )
  }

  const removeItem = (key: string) => {
    setOrderLines(current => current.filter(line => line.key !== key))
  }

  const clearOrder = () => {
    setOrderLines([])
    setCustomerName('')
    setPhone('')
    setDeliveryAddress('')
    setCouponCode('')
    setAppliedCoupon(null)
    setCouponError('')
    setPaymentOpen(false)
  }

  const confirmPayment = (method: PaymentMethod) => {
    if (orderLines.length === 0) return

    setTicket({
      number: nextTicketNumber,
      createdAt: new Date(),
      orderTypeLabel: orderTypes.find(type => type.value === orderType)?.label ?? 'Dine-in',
      table: orderType === 'dine-in' ? table : null,
      covers: 1,
      customerName: orderType === 'dine-in' ? '' : customerName.trim(),
      phone: orderType === 'dine-in' ? '' : phone.trim(),
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : '',
      lines: orderLines,
      subtotalCents,
      discountCents,
      taxCents,
      totalCents,
      paymentMethod: method
    })
    setNextTicketNumber(current => current + 1)
    clearOrder()
  }

  const startNewOrder = () => {
    clearOrder()
    setOrderType('dine-in')
    setTable('T-01')
    setTicket(null)
  }

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'SAVE10') {
      setCouponCode('SAVE10')
      setAppliedCoupon('SAVE10')
      setCouponError('')

      return
    }

    setCouponError('Code not recognized. Try SAVE10 for 10% off.')
  }

  const removeCoupon = () => {
    setCouponCode('')
    setAppliedCoupon(null)
    setCouponError('')
  }

  return (
    <div className='grid w-full flex-1 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_26rem]'>
      <main id='pos-main' aria-labelledby='new-sale-heading' className='bg-background min-w-0 p-4 sm:p-6'>
        <h1 id='new-sale-heading' className='sr-only'>
          Point of sale
        </h1>

        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex flex-wrap items-center gap-2'>
            {dietaryOptions.map(option => {
              const Icon = option.icon
              const isActive = selectedDietary.includes(option.id)

              return (
                <ButtonGroup key={option.id}>
                  <Button
                    variant={isActive ? 'secondary' : 'outline'}
                    size='sm'
                    onClick={() => toggleDietary(option.id)}
                  >
                    <Icon data-icon='inline-start' />
                    {option.label}
                  </Button>
                  {isActive && (
                    <Button
                      variant='secondary'
                      size='icon-sm'
                      onClick={() => clearDietary(option.id)}
                      aria-label={`Clear ${option.label} filter`}
                    >
                      <X />
                    </Button>
                  )}
                </ButtonGroup>
              )
            })}
          </div>

          <InputGroup className='sm:max-w-xs'>
            <InputGroupAddon>
              <SearchIcon aria-hidden='true' />
            </InputGroupAddon>
            <InputGroupInput
              type='search'
              aria-label='Search menu'
              placeholder='Search menu'
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </InputGroup>
        </div>

        <Separator className='my-5' />

        <Tabs defaultValue='all' className='gap-4'>
          <TabsList>
            {categories.map(cat => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(cat => {
            const categoryItems = visibleItems.filter(item => cat.value === 'all' || item.category === cat.value)

            return (
              <TabsContent key={cat.value} value={cat.value}>
                {categoryItems.length > 0 ? (
                  <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7'>
                    {categoryItems.map(item => (
                      <Card
                        key={item.id}
                        size='sm'
                        variant='interactive'
                        role='button'
                        tabIndex={0}
                        aria-label={`Customize ${item.name} for order`}
                        onClick={() => setActiveProduct(item)}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setActiveProduct(item)
                          }
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={480}
                          height={300}
                          className='aspect-8/5 w-full object-cover'
                        />
                        <CardHeader>
                          <CardTitle>{item.name}</CardTitle>
                          <CardDescription>{item.category}</CardDescription>
                        </CardHeader>
                        <CardFooter className='mt-auto justify-between'>
                          <span className='font-semibold tabular-nums'>{currency.format(item.price)}</span>
                          <span className='text-primary inline-flex items-center gap-1 font-medium'>
                            <PlusIcon className='size-4' aria-hidden='true' />
                            Add
                          </span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div
                    role='status'
                    className='text-muted-foreground rounded-(--radius) border border-dashed px-6 py-12 text-center text-sm'
                  >
                    No menu items match your search or filter.
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </main>

      <aside
        aria-labelledby='new-order-heading'
        className='bg-card flex min-h-0 flex-col border-t lg:sticky lg:top-[61px] lg:h-[calc(100dvh-61px)] lg:border-t-0 lg:border-l'
      >
        <div className='flex flex-col gap-4 border-b p-4 sm:p-6'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex items-center gap-2'>
              <h2 id='new-order-heading' className='text-base font-semibold'>
                New Order
              </h2>
              <Badge
                variant='default'
                aria-label={`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
                aria-live='polite'
              >
                {itemCount}
              </Badge>
            </div>
            <Button
              variant='ghost-destructive'
              size='icon-sm'
              aria-label='Clear entire order'
              disabled={orderLines.length === 0}
              onClick={clearOrder}
            >
              <Trash2Icon />
            </Button>
          </div>

          <ToggleGroup
            multiple={false}
            value={[orderType]}
            onValueChange={values => values[0] && setOrderType(values[0] as OrderType)}
            variant='outline'
            spacing={0}
            className='w-full'
            aria-label='Order type'
          >
            {orderTypes.map(type => (
              <ToggleGroupItem key={type.value} value={type.value} className='min-w-0 flex-1'>
                {type.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {orderType === 'dine-in' && (
            <Field className='gap-2'>
              <FieldLabel htmlFor='order-table'>Table</FieldLabel>
              <Select value={table} onValueChange={value => value && setTable(value)}>
                <SelectTrigger id='order-table' className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {tableOptions.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}

          {orderType !== 'dine-in' && (
            <FieldGroup className='gap-3'>
              <div className='flex flex-col gap-3 sm:flex-row'>
                <Field className='min-w-0 flex-1 gap-2'>
                  <FieldLabel htmlFor='order-customer-name'>Customer name</FieldLabel>
                  <Input
                    id='order-customer-name'
                    value={customerName}
                    onChange={event => setCustomerName(event.target.value)}
                    autoComplete='name'
                  />
                </Field>
                <Field className='min-w-0 flex-1 gap-2'>
                  <FieldLabel htmlFor='order-phone'>Phone</FieldLabel>
                  <Input
                    id='order-phone'
                    type='tel'
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                    autoComplete='tel'
                  />
                </Field>
              </div>
              {orderType === 'delivery' && (
                <Field className='gap-2'>
                  <FieldLabel htmlFor='order-delivery-address'>Delivery address</FieldLabel>
                  <Textarea
                    id='order-delivery-address'
                    value={deliveryAddress}
                    onChange={event => setDeliveryAddress(event.target.value)}
                    autoComplete='street-address'
                    rows={2}
                  />
                </Field>
              )}
            </FieldGroup>
          )}
        </div>

        <div className='min-h-0 flex-1 overflow-y-auto p-4 sm:p-6'>
          {orderLines.length > 0 ? (
            <ul className='flex flex-col gap-3'>
              {orderLines.map(line => (
                <li key={line.key}>
                  <Card size='sm' className='gap-3'>
                    <CardHeader className='flex flex-row items-start gap-3'>
                      <Image
                        src={line.product.image}
                        alt=''
                        width={56}
                        height={56}
                        className='size-14 shrink-0 rounded-md object-cover'
                      />
                      <div className='min-w-0 flex-1'>
                        <div className='flex items-start justify-between gap-2'>
                          <CardTitle className='text-sm leading-snug'>{line.product.name}</CardTitle>
                          <strong className='shrink-0 text-sm tabular-nums'>
                            {formatCents(line.unitPriceCents * line.quantity)}
                          </strong>
                        </div>
                        <Badge
                          variant={
                            line.product.dietary === 'veg'
                              ? 'success'
                              : line.product.dietary === 'egg'
                                ? 'warning'
                                : 'secondary'
                          }
                          className='mt-1'
                        >
                          {line.product.dietary === 'veg' ? 'Veg' : line.product.dietary === 'egg' ? 'Egg' : 'Non-Veg'}
                        </Badge>
                        {line.optionLabels.length > 0 && (
                          <CardDescription className='mt-1 text-xs'>{line.optionLabels.join(' · ')}</CardDescription>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <span className='text-muted-foreground text-xs'>{formatCents(line.unitPriceCents)} each</span>
                    </CardContent>
                    <CardFooter className='justify-between gap-3'>
                      <div className='flex items-center gap-2'>
                        <Button
                          variant='outline'
                          size='icon-sm'
                          aria-label={`Decrease ${line.product.name} quantity`}
                          disabled={line.quantity === 1}
                          onClick={() => decreaseItem(line.key)}
                        >
                          <MinusIcon />
                        </Button>
                        <span className='min-w-5 text-center text-sm font-medium tabular-nums'>{line.quantity}</span>
                        <Button
                          variant='outline'
                          size='icon-sm'
                          aria-label={`Increase ${line.product.name} quantity`}
                          onClick={() => increaseItem(line.key)}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                      <Button
                        variant='ghost-destructive'
                        size='icon-sm'
                        aria-label={`Delete ${line.product.name} from order`}
                        onClick={() => removeItem(line.key)}
                      >
                        <Trash2Icon />
                      </Button>
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <div className='text-muted-foreground flex min-h-48 flex-col items-center justify-center gap-2 rounded-(--radius) border border-dashed px-6 text-center'>
              <ShoppingBagIcon className='size-7' aria-hidden='true' />
              <p className='text-foreground text-sm font-medium'>No items yet</p>
              <p className='text-xs'>Choose a menu item to start this order.</p>
            </div>
          )}
        </div>

        <div className='flex shrink-0 flex-col gap-4 border-t p-4 sm:p-6'>
          <Field className='gap-2' data-invalid={Boolean(couponError) || undefined}>
            <FieldLabel htmlFor='order-coupon'>Discount / Coupon</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <TicketPercentIcon aria-hidden='true' />
              </InputGroupAddon>
              <InputGroupInput
                id='order-coupon'
                value={couponCode}
                onChange={event => {
                  setCouponCode(event.target.value)
                  setCouponError('')
                }}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !appliedCoupon && orderLines.length > 0) applyCoupon()
                }}
                readOnly={Boolean(appliedCoupon)}
                disabled={orderLines.length === 0}
                aria-invalid={Boolean(couponError)}
                placeholder='COUPON CODE'
                autoComplete='off'
              />
              <InputGroupAddon align='inline-end'>
                <InputGroupButton
                  variant='ghost'
                  disabled={!appliedCoupon && (!couponCode.trim() || orderLines.length === 0)}
                  onClick={appliedCoupon ? removeCoupon : applyCoupon}
                >
                  {appliedCoupon ? 'Remove' : 'Apply'}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldError>{couponError}</FieldError>
          </Field>

          <Separator />

          <div className='flex flex-col gap-2 text-sm'>
            <div className='flex items-center justify-between gap-3'>
              <span className='text-muted-foreground'>Sub total</span>
              <span className='tabular-nums'>{formatCents(subtotalCents)}</span>
            </div>
            {appliedCoupon && (
              <div className='flex items-center justify-between gap-3'>
                <span className='text-muted-foreground'>Discount ({appliedCoupon})</span>
                <span className='tabular-nums'>-{formatCents(discountCents)}</span>
              </div>
            )}
            <div className='flex items-center justify-between gap-3'>
              <span className='text-muted-foreground'>TAX (5%)</span>
              <span className='tabular-nums'>{formatCents(taxCents)}</span>
            </div>
            <div className='flex items-center justify-between gap-3 pt-1 font-semibold'>
              <span>Total</span>
              <strong className='text-lg tabular-nums'>{formatCents(totalCents)}</strong>
            </div>
          </div>
          <Button
            variant='default'
            size='lg'
            className='w-full'
            disabled={orderLines.length === 0}
            onClick={() => setPaymentOpen(true)}
          >
            Proceed to Payment
          </Button>
        </div>
      </aside>
      {paymentOpen && (
        <ConfirmPaymentDialog
          orderTypeLabel={orderTypes.find(type => type.value === orderType)?.label ?? 'Dine-in'}
          table={orderType === 'dine-in' ? table : null}
          customerName={orderType === 'dine-in' ? '' : customerName}
          phone={orderType === 'dine-in' ? '' : phone}
          deliveryAddress={orderType === 'delivery' ? deliveryAddress : ''}
          itemCount={itemCount}
          subtotalCents={subtotalCents}
          discountCents={discountCents}
          taxCents={taxCents}
          totalCents={totalCents}
          onClose={() => setPaymentOpen(false)}
          onConfirm={confirmPayment}
        />
      )}
      {ticket && <OrderTicketDialog ticket={ticket} onClose={() => setTicket(null)} onNewOrder={startNewOrder} />}
      {activeProduct && (
        <AddToCartDialog
          key={activeProduct.id}
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAdd={addItem}
        />
      )}
    </div>
  )
}

export default PosWorkspace
