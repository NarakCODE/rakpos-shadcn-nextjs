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
          <span className='text-muted-foreground text-body-mini-medium'>Daily Guests</span>
          <div className='text-title-small-semibold tabular-nums'>1.2K</div>
        </div>

        <p className='text-muted-foreground text-body-mini-regular flex items-center gap-1'>
          <span className='text-text-green inline-flex items-center gap-0.5 font-semibold'>
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
