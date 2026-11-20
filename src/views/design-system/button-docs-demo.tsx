import { ArrowLeftIcon, PlusIcon, SendIcon, XIcon } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'

import { Button } from '@/components/ui/button'
import type { buttonVariants } from '@/components/ui/button'

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>
type ButtonShape = NonNullable<VariantProps<typeof buttonVariants>['shape']>
type ButtonMotion = NonNullable<VariantProps<typeof buttonVariants>['motion']>

const VARIANT_GROUPS: Array<{
  label: string
  items: Array<{ variant: ButtonVariant; label: string }>
}> = [
  {
    label: 'Core & high-contrast',
    items: [
      { variant: 'default', label: 'Primary' },
      { variant: 'pos-action', label: 'Checkout' },
      { variant: 'secondary', label: 'Secondary' },
      { variant: 'outline', label: 'Outline' },
      { variant: 'soft', label: 'Soft' },
      { variant: 'link', label: 'Inline link' }
    ]
  },
  {
    label: 'Ghost & navigation',
    items: [
      { variant: 'ghost', label: 'Ghost' },
      { variant: 'ghost-transparent', label: 'Ghost transparent' },
      { variant: 'ghost-muted', label: 'Ghost muted' },
      { variant: 'ghost-muted-transparent', label: 'Muted transparent' },
      { variant: 'nav', label: 'Navigation' }
    ]
  },
  {
    label: 'Destructive & connection',
    items: [
      { variant: 'destructive', label: 'Destructive' },
      { variant: 'outline-destructive', label: 'Outline destructive' },
      { variant: 'outline-destructive-text', label: 'Destructive text outline' },
      { variant: 'ghost-destructive', label: 'Ghost destructive' },
      { variant: 'ghost-destructive-text', label: 'Destructive text ghost' },
      { variant: 'ghost-connected', label: 'Connected' },
      { variant: 'ghost-disconnected', label: 'Disconnected' }
    ]
  },
  {
    label: 'Specialized',
    items: [
      { variant: 'outline-add', label: 'Add item' },
      { variant: 'account-remove', label: 'Remove account' }
    ]
  }
]

const TEXT_SIZES: Array<{ size: ButtonSize; label: string; variant?: ButtonVariant }> = [
  { size: 'xs', label: 'Extra small' },
  { size: 'sm', label: 'Small' },
  { size: 'default', label: 'Default size' },
  { size: 'lg', label: 'Large' },
  { size: 'nav', label: 'Navigation size', variant: 'nav' },
  { size: 'mail-send', label: 'Send message', variant: 'pos-action' },
  { size: 'mail-back', label: 'Back', variant: 'ghost' },
  { size: 'label-option', label: 'Label option', variant: 'outline' },
  { size: 'account-add', label: 'Add account', variant: 'outline-add' },
  { size: 'spaced', label: 'Spaced action', variant: 'secondary' }
]

const ICON_SIZES: Array<{ size: ButtonSize; label: string; variant?: ButtonVariant }> = [
  { size: 'account-remove', label: 'Remove chip', variant: 'account-remove' },
  { size: 'icon-xs', label: 'Extra small icon', variant: 'outline' },
  { size: 'icon-sm', label: 'Small icon', variant: 'secondary' },
  { size: 'icon', label: 'Default icon', variant: 'default' },
  { size: 'icon-lg', label: 'Large icon', variant: 'pos-action' }
]

const SHAPES: Array<{ shape: ButtonShape; label: string }> = [
  { shape: 'default', label: 'Default radius' },
  { shape: 'round', label: 'Round pill' },
  { shape: 'tile', label: 'Tile corner' },
  { shape: 'start-flat', label: 'Flat start edge' }
]

const MOTIONS: Array<{ motion: ButtonMotion; label: string }> = [
  { motion: 'default', label: 'Default press' },
  { motion: 'slow', label: 'Slow transition' },
  { motion: 'colors', label: 'Color transition' }
]

export function ButtonDocsDemo() {
  return (
    <section aria-label='Button demo preview' className='bg-bg-primary shadow-low flex flex-col gap-6 rounded-xl p-6'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-0.5'>
          <h2 className='text-text-primary text-title-mini-semibold'>Variants (20)</h2>
          <p className='text-text-secondary text-body-small-regular'>
            All semantic, outline, ghost, destructive, and domain button variants on the primary surface.
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          {VARIANT_GROUPS.map(group => (
            <div key={group.label} className='flex flex-col gap-2'>
              <span className='text-text-tertiary text-body-mini-medium'>{group.label}</span>
              <div className='flex flex-wrap items-center gap-3'>
                {group.items.map(item => (
                  <Button key={item.variant} type='button' variant={item.variant}>
                    {item.label}
                  </Button>
                ))}
                {group.label === 'Ghost & navigation' ? (
                  <Button type='button' variant='nav' data-active='true'>
                    Active navigation
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='border-border-gray flex flex-col gap-4 border-t pt-6'>
        <div className='flex flex-col gap-0.5'>
          <h2 className='text-text-primary text-title-mini-semibold'>Sizes (15)</h2>
          <p className='text-text-secondary text-body-small-regular'>
            Text, domain spacing presets, and square icon sizes.
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-3'>
          {TEXT_SIZES.map(item => (
            <Button key={item.size} type='button' size={item.size} variant={item.variant ?? 'default'}>
              {item.size === 'mail-back' ? <ArrowLeftIcon data-icon='inline-start' aria-hidden='true' /> : null}
              {item.size === 'mail-send' ? <SendIcon data-icon='inline-start' aria-hidden='true' /> : null}
              {item.label}
            </Button>
          ))}
        </div>

        <div className='flex flex-wrap items-center gap-4'>
          {ICON_SIZES.map(item => (
            <div key={item.size} className='flex items-center gap-2'>
              <Button type='button' size={item.size} variant={item.variant ?? 'default'} aria-label={item.label}>
                {item.size === 'account-remove' ? <XIcon aria-hidden='true' /> : <PlusIcon aria-hidden='true' />}
              </Button>
              <span className='text-text-tertiary text-body-mini-regular'>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='border-border-gray grid grid-cols-1 gap-6 border-t pt-6 lg:grid-cols-2'>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-0.5'>
            <h2 className='text-text-primary text-title-mini-semibold'>Shapes (4)</h2>
            <p className='text-text-secondary text-body-small-regular'>
              Border-radius presets built on the active radius scale.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            {SHAPES.map(item => (
              <Button key={item.shape} type='button' shape={item.shape}>
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-0.5'>
            <h2 className='text-text-primary text-title-mini-semibold'>Motion (3)</h2>
            <p className='text-text-secondary text-body-small-regular'>
              Press and hold to compare transition and scale(0.97) feedback.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            {MOTIONS.map(item => (
              <Button key={item.motion} type='button' motion={item.motion}>
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
