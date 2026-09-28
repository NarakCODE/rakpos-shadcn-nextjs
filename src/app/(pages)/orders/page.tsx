import type { Metadata } from 'next'

import RecentOrdersTable from '@/views/dashboards/pos/recent-orders-table'

export const metadata: Metadata = {
  title: 'Orders | RakPOS',
  description: 'Recent sample orders in the point of sale workspace.'
}

const OrdersPage = () => (
  <main id='pos-main' className='flex flex-col gap-6 px-4 py-6 sm:px-6 lg:py-8'>
    <div className='flex flex-col gap-1'>
      <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Orders</h1>
      <p className='text-muted-foreground text-sm'>Recent sample orders. New sales are not saved in this demo.</p>
    </div>
    <RecentOrdersTable />
  </main>
)

export default OrdersPage
