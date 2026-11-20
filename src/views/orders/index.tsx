'use client'

import { useMemo, useState } from 'react'

import { toast } from 'sonner'

import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel } from '@/components/ui/frame'
import { mockOrders } from '@/fake-db/orders'
import type { OrderStatus, RestaurantOrder } from '@/types/orders-types'
import { OrderDetailsSheet } from './order-details-sheet'
import { OrdersPagination } from './orders-pagination'
import { OrdersTable } from './orders-table'
import { OrdersTableToolbar } from './orders-table-toolbar'

export default function OrdersView() {
  const [orders, setOrders] = useState<RestaurantOrder[]>(mockOrders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})

  // Sheet state
  const [selectedOrder, setSelectedOrder] = useState<RestaurantOrder | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Column visibility toggle
  const handleColumnVisibilityToggle = (columnId: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: visible
    }))
  }

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search filter across orderNumber, destination, and dish names
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchesNumber = order.orderNumber.toLowerCase().includes(query)
        const matchesDest = order.forDestination.toLowerCase().includes(query)
        const matchesSubtitle = order.locationSubtitle?.toLowerCase().includes(query)
        const matchesItems = order.items.some(item => item.name.toLowerCase().includes(query))

        if (!matchesNumber && !matchesDest && !matchesSubtitle && !matchesItems) {
          return false
        }
      }

      // Status filter
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false
      }

      // Type filter
      if (typeFilter !== 'all' && order.type !== typeFilter) {
        return false
      }

      return true
    })
  }, [orders, search, statusFilter, typeFilter])

  // Pagination metrics
  const totalCount = filteredOrders.length
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)

  const paginatedOrders = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * rowsPerPage

    return filteredOrders.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredOrders, safeCurrentPage, rowsPerPage])

  // Actions
  const handleViewOrder = (order: RestaurantOrder) => {
    setSelectedOrder(order)
    setIsSheetOpen(true)
  }

  const handlePrintOrder = (order: RestaurantOrder) => {
    setSelectedOrder(order)
    setIsSheetOpen(true)
    setTimeout(() => {
      window.print()
    }, 200)
  }

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord)))

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => (prev ? { ...prev, status: newStatus } : null))
    }

    toast.success(`Order status updated to ${newStatus}`)
  }

  const handleMarkAsReady = (orderId: string) => {
    handleStatusChange(orderId, 'Ready')
    toast.success(`Order ${selectedOrder?.orderNumber ?? ''} marked as Ready`)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  const handleTypeFilterChange = (type: string) => {
    setTypeFilter(type)
    setCurrentPage(1)
  }

  const handleRowsPerPageChange = (size: number) => {
    setRowsPerPage(size)
    setCurrentPage(1)
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* 1. Heading (outside of the frame) */}
      <div className='flex flex-col gap-1'>
        <h1 className='text-title-regular'>Orders</h1>
        <FrameDescription>Manage and track all restaurant orders</FrameDescription>
      </div>

      {/* Orders Table Frame */}
      <Frame className='w-full'>
        {/* 2. Filtering Toolbar inside FrameHeader */}
        <FrameHeader>
          <OrdersTableToolbar
            search={search}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            typeFilter={typeFilter}
            onTypeFilterChange={handleTypeFilterChange}
            columnVisibility={columnVisibility}
            onColumnVisibilityToggle={handleColumnVisibilityToggle}
          />
        </FrameHeader>

        {/* 3. Data Table inside FramePanel */}
        <FramePanel className='p-0'>
          <OrdersTable
            orders={paginatedOrders}
            columnVisibility={columnVisibility}
            onViewOrder={handleViewOrder}
            onPrintOrder={handlePrintOrder}
            onStatusChange={handleStatusChange}
          />
        </FramePanel>

        {/* 4. Pagination inside FrameFooter */}
        <FrameFooter>
          <OrdersPagination
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            total={totalCount}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </FrameFooter>
      </Frame>

      {/* 5. Order Details Sheet */}
      <OrderDetailsSheet
        order={selectedOrder}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onMarkAsReady={handleMarkAsReady}
      />
    </div>
  )
}
