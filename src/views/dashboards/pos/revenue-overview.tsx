'use client'

// Third-party Imports
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const weeklyRevenueData = [
  { day: 'Mon', revenue: 680 },
  { day: 'Tue', revenue: 740 },
  { day: 'Wed', revenue: 820 },
  { day: 'Thu', revenue: 910 },
  { day: 'Fri', revenue: 1150 },
  { day: 'Sat', revenue: 1280 },
  { day: 'Sun', revenue: 880 }
]

const revenueChartConfig = {
  revenue: {
    label: 'Gross Sales ($)',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

export const RevenueOverview = () => {
  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='pb-2'>
        <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <CardTitle className='text-lg font-bold'>Revenue Overview</CardTitle>
            <CardDescription className='text-muted-foreground text-xs'>
              Weekly gross revenue breakdown across the past 7 days
            </CardDescription>
          </div>
          <p className='text-muted-foreground text-xs'>
            <span className='text-foreground font-medium'>+12%</span> vs last week
          </p>
        </div>

        <div className='pt-2'>
          <span className='text-3xl font-extrabold tracking-tight'>$6.4K</span>
        </div>
      </CardHeader>

      <CardContent className='space-y-4 pt-2'>
        {/* 7-Day Bar Chart */}
        <div className='w-full'>
          <ChartContainer config={revenueChartConfig} className='h-56 w-full'>
            <BarChart accessibilityLayer data={weeklyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray='3 3' className='stroke-border/40' />
              <XAxis dataKey='day' tickLine={false} axisLine={false} tickMargin={8} className='text-xs font-medium' />
              <YAxis tickLine={false} axisLine={false} tickFormatter={value => `$${value}`} className='text-xs' />
              <ChartTooltip
                cursor={{ fill: 'color-mix(in oklab, var(--primary) 8%, transparent)' }}
                content={
                  <ChartTooltipContent
                    formatter={value => (
                      <span className='text-foreground font-semibold'>${Number(value).toLocaleString()}</span>
                    )}
                  />
                }
              />
              <Bar dataKey='revenue' fill='var(--primary)' radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ChartContainer>
        </div>

        {/* 3 Sub-stat Cards */}
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
          <div className='bg-muted/40 rounded-lg border p-3'>
            <span className='text-muted-foreground text-xs font-medium uppercase'>Gross Revenue</span>
            <p className='text-lg font-bold tracking-tight'>$6,460</p>
          </div>

          <div className='bg-muted/40 rounded-lg border p-3'>
            <span className='text-muted-foreground text-xs font-medium uppercase'>Tax</span>
            <p className='text-lg font-bold tracking-tight'>$580</p>
          </div>

          <div className='bg-muted/40 rounded-lg border p-3'>
            <span className='text-muted-foreground text-xs font-medium uppercase'>Tips</span>
            <p className='text-lg font-bold tracking-tight'>$320</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RevenueOverview
