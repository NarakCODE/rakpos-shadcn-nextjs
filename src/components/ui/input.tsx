import * as React from 'react'

import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '@/lib/utils'

function Input({
  className,
  type,
  edge = 'default',
  inset = 'default',
  tone = 'default',
  ...props
}: React.ComponentProps<'input'> & {
  edge?: 'default' | 'start' | 'end'
  inset?: 'default' | 'search'
  tone?: 'default' | 'readonly-muted'
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot='input'
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-9 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm',
        edge === 'start' && 'rounded-l-none',
        edge === 'end' && 'rounded-r-none',
        inset === 'search' && 'pl-9',
        tone === 'readonly-muted' && 'read-only:bg-muted',
        className
      )}
      {...props}
    />
  )
}

export { Input }
