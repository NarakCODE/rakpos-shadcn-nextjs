'use client'

// Third-party Imports
import { ArrowUpRightIcon } from 'lucide-react'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'

export const DailyGuestsBanner = () => {
  return (
    <Card className='relative h-full overflow-hidden'>
      {/* Decorative 3D people illustration banner full width */}
      <div
        className='absolute inset-0 bg-cover bg-center opacity-35 dark:opacity-25'
        style={{ backgroundImage: `url('/images/dashboard/daily-guests.jpg')` }}
      />
      <div className='from-card via-card/85 to-card/40 absolute inset-0 bg-gradient-to-r' />

      <CardContent className='relative z-10 flex h-full flex-col justify-between space-y-1.5 p-5'>
        <div>
          <span className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>Daily Guests</span>
          <div className='text-2xl font-bold tracking-tight tabular-nums'>1.2K</div>
        </div>

        <p className='text-muted-foreground flex items-center gap-1 text-xs'>
          <span className='inline-flex items-center gap-0.5 font-semibold text-emerald-600 dark:text-emerald-400'>
            <ArrowUpRightIcon className='size-3.5 shrink-0' />
            +9.2%
          </span>{' '}
          <span>This week</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default DailyGuestsBanner
