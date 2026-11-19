import type { Metadata } from 'next'

import InventoryView from '@/views/inventory'

export const metadata: Metadata = {
  title: 'Inventory | RakPOS',
  description: 'Manage and track ingredient stock levels, low-stock alerts, and inventory valuation.'
}

const InventoryPage = () => <InventoryView />

export default InventoryPage
