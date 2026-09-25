'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

function Table({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'table'> & { variant?: 'default' | 'pinnable' }) {
  return (
    <div data-slot='table-container' className='relative w-full overflow-x-auto'>
      <table
        data-slot='table'
        data-variant={variant}
        className={cn(
          'w-full caption-bottom text-sm',
          variant === 'pinnable' &&
            '[&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b',
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'thead'> & { variant?: 'default' | 'muted' }) {
  return (
    <thead
      data-slot='table-header'
      data-variant={variant}
      className={cn('[&_tr]:border-b', variant === 'muted' && 'bg-muted/40', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot='table-body' className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot='table-footer'
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}

function TableRow({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'tr'> & { variant?: 'default' | 'muted' | 'static' | 'header' | 'filled' }) {
  return (
    <tr
      data-slot='table-row'
      data-variant={variant}
      className={cn(
        'hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        variant === 'muted' && 'bg-muted/50',
        variant === 'static' && 'hover:bg-transparent',
        variant === 'header' && 'border-t',
        variant === 'filled' && 'bg-muted',
        className
      )}
      {...props}
    />
  )
}

function TableHead({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'th'> & { variant?: 'default' | 'pinned' | 'muted' }) {
  return (
    <th
      data-slot='table-head'
      data-variant={variant}
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0',
        variant === 'pinned' &&
          'data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0',
        variant === 'muted' && 'text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

function TableCell({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'td'> & { variant?: 'default' | 'pinned' }) {
  return (
    <td
      data-slot='table-cell'
      data-variant={variant}
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0',
        variant === 'pinned' && 'data-pinned:bg-background/90 data-pinned:backdrop-blur-xs',
        className
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption data-slot='table-caption' className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
