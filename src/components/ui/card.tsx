import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const cardVariants = cva(
  [
    'group/card rounded-xl text-body-small-regular text-text-primary relative flex flex-col gap-(--card-spacing) overflow-hidden',
    '[--card-spacing:--spacing(6)] data-[size=sm]:[--card-spacing:--spacing(4)]',
    '*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl has-[>img:first-child]:pt-0'
  ],
  {
    variants: {
      background: {
        primary: 'bg-bg-primary',
        secondary: 'bg-bg-secondary',
        tertiary: 'bg-bg-tertiary',
        quaternary: 'bg-bg-quaternary'
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6'
      },
      variant: {
        default: 'shadow-medium',
        flat: 'border-border-gray border shadow-none',
        interactive: [
          'shadow-medium cursor-pointer select-none outline-none',
          'transition-[box-shadow,scale,transform] duration-150 ease-out',
          '[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-medium-hover focus-visible:shadow-medium-focus',
          'active:not-has-[button:active,a:active,[role=button]:active]:scale-[0.99]',
          'motion-reduce:transition-shadow motion-reduce:active:scale-100'
        ],
        subdued: 'shadow-medium opacity-60'
      }
    },
    defaultVariants: {
      background: 'primary',
      padding: 'none',
      variant: 'default'
    }
  }
)

type CardProps = React.ComponentProps<'div'> &
  VariantProps<typeof cardVariants> & {
    size?: 'default' | 'sm'
  }

function Card({
  className,
  background = 'primary',
  padding = 'none',
  size = 'default',
  variant = 'default',
  ...props
}: CardProps) {
  return (
    <div
      data-slot='card'
      data-background={background}
      data-padding={padding}
      data-size={size}
      data-variant={variant}
      className={cn(cardVariants({ background, padding, variant }), className)}
      {...props}
    />
  )
}

function CardHeader({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & { variant?: 'default' | 'divided' }) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        'group/card-header rounded-t-xl @container/card-header grid auto-rows-min items-start gap-1',
        'group-data-[padding=none]/card:px-(--card-spacing) group-data-[padding=none]/card:first:pt-(--card-spacing) group-data-[padding=none]/card:last:pb-(--card-spacing)',
        'has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
        '[.border-b]:pb-(--card-spacing)',
        variant === 'divided' && 'border-border-gray border-b',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn(
        'text-title-mini-semibold text-text-primary group-data-[size=sm]/card:text-body-regular-semibold',
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-body-small-regular text-text-secondary', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn(
        'group-data-[padding=none]/card:px-(--card-spacing) group-data-[padding=none]/card:first:pt-(--card-spacing) group-data-[padding=none]/card:last:pb-(--card-spacing)',
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn(
        'border-border-gray rounded-b-xl flex items-center [.border-t]:pt-(--card-spacing)',
        'group-data-[padding=none]/card:px-(--card-spacing) group-data-[padding=none]/card:first:pt-(--card-spacing) group-data-[padding=none]/card:last:pb-(--card-spacing)',
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, cardVariants }
export type { CardProps }
