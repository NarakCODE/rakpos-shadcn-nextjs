'use client'

// Third-party Imports
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Rating } from '@/components/ui/rating'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const ratingsTrendData = [
  { month: 'Feb', rating: 4.1 },
  { month: 'Mar', rating: 4.2 },
  { month: 'Apr', rating: 4.0 },
  { month: 'May', rating: 4.3 },
  { month: 'Jun', rating: 4.4 },
  { month: 'Jul', rating: 4.5 }
]

const ratingsChartConfig = {
  rating: {
    label: 'Rating Score',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

export const CustomerRatings = () => {
  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='pb-2'>
        <CardTitle>
          <span className='text-lg font-bold'>Customer Ratings</span>
        </CardTitle>
        <CardDescription>
          <span className='text-muted-foreground text-xs'>Average rating and 6-month trend</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='space-y-4'>
          {/* Rating Score Summary */}
          <div className='bg-muted/40 flex items-center justify-between rounded-(--radius) border p-3.5'>
            <div className='space-y-0.5'>
              <div className='flex items-baseline gap-1.5'>
                <span className='text-2xl font-bold tracking-tight'>4.5</span>
                <span className='text-muted-foreground text-xs'>out of 5.0</span>
              </div>
              <p className='text-muted-foreground text-xs'>
                <span className='text-foreground font-medium'>+0.3</span> MoM
              </p>
            </div>

            <Rating value={4.5} readOnly precision={0.5} size={16} />
          </div>

          {/* 6-Month Trend Chart */}
          <div className='w-full'>
            <ChartContainer config={ratingsChartConfig} className='h-36 w-full'>
              <AreaChart
                accessibilityLayer
                data={ratingsTrendData}
                margin={{ top: 8, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id='ratingGradient' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='var(--primary)' stopOpacity={0.3} />
                    <stop offset='95%' stopColor='var(--primary)' stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray='3 3' className='stroke-border/40' />
                <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={6} className='text-xs' />
                <YAxis
                  domain={[3.5, 5.0]}
                  tickLine={false}
                  axisLine={false}
                  ticks={[3.5, 4.0, 4.5, 5.0]}
                  className='text-xs'
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={value => <span className='text-foreground font-semibold'>{value} / 5.0</span>}
                    />
                  }
                />
                <Area
                  type='monotone'
                  dataKey='rating'
                  stroke='var(--primary)'
                  strokeWidth={2}
                  fillOpacity={1}
                  fill='url(#ratingGradient)'
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerRatings
