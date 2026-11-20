import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'group/badge focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 text-body-mini-medium inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 whitespace-nowrap transition-all focus-visible:ring-[3px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',

        success: 'bg-bg-green text-text-green',
        warning: 'bg-bg-amber text-text-amber',
        danger: 'bg-bg-red text-text-red',
        accent: 'bg-bg-blue text-text-blue'
      },
      size: {
        default: '',
        tall: 'h-6 px-2 py-1',
        wide: 'h-6 px-3 py-1',
        table: 'h-auto',
        attachment: 'h-auto gap-1.5 px-2 py-1 font-normal',
        label: 'px-1.5 max-xl:border-0 max-xl:p-0'
      },
      shape: {
        default: '',
        square: 'rounded-sm'
      },
      border: {
        default: '',
        none: 'border-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
      border: 'default'
    }
  }
)

function Badge({
  className,
  variant = 'default',
  size = 'default',
  shape = 'default',
  border = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant, size, shape, border }), className)
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      size,
      shape,
      border
    }
  })
}

export { Badge, badgeVariants }
