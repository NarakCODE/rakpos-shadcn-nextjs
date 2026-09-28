'use client'

import Image from 'next/image'

import { CopyIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react'

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
import type { MenuItem, MenuItemColumnVisibility } from '@/types/menu-item-types'

const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

type MenuItemsTableProps = {
  items: MenuItem[]
  columnVisibility: MenuItemColumnVisibility
  onEdit: (item: MenuItem) => void
  onDuplicate: (item: MenuItem) => void
  onDelete: (item: MenuItem) => void
}

export function MenuItemsTable({ items, columnVisibility, onEdit, onDuplicate, onDelete }: MenuItemsTableProps) {
  const visibleColumnCount = Object.values(columnVisibility).filter(Boolean).length

  return (
    <div className='overflow-x-auto'>
      <Table className='min-w-[980px]'>
        <TableHeader variant='muted'>
          <TableRow>
            <TableHead className='min-w-[360px]'>Item</TableHead>
            {columnVisibility.category && <TableHead className='min-w-28'>Category</TableHead>}
            {columnVisibility.price && <TableHead className='w-28'>Price</TableHead>}
            {columnVisibility.type && <TableHead className='w-28'>Type</TableHead>}
            {columnVisibility.addons && <TableHead className='w-32'>Addons</TableHead>}
            {columnVisibility.status && <TableHead className='w-28'>Status</TableHead>}
            <TableHead className='w-20 text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length > 0 ? (
            items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className='flex min-w-0 items-center gap-3'>
                    <div className='relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted'>
                      <Image src={item.image} alt={item.title} fill sizes='48px' className='object-cover' />
                    </div>
                    <div className='flex min-w-0 flex-col gap-1'>
                      <span className='truncate font-semibold text-foreground'>{item.title}</span>
                      <span className='line-clamp-1 text-sm text-muted-foreground'>{item.description}</span>
                    </div>
                  </div>
                </TableCell>
                {columnVisibility.category && (
                  <TableCell>
                    <span className='text-muted-foreground'>{item.category}</span>
                  </TableCell>
                )}
                {columnVisibility.price && (
                  <TableCell>
                    <span className='font-medium text-foreground'>{priceFormatter.format(item.price)}</span>
                  </TableCell>
                )}
                {columnVisibility.type && (
                  <TableCell>
                    <Badge variant='outline'>{item.dietaryType}</Badge>
                  </TableCell>
                )}
                {columnVisibility.addons && (
                  <TableCell>
                    <span className='text-muted-foreground'>
                      {item.addonGroupCount} {item.addonGroupCount === 1 ? 'group' : 'groups'}
                    </span>
                  </TableCell>
                )}
                {columnVisibility.status && (
                  <TableCell>
                    <Badge variant={item.status === 'Active' ? 'success' : 'secondary'}>{item.status}</Badge>
                  </TableCell>
                )}
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant='ghost' size='icon-sm' aria-label={`Actions for ${item.title}`}>
                          <MoreHorizontalIcon aria-hidden='true' />
                        </Button>
                      }
                    />
                    <DropdownMenuContent align='end' className='w-40'>
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <PencilIcon aria-hidden='true' />
                        Edit item
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(item)}>
                        <CopyIcon aria-hidden='true' />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant='destructive' onClick={() => onDelete(item)}>
                        <Trash2Icon aria-hidden='true' />
                        Delete item
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={visibleColumnCount + 2} className='h-28 text-center'>
                <div className='flex flex-col items-center gap-1.5'>
                  <p className='font-medium'>No menu items found</p>
                  <p className='text-sm text-muted-foreground'>Try changing the search or filters.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
