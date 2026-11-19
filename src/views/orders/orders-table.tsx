'use client'

import { useState } from 'react'

import { ClockIcon, EyeIcon, MoreHorizontalIcon, PrinterIcon, XCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import type { OrderStatus, RestaurantOrder } from '@/types/orders-types'
import { OrderStatusBadge } from './order-status-badge'
import { OrderTypeBadge } from './order-type-badge'

export type OrdersTableProps = {
  orders: RestaurantOrder[]
  columnVisibility: Record<string, boolean>
  onViewOrder: (order: RestaurantOrder) => void
  onPrintOrder: (order: RestaurantOrder) => void
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
}

export function OrdersTable({ orders, columnVisibility, onViewOrder, onPrintOrder, onStatusChange }: OrdersTableProps) {
  const [orderToCancel, setOrderToCancel] = useState<RestaurantOrder | null>(null)

  const showOrderNumber = columnVisibility.orderNumber !== false
  const showType = columnVisibility.type !== false
  const showStatus = columnVisibility.status !== false
  const showFor = columnVisibility.forDestination !== false
  const showItems = columnVisibility.itemCount !== false
  const showTotal = columnVisibility.total !== false
  const showPlacedAt = columnVisibility.placedAt !== false

  return (
    <>
      <div className='overflow-x-auto'>
      <Table>
        <TableHeader variant='muted'>
          <TableRow>
            {showOrderNumber && <TableHead className='w-28'>Order ID</TableHead>}
            {showType && <TableHead className='w-32'>Type</TableHead>}
            {showStatus && <TableHead className='w-32'>Status</TableHead>}
            {showFor && <TableHead className='min-w-44'>For</TableHead>}
            {showItems && <TableHead className='w-28'>Items</TableHead>}
            {showTotal && <TableHead className='w-28 text-right'>Total</TableHead>}
            {showPlacedAt && <TableHead className='w-36'>Placed At</TableHead>}
            <TableHead className='w-24 text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.length > 0 ? (
            orders.map(order => (
              <TableRow key={order.id}>
                {/* Order ID */}
                {showOrderNumber && (
                  <TableCell>
                    <button
                      type='button'
                      onClick={() => onViewOrder(order)}
                      className='cursor-pointer underline-offset-4 hover:underline'
                      title={`View details for ${order.orderNumber}`}
                    >
                      {order.orderNumber}
                    </button>
                  </TableCell>
                )}

                {/* Type */}
                {showType && (
                  <TableCell>
                    <OrderTypeBadge type={order.type} />
                  </TableCell>
                )}

                {/* Status */}
                {showStatus && (
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                )}

                {/* For */}
                {showFor && <TableCell>{order.forDestination}</TableCell>}

                {/* Items */}
                {showItems && (
                  <TableCell>
                    {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                  </TableCell>
                )}

                {/* Total */}
                {showTotal && (
                  <TableCell className='text-right'>
                    ${order.total.toFixed(2)}
                  </TableCell>
                )}

                {/* Placed At */}
                {showPlacedAt && <TableCell>{order.placedAt}</TableCell>}

                {/* Actions */}
                <TableCell className='text-right'>
                  <div className='flex items-center justify-end gap-1'>
                    {/* View Details Eye Icon */}
                    <Button
                      variant='ghost'
                      size='icon-sm'
                      onClick={() => onViewOrder(order)}
                      aria-label={`View details for ${order.orderNumber}`}
                      title='View details'
                    >
                      <EyeIcon className='size-4' aria-hidden='true' />
                    </Button>

                    {/* Three-dot options dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant='ghost'
                            size='icon-sm'
                            aria-label={`More actions for order ${order.orderNumber}`}
                            title='More actions'
                          >
                            <MoreHorizontalIcon className='size-4' aria-hidden='true' />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align='end' className='w-44'>
                        <DropdownMenuItem onClick={() => onViewOrder(order)}>
                          <EyeIcon className='size-4' aria-hidden='true' />
                          <span>View details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onPrintOrder(order)}>
                          <PrinterIcon className='size-4' aria-hidden='true' />
                          <span>Print receipt</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <ClockIcon className='size-4' aria-hidden='true' />
                            <span>Change status</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className='w-36'>
                            <DropdownMenuItem onClick={() => onStatusChange(order.id, 'New')}>New</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Preparing')}>
                              Preparing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Ready')}>Ready</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Served')}>
                              Served
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onStatusChange(order.id, 'Cancelled')}>
                              Cancelled
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant='destructive'
                          disabled={order.status === 'Cancelled'}
                          onClick={() => setOrderToCancel(order)}
                        >
                          <XCircleIcon className='size-4' aria-hidden='true' />
                          <span>Cancel order</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className='text-center'>
                <div className='flex flex-col items-center justify-center gap-1.5'>
                  <p>No orders found</p>
                  <p>Try adjusting your search query or filter selection.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    {orderToCancel && (
      <ConfirmDialog
        open={!!orderToCancel}
        onOpenChange={open => {
          if (!open) {
            setOrderToCancel(null)
          }
        }}
        title='Cancel Order'
        description={`Are you sure you want to cancel order ${orderToCancel.orderNumber}? This action cannot be undone.`}
        confirmLabel='Cancel Order'
        confirmVariant='destructive'
        onConfirm={() => {
          onStatusChange(orderToCancel.id, 'Cancelled')
          setOrderToCancel(null)
        }}
      />
    )}
  </>
  )
}
