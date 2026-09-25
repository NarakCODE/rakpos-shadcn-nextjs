'use client'

// Third-party Imports
import { Pie, PieChart, Label, Cell } from 'recharts'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const orderTypeData = [
  { name: 'Dine-in', value: 58, count: 58, percent: '58%', color: 'var(--chart-1)' },
  { name: 'Takeout', value: 28, count: 28, percent: '28%', color: 'var(--chart-2)' },
  { name: 'Delivery', value: 14, count: 14, percent: '14%', color: 'var(--chart-3)' }
]

const orderTypeChartConfig = {
  dineIn: {
    label: 'Dine-in',
    color: 'var(--chart-1)'
  },
  takeout: {
    label: 'Takeout',
    color: 'var(--chart-2)'
  },
  delivery: {
    label: 'Delivery',
    color: 'var(--chart-3)'
  }
} satisfies ChartConfig

export const OrderTypeDonut = () => {
  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-bold'>Order Type</CardTitle>
        <CardDescription className='text-muted-foreground text-xs'>
          Distribution across dining channels today
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col items-center justify-between gap-6 pb-6'>
        {/* Donut Chart with Centered Metric */}
        <div className='relative flex h-52 w-full items-center justify-center'>
          <ChartContainer config={orderTypeChartConfig} className='h-52 w-52'>
            <PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <span className='font-semibold'>
                        {name}: {value} orders ({value}%)
                      </span>
                    )}
                  />
                }
              />
              <Pie
                data={orderTypeData}
                dataKey='value'
                nameKey='name'
                innerRadius={65}
                outerRadius={90}
                paddingAngle={3}
                cornerRadius={5}
              >
                {orderTypeData.map(entry => (
                  <Cell key={entry.name} fill={entry.color} stroke='transparent' />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 8}
                            className='fill-foreground text-2xl font-black'
                          >
                            100
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 14}
                            className='fill-muted-foreground text-xs font-medium tracking-wider uppercase'
                          >
                            Orders
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        {/* Legend */}
        <div className='bg-muted/30 grid w-full grid-cols-3 gap-2 rounded-lg border py-3 text-center'>
          {orderTypeData.map(item => (
            <div key={item.name} className='flex flex-col items-center gap-0.5 px-2'>
              <div className='flex items-center gap-1.5'>
                <span className='size-2 rounded-full' style={{ backgroundColor: item.color }} />
                <span className='text-muted-foreground text-xs font-medium'>{item.name}</span>
              </div>
              <p className='text-sm font-semibold'>
                {item.count} <span className='text-muted-foreground text-xs font-normal'>({item.percent})</span>
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderTypeDonut
