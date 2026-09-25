'use client'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'

export type KpiMetric = {
  id: string
  title: string
  value: string
  change: string
  timeframe: string
}

const kpiMetrics: KpiMetric[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$4.8K',
    change: '+12%',
    timeframe: 'Today'
  },
  {
    id: 'orders',
    title: 'Total Orders',
    value: '142',
    change: '+8%',
    timeframe: 'Today'
  },
  {
    id: 'tables',
    title: 'Active Tables',
    value: '12 / 20',
    change: '+5%',
    timeframe: 'Right now'
  },
  {
    id: 'aov',
    title: 'Avg Order Value',
    value: '$34.2',
    change: '-3%',
    timeframe: 'Today'
  }
]

export const KpiCards = () => {
  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
      {kpiMetrics.map(item => (
        <Card key={item.id} className='h-full'>
          <CardContent className='flex h-full flex-col justify-between space-y-1.5 p-5'>
            <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>{item.title}</span>
            <div className='text-2xl font-bold tracking-tight'>{item.value}</div>
            <p className='text-muted-foreground text-xs'>
              <span className='text-foreground font-medium'>{item.change}</span> {item.timeframe}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default KpiCards
