export type OrderFulfillmentType = 'Dine-in' | 'Dine-In' | 'Takeaway' | 'Delivery'

export type OrderStatus = 'Preparing' | 'New' | 'Ready' | 'Served' | 'Cancelled'

export type OrderItemLine = {
  id: string
  name: string
  quantity: number
  price: number
  modifiers?: string
  image?: string
  notes?: string
}

export type RestaurantOrder = {
  id: string
  orderNumber: string
  type: OrderFulfillmentType
  status: OrderStatus
  forDestination: string
  locationSubtitle: string
  customerName?: string
  tableNumber?: string
  coverCount?: number
  itemCount: number
  items: OrderItemLine[]
  subtotal: number
  taxRate?: number
  tax: number
  discount?: number
  total: number
  placedAt: string
  notes?: string
}
