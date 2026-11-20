import * as React from 'react'

import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XCircleIcon, XIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const bannerVariants = cva('group/banner text-text-primary relative flex w-full gap-2.5 rounded-xl border p-3', {
  variants: {
    color: {
      green: 'border-green-border bg-green-muted-fill',
      blue: 'border-blue-border bg-blue-muted-fill',
      orange: 'border-orange-border bg-orange-muted-fill',
      red: 'border-red-border bg-red-muted-fill',
      gray: 'border-fill-quaternary bg-bg-secondary',
      white: 'border-fill-quaternary bg-bg-primary'
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start'
    }
  },
  defaultVariants: {
    color: 'gray',
    orientation: 'horizontal'
  }
})

const BANNER_ICON_COLORS = {
  green: 'text-green-base',
  blue: 'text-blue-base',
  orange: 'text-orange-base',
  red: 'text-red-base',
  gray: 'text-text-secondary',
  white: 'text-text-secondary'
} as const

const BANNER_ACCENT_COLORS = {
  green: 'text-green-emphasis',
  blue: 'text-blue-emphasis',
  orange: 'text-orange-emphasis',
  red: 'text-red-emphasis',
  gray: 'text-text-primary',
  white: 'text-text-primary'
} as const

const BUILTIN_ICONS = {
  success: CheckCircle2Icon,
  info: InfoIcon,
  warning: AlertTriangleIcon,
  error: XCircleIcon
} as const

type BannerColor = NonNullable<VariantProps<typeof bannerVariants>['color']>
type BannerOrientation = NonNullable<VariantProps<typeof bannerVariants>['orientation']>
type BannerBuiltinIcon = keyof typeof BUILTIN_ICONS
type BannerIcon = BannerBuiltinIcon | React.ReactNode
type BannerActionsAlignment = 'start' | 'center'

interface BannerProps extends Omit<React.ComponentProps<'div'>, 'title' | 'color'> {
  /** The main message */
  title: React.ReactNode

  /** Supporting copy rendered under the title */
  description?: React.ReactNode

  /** Surface and accent color. Defaults to neutral `gray`. */
  color?: BannerColor

  /** Built-in glyph name or custom icon element (automatically sized to 16px and colored). */
  icon?: BannerIcon

  /** Accent color for the icon alone. Defaults to `color`. */
  iconColor?: BannerColor

  /** Colors the title and plain-text actions with the banner's emphasis accent. */
  coloredTitle?: boolean

  /** Main action, rendered last. */
  primaryAction?: React.ReactNode

  /** Extra action, rendered before `primaryAction`. */
  secondaryAction?: React.ReactNode

  /** Aligns the action group to the top or center of a horizontal banner. */
  actionsAlignment?: BannerActionsAlignment

  /** Renders a dismiss button and runs when clicked. Caller owns visibility. */
  onDismiss?: () => void

  /** Live-region role. Use `"alert"` for urgent errors or `"presentation"` inside another live region. */
  role?: React.AriaRole

  /** Lays out the icon, text, and actions in a row or column. */
  orientation?: BannerOrientation

  /** Additional classes for the title and description wrapper (e.g. `min-w-56` with `flex-wrap`). */
  contentClassName?: string

  /** Additional classes for the description container. */
  descriptionClassName?: string
}

function isBuiltinIcon(icon: BannerIcon): icon is BannerBuiltinIcon {
  return typeof icon === 'string' && icon in BUILTIN_ICONS
}

function Banner({
  title,
  description,
  color = 'gray',
  icon,
  iconColor,
  coloredTitle = false,
  primaryAction,
  secondaryAction,
  actionsAlignment = 'center',
  onDismiss,
  role = 'status',
  orientation = 'horizontal',
  className,
  contentClassName,
  descriptionClassName,
  ...props
}: BannerProps) {
  const isHorizontal = orientation === 'horizontal'
  const hasDescription = Boolean(description)
  const hasActionButtons = Boolean(secondaryAction || primaryAction)
  const hasActions = Boolean(hasActionButtons || onDismiss)
  const isTintedSurface = color !== 'gray' && color !== 'white'
  const resolvedIconColor = iconColor ?? color

  const renderedIcon = React.useMemo(() => {
    if (!icon) return null

    if (isBuiltinIcon(icon)) {
      const IconComponent = BUILTIN_ICONS[icon]

      return <IconComponent />
    }

    return icon
  }, [icon])

  return (
    <div
      data-slot='banner'
      data-color={color}
      data-orientation={orientation}
      role={role}
      className={cn(
        bannerVariants({ color, orientation }),
        isHorizontal && (hasDescription ? 'items-start' : 'items-center'),
        className
      )}
      {...props}
    >
      {renderedIcon ? (
        <div
          data-slot='banner-icon'
          aria-hidden='true'
          className={cn('shrink-0', BANNER_ICON_COLORS[resolvedIconColor])}
        >
          <span
            className={cn(
              'inline-flex items-center [&_svg]:size-4 [&_svg]:shrink-0',
              isHorizontal && hasDescription && 'text-body-small-medium h-lh'
            )}
          >
            {renderedIcon}
          </span>
        </div>
      ) : null}

      <div data-slot='banner-content' className={cn('min-w-0 flex-1', contentClassName)}>
        <div className={cn(coloredTitle && BANNER_ACCENT_COLORS[color])}>
          <p data-slot='banner-title' className='text-body-small-medium'>
            {title}
          </p>
        </div>

        {hasDescription ? (
          <div className={cn('mt-0.5', isTintedSurface ? 'text-text-primary/70' : 'text-text-secondary')}>
            <div data-slot='banner-description' className={cn('text-body-small-regular', descriptionClassName)}>
              {description}
            </div>
          </div>
        ) : null}
      </div>

      {hasActions ? (
        <div
          data-slot='banner-actions'
          className={cn(
            'flex shrink-0 items-center gap-3',
            isHorizontal && (actionsAlignment === 'start' ? 'self-start' : 'self-center'),
            coloredTitle && BANNER_ACCENT_COLORS[color]
          )}
        >
          {hasActionButtons ? (
            <div className='flex shrink-0 items-center gap-2'>
              {secondaryAction}
              {primaryAction}
            </div>
          ) : null}

          {onDismiss ? (
            <button
              type='button'
              data-slot='banner-dismiss'
              aria-label='Dismiss banner'
              onClick={onDismiss}
              className={cn(
                'inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md select-none',
                'bg-bg-transparent text-text-secondary hover:bg-control-hover hover:text-text-primary',
                'transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97]',
                'focus-visible:shadow-focus focus-visible:outline-none'
              )}
            >
              <XIcon className='size-3.5 shrink-0' aria-hidden='true' />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export { Banner, bannerVariants }
export type { BannerActionsAlignment, BannerBuiltinIcon, BannerColor, BannerIcon, BannerOrientation, BannerProps }
