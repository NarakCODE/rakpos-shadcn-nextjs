import { CheckIcon, CircleIcon, InfoIcon, PaperclipIcon, SparklesIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import type { BadgeFontWeight, BadgeSize, BadgeType, BadgeVariant } from '@/components/ui/badge'

const BADGE_TYPES: Array<{ type: BadgeType; label: string }> = [
  { type: 'default', label: 'Default' },
  { type: 'gray', label: 'Gray' },
  { type: 'red', label: 'Red' },
  { type: 'blue', label: 'Blue' },
  { type: 'green', label: 'Green' },
  { type: 'amber', label: 'Amber' },
  { type: 'yellow', label: 'Yellow' },
  { type: 'purple', label: 'Purple' },
  { type: 'orange', label: 'Orange' },
  { type: 'cyan', label: 'Cyan' }
]

const VARIANT_SECTIONS: Array<{ variant: BadgeVariant; label: string; note: string }> = [
  {
    variant: 'default',
    label: 'Default (bordered pill)',
    note: 'rounded-full with semantic border, muted fill, and emphasis text'
  },
  {
    variant: 'agent-builder',
    label: 'Agent Builder (borderless)',
    note: 'rounded-md borderless surface using workflow faint fills (yellow falls back to amber)'
  }
]

const SIZES: Array<{ size: BadgeSize; label: string }> = [
  { size: 'micro', label: 'Micro (10px)' },
  { size: 'small', label: 'Small (12px)' },
  { size: 'default', label: 'Default (12px)' },
  { size: 'large', label: 'Large (13px)' }
]

const FONT_WEIGHTS: Array<{ fontWeight: BadgeFontWeight; label: string }> = [
  { fontWeight: 'medium', label: 'Medium weight' },
  { fontWeight: 'regular', label: 'Regular weight' }
]

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <h2 className='text-text-primary text-title-mini-semibold'>{title}</h2>
      <p className='text-text-secondary text-body-small-regular'>{description}</p>
    </div>
  )
}

export function BadgeDocsDemo() {
  return (
    <section aria-label='Badge demo preview' className='bg-bg-primary shadow-low flex flex-col gap-6 rounded-xl p-6'>
      <div className='flex flex-col gap-4'>
        <SectionHeading
          title='Types (10) & Variants (2)'
          description='Color treatments across default bordered pills and borderless Agent Builder badges.'
        />
        {VARIANT_SECTIONS.map(section => (
          <div key={section.variant} className='flex flex-col gap-2'>
            <div className='flex flex-wrap items-baseline gap-2'>
              <span className='text-text-primary text-body-small-medium'>{section.label}</span>
              <span className='text-text-tertiary text-body-mini-regular'>{section.note}</span>
            </div>
            <div className='flex flex-wrap items-center gap-2'>
              {BADGE_TYPES.map(item => (
                <Badge key={`${section.variant}-${item.type}`} variant={section.variant} type={item.type} title={item.label} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='border-border-gray grid grid-cols-1 gap-6 border-t pt-6 lg:grid-cols-2'>
        <div className='flex flex-col gap-3'>
          <SectionHeading
            title='Sizes (4)'
            description='Composite typography scale from micro (10px) up to large (13px).'
          />
          <div className='flex flex-wrap items-center gap-2'>
            {SIZES.map(item => (
              <Badge key={item.size} type='gray' size={item.size} title={item.label} />
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <SectionHeading
            title='Font weights (2)'
            description='Selects the matching medium or regular composite type token for each size.'
          />
          <div className='flex flex-wrap items-center gap-2'>
            {FONT_WEIGHTS.map(item => (
              <Badge key={item.fontWeight} type='blue' fontWeight={item.fontWeight} title={item.label} />
            ))}
          </div>
        </div>
      </div>

      <div className='border-border-gray grid grid-cols-1 gap-6 border-t pt-6 lg:grid-cols-2'>
        <div className='flex flex-col gap-3'>
          <SectionHeading
            title='With leading icon (iconStart)'
            description='Icons rendered via iconStart automatically inherit the type tint and size.'
          />
          <div className='flex flex-wrap items-center gap-2'>
            <Badge type='green' iconStart={<CheckIcon />} title='Completed' />
            <Badge type='amber' iconStart={<CircleIcon />} title='In progress' />
            <Badge type='purple' variant='agent-builder' iconStart={<SparklesIcon />} title='Agent node' />
            <Badge type='gray' size='large' iconStart={<PaperclipIcon />} title='Attachment.pdf' />
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <SectionHeading
            title='With tooltip'
            description='Pass a tooltip string to wrap the badge in a hover/focus Tooltip.'
          />
          <div className='flex flex-wrap items-center gap-2'>
            <Badge
              type='cyan'
              iconStart={<InfoIcon />}
              title='Hover for details'
              tooltip='Synced 2 minutes ago from primary POS terminal'
            />
            <Badge
              type='orange'
              variant='agent-builder'
              title='Rate limited'
              tooltip=' Retrying automatically in 30 seconds'
            />
          </div>
        </div>
      </div>

      <div className='border-border-gray grid grid-cols-1 gap-6 border-t pt-6 lg:grid-cols-2'>
        <div className='flex flex-col gap-3'>
          <SectionHeading
            title='Interactive'
            description='Rendered as a button or link via the render prop, with active scale(0.97) press feedback.'
          />
          <div className='flex flex-wrap items-center gap-2'>
            <Badge type='default' title='Clickable' render={<button type='button' />} />
            <Badge type='blue' iconStart={<SparklesIcon />} title='Filter by blue' render={<button type='button' />} />
            <Badge type='purple' variant='agent-builder' title='Link badge' render={<a href='#badge' />} />
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <SectionHeading
            title='Truncation'
            description='Labels truncate at max-w-32 by default; override via titleClassName.'
          />
          <div className='flex flex-wrap items-center gap-2'>
            <Badge
              type='purple'
              title='Very long category name that keeps going'
              tooltip='Very long category name that keeps going'
            />
            <Badge type='purple' title='Full label without truncation' titleClassName='max-w-none' />
          </div>
        </div>
      </div>
    </section>
  )
}
