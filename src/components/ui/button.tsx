import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        'pos-action': 'bg-pos-action text-primary-foreground hover:bg-pos-action/90 focus-visible:ring-pos-action',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 shadow-xs',
        secondary:
          'bg-secondary text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]',
        ghost:
          'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        'ghost-transparent': 'hover:text-foreground hover:bg-transparent',
        'ghost-destructive':
          'text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        'ghost-destructive-text':
          'text-destructive hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        'ghost-muted': 'text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/50',
        'ghost-muted-transparent':
          'text-muted-foreground hover:text-foreground dark:hover:bg-muted/50 hover:bg-transparent',
        'ghost-connected':
          'bg-destructive/10 text-destructive hover:bg-destructive/15 hover:text-destructive aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        'ghost-disconnected':
          'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
        nav: 'text-foreground/80 hover:bg-muted/60 hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:hover:text-accent-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        'outline-destructive':
          'border-destructive bg-background text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive/20 dark:bg-input/30 dark:focus-visible:ring-destructive/40 shadow-xs',
        'account-remove':
          'bg-primary/10 text-primary hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 focus:ring-2 focus:ring-offset-2 focus:outline-none',
        'outline-add':
          'border-border bg-background text-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 shadow-xs',
        'outline-destructive-text':
          'border-border bg-background text-destructive hover:bg-destructive/10 hover:text-destructive aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 shadow-xs',
        soft: 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default:
          'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        nav: 'h-9 gap-2.5 px-3',
        'mail-send': 'h-8 gap-1.5 rounded-lg px-4',
        'mail-back': 'h-8 gap-1 p-0',
        'label-option': 'h-8 gap-2 px-2.5',
        'account-remove': 'size-5 gap-0 p-0',
        'account-add': 'h-9 gap-2 px-3',
        spaced: 'h-9 gap-2 px-2.5',
        icon: 'size-9',
        'icon-xs':
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
        'icon-lg': 'size-10'
      },
      shape: {
        default: '',
        round: 'rounded-full',
        tile: 'rounded-lg',
        'start-flat': 'rounded-l-none'
      },
      motion: {
        default: '',
        slow: 'duration-200',
        colors: 'transition-colors'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
      motion: 'default'
    }
  }
)

function Button({
  className,
  variant = 'default',
  shape = 'default',
  motion = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot='button'
      className={cn(buttonVariants({ variant, size, shape, motion, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
