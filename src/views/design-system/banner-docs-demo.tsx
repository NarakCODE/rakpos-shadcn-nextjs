'use client'

import { useState } from 'react'

import { SparklesIcon } from 'lucide-react'

import { Banner } from '@/components/ui/banner'
import type { BannerBuiltinIcon, BannerColor } from '@/components/ui/banner'
import { Button } from '@/components/ui/button'

const COLOR_VARIANTS: Array<{
  color: BannerColor
  icon: BannerBuiltinIcon
  title: string
  description: string
}> = [
  {
    color: 'gray',
    icon: 'info',
    title: 'Neutral gray banner',
    description: 'Default low-emphasis surface for general workspace notices and tips.'
  },
  {
    color: 'white',
    icon: 'info',
    title: 'Neutral white banner',
    description: 'Primary surface contrast for banners placed on tinted or secondary backgrounds.'
  },
  {
    color: 'blue',
    icon: 'info',
    title: 'Scheduled terminal update',
    description: 'Point-of-sale terminals will sync menu changes automatically at midnight.'
  },
  {
    color: 'green',
    icon: 'success',
    title: 'Settlement batch completed',
    description: 'All 42 card transactions from the evening shift have been reconciled.'
  },
  {
    color: 'orange',
    icon: 'warning',
    title: 'Receipt printer paper low',
    description: 'Kitchen printer station 2 is running low on thermal paper rolls.'
  },
  {
    color: 'red',
    icon: 'error',
    title: 'Payment gateway offline',
    description: 'Card reader connection timed out. Retry connection or switch to offline mode.'
  }
]

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <h2 className='text-text-primary text-title-mini-semibold'>{title}</h2>
      <p className='text-text-secondary text-body-small-regular'>{description}</p>
    </div>
  )
}

export function BannerDocsDemo() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <section aria-label='Banner demo preview' className='bg-bg-primary shadow-low flex flex-col gap-6 rounded-xl p-6'>
      <div className='flex flex-col gap-4'>
        <SectionHeading
          title='Colors (6)'
          description='Neutral and semantic tinted surfaces paired with built-in status icons.'
        />

        <div className='flex flex-col gap-3'>
          {COLOR_VARIANTS.map(item => (
            <Banner
              key={item.color}
              color={item.color}
              icon={item.icon}
              role={item.color === 'red' ? 'alert' : 'status'}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <div className='border-border-gray flex flex-col gap-4 border-t pt-6'>
        <SectionHeading
          title='Colored titles & custom icons (3)'
          description='Emphasize the title with semantic accent colors or pair neutral surfaces with accented icons.'
        />

        <div className='flex flex-col gap-3'>
          <Banner
            color='blue'
            icon='info'
            coloredTitle
            title='Emphasized accent title'
            description='Uses coloredTitle to apply the blue emphasis token to the heading.'
          />

          <Banner
            color='gray'
            icon='warning'
            iconColor='orange'
            title='Neutral surface with accented icon'
            description='Keeps a calm gray fill while highlighting the warning glyph in orange.'
          />

          <Banner
            color='white'
            icon={<SparklesIcon />}
            iconColor='blue'
            title='Custom icon element'
            description='Pass any Lucide icon node to replace the four built-in status glyphs.'
          />
        </div>
      </div>

      <div className='border-border-gray flex flex-col gap-4 border-t pt-6'>
        <SectionHeading
          title='Actions & dismissible (2)'
          description='Combine primary, secondary, and dismiss controls with top or center alignment.'
        />

        <div className='flex flex-col gap-3'>
          {dismissed ? (
            <div className='flex items-center justify-between gap-3 py-1'>
              <span className='text-text-secondary text-body-small-regular'>Banner dismissed.</span>
              <Button type='button' variant='outline' size='sm' onClick={() => setDismissed(false)}>
                Restore banner
              </Button>
            </div>
          ) : (
            <Banner
              color='green'
              icon='success'
              coloredTitle
              title='New floor plan layout published'
              onDismiss={() => setDismissed(true)}
              primaryAction={
                <Button type='button' variant='secondary' size='xs'>
                  View floor plan
                </Button>
              }
            />
          )}

          <Banner
            color='orange'
            icon='warning'
            actionsAlignment='start'
            title='3 inventory items below par level'
            description='Espresso beans, oat milk, and takeaway cups need restocking before the morning rush.'
            secondaryAction={
              <Button type='button' variant='ghost' size='xs'>
                Snooze
              </Button>
            }
            primaryAction={
              <Button type='button' variant='secondary' size='xs'>
                Create purchase order
              </Button>
            }
          />
        </div>
      </div>

      <div className='border-border-gray flex flex-col gap-4 border-t pt-6'>
        <SectionHeading
          title='Orientation (2)'
          description='Horizontal row layout for wide banners or vertical stack for narrow panels.'
        />

        <div className='grid grid-cols-1 items-start gap-4 lg:grid-cols-2'>
          <Banner
            color='gray'
            icon='info'
            orientation='horizontal'
            title='Horizontal orientation'
            description='Icon, copy, and action controls align across a single row.'
            primaryAction={
              <Button type='button' variant='outline' size='xs'>
                Details
              </Button>
            }
          />

          <Banner
            color='gray'
            icon='info'
            orientation='vertical'
            title='Vertical orientation'
            description='Stacks the icon, message, and action buttons vertically for sidebars and narrow cards.'
            secondaryAction={
              <Button type='button' variant='ghost' size='xs'>
                Later
              </Button>
            }
            primaryAction={
              <Button type='button' variant='secondary' size='xs'>
                Review settings
              </Button>
            }
          />
        </div>
      </div>
    </section>
  )
}
