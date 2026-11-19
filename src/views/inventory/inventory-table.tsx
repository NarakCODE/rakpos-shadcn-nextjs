'use client'

import {
  AlertCircleIcon,
  MinusIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SlidersHorizontalIcon,
  Trash2Icon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import type { InventoryItem } from '@/types/inventory-types'
import { calculateStockLevel } from './inventory-utils'

type InventoryTableProps = {
  items: InventoryItem[]
  onAdjust: (item: InventoryItem) => void
  onQuickStep: (item: InventoryItem, delta: number) => void
  onEdit: (item: InventoryItem) => void
  onDelete: (item: InventoryItem) => void
  onResetFilters?: () => void
}

export function InventoryTable({
  items,
  onAdjust,
  onQuickStep,
  onEdit,
  onDelete,
  onResetFilters
}: InventoryTableProps) {
  const getBadgeVariant = (status: InventoryItem['status']) => {
    switch (status) {
      case 'Adequate':
        return 'success' as const
      case 'Low Stock':
        return 'warning' as const
      case 'Out of Stock':
        return 'danger' as const
      default:
        return 'default' as const
    }
  }

  const getProgressColor = (percentage: number, status: InventoryItem['status']) => {
    if (status === 'Out of Stock' || percentage === 0) {
      return 'bg-rose-500'
    }

    if (status === 'Low Stock' || percentage <= 25) {
      return 'bg-amber-500'
    }

    return 'bg-emerald-500'
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader variant='muted'>
          <TableRow>
            <TableHead className='min-w-48'>Item</TableHead>
            <TableHead className='w-32'>Category</TableHead>
            <TableHead className='w-20'>Unit</TableHead>
            <TableHead className='w-32'>Current Stock</TableHead>
            <TableHead className='w-40'>Level</TableHead>
            <TableHead className='w-28'>Min / Max</TableHead>
            <TableHead className='w-32'>Status</TableHead>
            <TableHead className='w-32'>Last Updated</TableHead>
            <TableHead className='w-36 text-center'>Adjust</TableHead>
            <TableHead className='w-14 text-right'>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length > 0 ? (
            items.map(item => {
              const levelPercent = calculateStockLevel(item.currentStock, item.maxStock)
              const progressColor = getProgressColor(levelPercent, item.status)

              return (
                <TableRow key={item.id}>
                  {/* Item */}
                  <TableCell>
                    <div className='flex flex-col'>
                      <span className='font-semibold text-foreground'>{item.name}</span>
                      {item.notes && (
                        <span className='line-clamp-1 text-xs text-muted-foreground'>{item.notes}</span>
                      )}
                    </div>
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge variant='outline'>{item.category}</Badge>
                  </TableCell>

                  {/* Unit */}
                  <TableCell>
                    <span className='font-mono text-sm text-muted-foreground'>{item.unit}</span>
                  </TableCell>

                  {/* Current Stock */}
                  <TableCell>
                    <span className='font-semibold tabular-nums text-foreground'>
                      {item.currentStock}{' '}
                      <span className='text-xs font-normal text-muted-foreground'>{item.unit}</span>
                    </span>
                  </TableCell>

                  {/* Level */}
                  <TableCell>
                    <div className='flex flex-col gap-1.5'>
                      <div className='flex items-center justify-between text-xs'>
                        <span className='font-medium text-foreground'>{levelPercent}% of max</span>
                      </div>
                      <div className='relative h-2 w-full overflow-hidden rounded-full bg-muted'>
                        <div
                          className={cn('h-full transition-all duration-300', progressColor)}
                          style={{ width: `${Math.min(100, Math.max(0, levelPercent))}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Min / Max */}
                  <TableCell>
                    <span className='tabular-nums text-sm text-muted-foreground'>
                      {item.minStock} / {item.maxStock}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
                  </TableCell>

                  {/* Last Updated */}
                  <TableCell>
                    <span className='whitespace-nowrap text-sm text-muted-foreground'>{item.lastUpdated}</span>
                  </TableCell>

                  {/* Adjust (Showing 80, 3, 0, etc. with interactive stepper / adjust button) */}
                  <TableCell>
                    <div className='flex items-center justify-center gap-1'>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon-sm'
                        aria-label={`Decrease ${item.name} stock`}
                        disabled={item.currentStock <= 0}
                        onClick={() => onQuickStep(item, -1)}
                      >
                        <MinusIcon className='size-3 text-muted-foreground' />
                      </Button>

                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => onAdjust(item)}
                        title='Click to set or adjust stock'
                      >
                        <span className='font-mono font-semibold tabular-nums'>{item.currentStock}</span>
                      </Button>

                      <Button
                        type='button'
                        variant='ghost'
                        size='icon-sm'
                        aria-label={`Increase ${item.name} stock`}
                        onClick={() => onQuickStep(item, 1)}
                      >
                        <PlusIcon className='size-3 text-muted-foreground' />
                      </Button>
                    </div>
                  </TableCell>

                  {/* Actions dropdown */}
                  <TableCell className='text-right'>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant='ghost' size='icon-sm' aria-label={`Actions for ${item.name}`}>
                            <MoreHorizontalIcon className='size-4' aria-hidden='true' />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align='end' className='w-44'>
                        <DropdownMenuItem onClick={() => onAdjust(item)}>
                          <SlidersHorizontalIcon aria-hidden='true' />
                          <span>Adjust Stock</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          <PencilIcon aria-hidden='true' />
                          <span>Edit Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant='destructive' onClick={() => onDelete(item)}>
                          <Trash2Icon aria-hidden='true' />
                          <span>Delete Item</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={10} className='h-48 text-center'>
                <div className='flex flex-col items-center justify-center gap-2 text-muted-foreground'>
                  <AlertCircleIcon className='size-8 stroke-1 text-muted-foreground/60' />
                  <p className='text-base font-medium text-foreground'>No inventory items found</p>
                  <p className='text-sm text-muted-foreground'>
                    No items match your active search or category/status filters.
                  </p>
                  {onResetFilters && (
                    <Button type='button' variant='outline' size='sm' onClick={onResetFilters} className='mt-2'>
                      Reset Filters
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
