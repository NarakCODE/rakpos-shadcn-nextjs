import type { Metadata } from 'next'

import OrdersView from '@/views/orders'

export const metadata: Metadata = {
  title: 'Orders | RakPOS',
  description: 'Manage and track all restaurant orders across dining channels.'
}

const OrdersPage = () => <OrdersView />

export default OrdersPage
