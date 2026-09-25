import type { Metadata } from 'next'
import Link from 'next/link'

// Third-party Imports
import { ArrowDownIcon } from 'lucide-react'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import KpiCards from '@/views/dashboards/pos/kpi-cards'
import DailyGuestsBanner from '@/views/dashboards/pos/daily-guests-banner'
import RevenueOverview from '@/views/dashboards/pos/revenue-overview'
import OrderTypeDonut from '@/views/dashboards/pos/order-type-donut'
import TopSellingItems from '@/views/dashboards/pos/top-selling-items'
import RecentPayments from '@/views/dashboards/pos/recent-payments'
import CustomerRatings from '@/views/dashboards/pos/customer-ratings'
import RecentOrdersTable from '@/views/dashboards/pos/recent-orders-table'
import OrdersDashboard from '@/views/dashboards/orders-dashboard'

export const metadata: Metadata = {
  title: 'Dashboard - Restaurant POS',
  description: 'Sample restaurant sales, order, table, and guest metrics.'
}

const DashboardPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      {/* Header with entrance animation */}
      <div className='motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 fill-mode-both flex flex-col justify-between gap-4 duration-200 ease-out motion-reduce:animate-none md:flex-row md:items-center'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-extrabold tracking-tight md:text-3xl'>Restaurant POS Dashboard</h1>
          <p className='text-muted-foreground text-sm'>Sales, orders, tables, and guest feedback at a glance.</p>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          <Badge variant='secondary'>
            <span className='inline-flex items-center gap-1.5 py-0.5'>
              <span className='size-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none' />
              Sample data
            </span>
          </Badge>
          <Button
            size='lg'
            className='group h-11 transition-transform duration-150 ease-out active:scale-[0.98] motion-reduce:transform-none sm:h-10'
            render={<Link href='#recent-orders' />}
            nativeButton={false}
          >
            View recent orders
            <ArrowDownIcon
              data-icon='inline-end'
              className='transition-transform duration-150 ease-out group-hover:translate-y-0.5 motion-reduce:transform-none'
            />
          </Button>
        </div>
      </div>

      <section
        aria-labelledby='overview-heading'
        className='motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 fill-mode-both grid grid-cols-1 gap-6 duration-200 ease-out motion-reduce:animate-none 2xl:grid-cols-12'
        style={{ animationDelay: '50ms' }}
      >
        <h2 id='overview-heading' className='sr-only'>
          Overview
        </h2>
        <div className='min-w-0 2xl:col-span-8'>
          <KpiCards />
        </div>
        <div className='min-w-0 2xl:col-span-4'>
          <DailyGuestsBanner />
        </div>
      </section>

      <section
        aria-labelledby='sales-heading'
        className='motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 fill-mode-both grid grid-cols-1 gap-6 duration-200 ease-out motion-reduce:animate-none xl:grid-cols-12'
        style={{ animationDelay: '100ms' }}
      >
        <h2 id='sales-heading' className='sr-only'>
          Sales and order types
        </h2>
        <div className='min-w-0 xl:col-span-8'>
          <RevenueOverview />
        </div>
        <div className='min-w-0 xl:col-span-4'>
          <OrderTypeDonut />
        </div>
      </section>

      <section
        aria-labelledby='operations-heading'
        className='motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 fill-mode-both grid grid-cols-1 gap-6 duration-200 ease-out motion-reduce:animate-none md:grid-cols-2 2xl:grid-cols-12'
        style={{ animationDelay: '150ms' }}
      >
        <h2 id='operations-heading' className='sr-only'>
          Operations and feedback
        </h2>
        <div className='min-w-0 2xl:col-span-4'>
          <TopSellingItems />
        </div>
        <div className='min-w-0 2xl:col-span-4'>
          <RecentPayments />
        </div>
        <div className='min-w-0 md:col-span-2 2xl:col-span-4'>
          <CustomerRatings />
        </div>
      </section>

      <section aria-labelledby='order-analytics-heading' className='flex flex-col gap-6'>
        <h2 id='order-analytics-heading' className='text-xl font-semibold tracking-tight'>
          Orders and transactions
        </h2>
        <OrdersDashboard />
      </section>

      <section
        id='recent-orders'
        aria-labelledby='recent-orders-heading'
        className='motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 fill-mode-both w-full scroll-mt-20 scroll-smooth duration-200 ease-out motion-reduce:animate-none'
        style={{ animationDelay: '200ms' }}
      >
        <h2 id='recent-orders-heading' className='sr-only'>
          Recent orders
        </h2>
        <RecentOrdersTable />
      </section>
    </div>
  )
}

export default DashboardPage
