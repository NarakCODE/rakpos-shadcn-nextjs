import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  [
    'group/badge inline-flex w-fit max-w-full shrink-0 items-center justify-center overflow-hidden whitespace-nowrap',
    'transition-[color,background-color,border-color,opacity,transform] duration-150 ease-out',
    'focus-visible:shadow-focus focus-visible:outline-none',
    '[&:is(a,button)]:cursor-pointer [&:is(a,button)]:select-none [&:is(a,button)]:active:scale-[0.97]'
  ],
  {
    variants: {
      variant: {
        default: 'rounded-full border',
        'agent-builder': 'rounded-md border-0'
      },
      size: {
        micro: 'gap-1 px-1 py-0',
        small: 'gap-1 px-1.5 py-px',
        default: 'gap-1.5 px-1.5 py-0.5',
        large: 'gap-1.5 px-2 py-1'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

const badgeIconVariants = cva(
  'pointer-events-none inline-flex shrink-0 items-center justify-center [&_svg]:size-full [&_svg]:shrink-0',
  {
    variants: {
      size: {
        micro: 'size-2.5',
        small: 'size-3',
        default: 'size-3',
        large: 'size-3.5'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

const DEFAULT_TYPE_STYLES = {
  default: 'border-fill-quaternary bg-bg-transparent text-text-primary',
  red: 'border-red-border bg-red-muted-fill text-red-emphasis',
  blue: 'border-blue-border bg-blue-muted-fill text-blue-emphasis',
  green: 'border-green-border bg-green-muted-fill text-green-emphasis',
  amber: 'border-amber-border bg-amber-muted-fill text-amber-emphasis',
  yellow: 'border-[#FBBC05] bg-[#FBBC05]/20 text-text-yellow',
  purple: 'border-purple-border bg-purple-muted-fill text-purple-emphasis',
  orange: 'border-orange-border bg-orange-muted-fill text-orange-emphasis',
  gray: 'border-fill-quaternary bg-bg-tertiary text-text-primary',
  cyan: 'border-cyan-border bg-cyan-muted-fill text-cyan-emphasis'
} as const

const AGENT_BUILDER_TYPE_STYLES = {
  default: 'bg-bg-quaternary text-text-primary',
  red: 'bg-red-muted-fill text-red-emphasis',
  blue: 'bg-workflow-fill-blue-faint text-blue-emphasis',
  green: 'bg-workflow-fill-green-faint text-green-emphasis',
  amber: 'bg-amber-muted-fill text-amber-emphasis',

  // No yellow style in Agent Builder — falls back to amber per spec
  yellow: 'bg-amber-muted-fill text-amber-emphasis',
  purple: 'bg-workflow-fill-purple-faint text-purple-emphasis',
  orange: 'bg-workflow-fill-orange-faint text-orange-emphasis',
  gray: 'bg-bg-tertiary text-text-primary',
  cyan: 'bg-cyan-muted-fill text-cyan-emphasis'
} as const

const badgeLabelVariants = cva('max-w-32 truncate', {
  variants: {
    size: {
      micro: '',
      small: '',
      default: '',
      large: ''
    },
    fontWeight: {
      medium: '',
      regular: ''
    }
  },
  compoundVariants: [
    { size: 'micro', fontWeight: 'medium', className: 'text-body-micro-medium' },
    { size: 'micro', fontWeight: 'regular', className: 'text-body-micro-regular' },
    { size: 'small', fontWeight: 'medium', className: 'text-body-mini-medium' },
    { size: 'small', fontWeight: 'regular', className: 'text-body-mini-regular' },
    { size: 'default', fontWeight: 'medium', className: 'text-body-mini-medium' },
    { size: 'default', fontWeight: 'regular', className: 'text-body-mini-regular' },
    { size: 'large', fontWeight: 'medium', className: 'text-body-small-medium' },
    { size: 'large', fontWeight: 'regular', className: 'text-body-small-regular' }
  ],
  defaultVariants: {
    size: 'default',
    fontWeight: 'medium'
  }
})

type BadgeType = keyof typeof DEFAULT_TYPE_STYLES
type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>
type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>
type BadgeFontWeight = NonNullable<VariantProps<typeof badgeLabelVariants>['fontWeight']>

/**
 * Swap `React.ReactNode` for your project's `IconValue` + `<Icon name={iconStart} />`
 * if icons are referenced by string name.
 */
type IconValue = React.ReactNode

interface BadgeProps extends Omit<useRender.ComponentProps<'span'>, 'title' | 'children'> {
  /** Badge label */
  title: React.ReactNode

  /** Color treatment */
  type?: BadgeType

  /** Padding and composite type scale */
  size?: BadgeSize

  /** Rounded bordered pill or borderless Agent Builder badge */
  variant?: BadgeVariant

  /** Label weight (selects the matching composite type token) */
  fontWeight?: BadgeFontWeight

  /** Icon rendered before the label (automatically inherits the type tint) */
  iconStart?: IconValue

  /** Tooltip content on hover */
  tooltip?: string

  /** Additional classes for the label span */
  titleClassName?: string
}

function Badge({
  title,
  type = 'default',
  size = 'default',
  variant = 'default',
  fontWeight = 'medium',
  iconStart,
  tooltip,
  className,
  titleClassName,
  render,
  ...props
}: BadgeProps) {
  const colorClasses = variant === 'agent-builder' ? AGENT_BUILDER_TYPE_STYLES[type] : DEFAULT_TYPE_STYLES[type]

  const badgeElement = useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant, size }), colorClasses, className),
        children: (
          <>
            {iconStart ? (
              <span data-slot='badge-icon' className={badgeIconVariants({ size })} aria-hidden='true'>
                {iconStart}
              </span>
            ) : null}
            <span data-slot='badge-title' className={cn(badgeLabelVariants({ size, fontWeight }), titleClassName)}>
              {title}
            </span>
          </>
        )
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      type,
      size,
      variant,
      fontWeight
    }
  })

  if (!tooltip) {
    return badgeElement
  }

  return (
    <Tooltip>
      <TooltipTrigger render={badgeElement} />
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

export { Badge, badgeVariants }
export type { BadgeFontWeight, BadgeProps, BadgeSize, BadgeType, BadgeVariant }
