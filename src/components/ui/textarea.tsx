import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({
  className,
  variant = 'default',
  inset = 'default',
  ...props
}: React.ComponentProps<'textarea'> & {
  variant?: 'default' | 'reply'
  inset?: 'default' | 'leading-icon'
}) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
        variant === 'reply' &&
          'resize-none rounded-none border-0 bg-transparent p-2 text-sm shadow-none focus-visible:ring-0 max-md:min-h-10 md:px-4 md:py-3',
        inset === 'leading-icon' && 'pl-9',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
