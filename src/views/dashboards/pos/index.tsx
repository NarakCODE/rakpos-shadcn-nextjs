'use client'

// Third-party Imports
import { PlusIcon, DownloadIcon, CalendarIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'

import KpiCards from './kpi-cards'
import DailyGuestsBanner from './daily-guests-banner'
import RevenueOverview from './revenue-overview'
import OrderTypeDonut from './order-type-donut'
import TopSellingItems from './top-selling-items'
import RecentPayments from './recent-payments'
import CustomerRatings from './customer-ratings'
import RecentOrdersTable from './recent-orders-table'

export const DashboardPosView = () => {
  return (
    <div className='flex flex-col gap-6 p-4 sm:p-6 lg:p-8'>
      {/* Dashboard Top Header */}
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-extrabold tracking-tight md:text-3xl'>Restaurant POS Dashboard</h1>
          <p className='text-muted-foreground text-sm'>
            Real-time sales, order streams, table occupancy, and guest satisfaction metrics.
          </p>
        </div>

        {/* Quick Actions */}
        <div className='flex flex-wrap items-center gap-2.5'>
          <Button variant='outline' size='sm' className='h-9'>
            <span className='inline-flex items-center gap-1.5'>
              <CalendarIcon className='size-3.5' />
              <span>Today, 25 Sep</span>
            </span>
          </Button>

          <Button variant='outline' size='sm' className='h-9'>
            <span className='inline-flex items-center gap-1.5'>
              <DownloadIcon className='size-3.5' />
              <span>Export Report</span>
            </span>
          </Button>

          <Button size='sm' className='h-9'>
            <span className='inline-flex items-center gap-1.5'>
              <PlusIcon className='size-4' />
              <span>New Order</span>
            </span>
          </Button>
        </div>
      </div>

      {/* 1. Top KPI Summary Row (Quick Metrics Grid) */}
      <section aria-label='Top KPI Summary' className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <KpiCards />
        </div>
        <div className='lg:col-span-4'>
          <DailyGuestsBanner />
        </div>
      </section>

      {/* 2. Analytics & Distribution Row (Asymmetric 2:1 Split) */}
      <section aria-label='Analytics and Distribution' className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <RevenueOverview />
        </div>
        <div className='lg:col-span-4'>
          <OrderTypeDonut />
        </div>
      </section>

      {/* 3. Operational Feeds & Feedback Row (Equal 3-Column Split) */}
      <section
        aria-label='Operational Feeds and Feedback'
        className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12'
      >
        <div className='lg:col-span-4'>
          <TopSellingItems />
        </div>
        <div className='lg:col-span-4'>
          <RecentPayments />
        </div>
        <div className='md:col-span-2 lg:col-span-4'>
          <CustomerRatings />
        </div>
      </section>

      {/* 4. Transactions Data Row (Full-Width Span) */}
      <section aria-label='Transactions Data' className='w-full'>
        <RecentOrdersTable />
      </section>
    </div>
  )
}

export default DashboardPosView
