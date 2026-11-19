'use client'

import { useMemo, useState } from 'react'

import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel } from '@/components/ui/frame'
import { mockInventoryItems } from '@/fake-db/inventory'
import type {
  InventoryAdjustmentValues,
  InventoryItem,
  InventoryItemFormValues,
  InventoryStatus
} from '@/types/inventory-types'
import { InventoryAdjustDialog } from './inventory-adjust-dialog'
import { InventoryItemSheet } from './inventory-item-sheet'
import { InventoryPagination } from './inventory-pagination'
import { InventorySummaryCards } from './inventory-summary-cards'
import { InventoryTable } from './inventory-table'
import {
  InventoryTableToolbar,
  type InventoryCategoryFilter,
  type InventoryStatusFilter
} from './inventory-table-toolbar'
import { determineStatus, exportInventoryToCsv } from './inventory-utils'

export default function InventoryView() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventoryItems)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<InventoryStatusFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<InventoryCategoryFilter>('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSyncing, setIsSyncing] = useState(false)

  // Dialog & Sheet States
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formSession, setFormSession] = useState(0)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [adjustingItem, setAdjustingItem] = useState<InventoryItem | null>(null)
  const [isAdjustOpen, setIsAdjustOpen] = useState(false)
  const [adjustSession, setAdjustSession] = useState(0)
  const [pendingDelete, setPendingDelete] = useState<InventoryItem | null>(null)

  // Summary Metrics computed from all items
  const summaryMetrics = useMemo(() => {
    let lowStock = 0
    let outOfStock = 0
    let totalVal = 0

    for (const item of items) {
      if (item.status === 'Out of Stock') {
        outOfStock++
      } else if (item.status === 'Low Stock') {
        lowStock++
      }

      totalVal += item.currentStock * item.costPerUnit
    }

    return {
      totalItems: items.length,
      lowStockCount: lowStock,
      outOfStockCount: outOfStock,
      totalValue: totalVal
    }
  }, [items])

  // Filtered Items
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return items.filter(item => {
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.unit.toLowerCase().includes(query) ||
        (item.notes && item.notes.toLowerCase().includes(query))

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [items, search, statusFilter, categoryFilter])

  // Pagination
  const totalCount = filteredItems.length
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const pageStart = (safeCurrentPage - 1) * rowsPerPage
  const paginatedItems = filteredItems.slice(pageStart, pageStart + rowsPerPage)

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (value: InventoryStatusFilter) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handleCategoryFilterChange = (value: InventoryCategoryFilter) => {
    setCategoryFilter(value)
    setCurrentPage(1)
  }

  const handleRowsPerPageChange = (size: number) => {
    setRowsPerPage(size)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearch('')
    setStatusFilter('all')
    setCategoryFilter('all')
    setCurrentPage(1)
  }

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)

      // Update timestamps to "Just now"
      setItems(prev => prev.map(item => ({ ...item, lastUpdated: 'Just now' })))
      toast.success('Inventory synced successfully with POS menu recipes')
    }, 800)
  }

  const handleExport = () => {
    exportInventoryToCsv(filteredItems, `rakpos-inventory-${new Date().toISOString().slice(0, 10)}.csv`)
    toast.success(`Exported ${filteredItems.length} inventory items to CSV`)
  }

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormSession(s => s + 1)
    setIsFormOpen(true)
  }

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item)
    setFormSession(s => s + 1)
    setIsFormOpen(true)
  }

  const handleOpenAdjust = (item: InventoryItem) => {
    setAdjustingItem(item)
    setAdjustSession(s => s + 1)
    setIsAdjustOpen(true)
  }

  // Quick inline +/- adjustment
  const handleQuickStep = (item: InventoryItem, delta: number) => {
    const newStock = Math.max(0, item.currentStock + delta)
    const newStatus = determineStatus(newStock, item.minStock)

    setItems(current =>
      current.map(i =>
        i.id === item.id
          ? {
              ...i,
              currentStock: newStock,
              status: newStatus,
              lastUpdated: 'Just now'
            }
          : i
      )
    )

    toast.success(`Updated ${item.name} stock to ${newStock} ${item.unit}`)
  }

  // Save new or edited item
  const handleSaveItem = (values: InventoryItemFormValues) => {
    const status: InventoryStatus = determineStatus(values.currentStock, values.minStock)

    if (editingItem) {
      setItems(current =>
        current.map(i =>
          i.id === editingItem.id
            ? {
                ...i,
                ...values,
                status,
                lastUpdated: 'Just now'
              }
            : i
        )
      )
      toast.success(`Updated ${values.name} details`)
    } else {
      const newItem: InventoryItem = {
        id: `inv-${Date.now()}`,
        ...values,
        status,
        lastUpdated: 'Just now'
      }

      setItems(current => [newItem, ...current])
      toast.success(`Added ${values.name} to inventory`)
    }

    setEditingItem(null)
    setIsFormOpen(false)
  }

  // Save custom stock adjustment
  const handleAdjustStock = (item: InventoryItem, values: InventoryAdjustmentValues) => {
    let newStock = item.currentStock

    if (values.mode === 'set') {
      newStock = Math.max(0, values.quantity)
    } else if (values.mode === 'add') {
      newStock = item.currentStock + values.quantity
    } else if (values.mode === 'subtract') {
      newStock = Math.max(0, item.currentStock - values.quantity)
    }

    const newStatus = determineStatus(newStock, item.minStock)

    setItems(current =>
      current.map(i =>
        i.id === item.id
          ? {
              ...i,
              currentStock: newStock,
              status: newStatus,
              lastUpdated: 'Just now'
            }
          : i
      )
    )

    toast.success(`Adjusted ${item.name} stock to ${newStock} ${item.unit} (${values.reason})`)
    setAdjustingItem(null)
    setIsAdjustOpen(false)
  }

  // Delete item
  const handleDeleteItem = () => {
    if (!pendingDelete) return

    setItems(current => current.filter(i => i.id !== pendingDelete.id))
    toast.success(`Removed ${pendingDelete.name} from inventory`)
    setPendingDelete(null)
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Page Title & Description */}
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Inventory</h1>
        <FrameDescription>
          Track raw ingredients, monitor stock levels, manage low-stock alerts, and assess total valuation.
        </FrameDescription>
      </div>

      {/* Summary Cards */}
      <InventorySummaryCards
        totalItems={summaryMetrics.totalItems}
        lowStockCount={summaryMetrics.lowStockCount}
        outOfStockCount={summaryMetrics.outOfStockCount}
        totalValue={summaryMetrics.totalValue}
        currentStatusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
      />

      {/* Main Table Frame */}
      <Frame className='w-full'>
        <FrameHeader>
          <InventoryTableToolbar
            search={search}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={handleCategoryFilterChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            onExport={handleExport}
            onSync={handleSync}
            onAddItem={handleOpenAdd}
            isSyncing={isSyncing}
          />
        </FrameHeader>

        <FramePanel className='p-0'>
          <InventoryTable
            items={paginatedItems}
            onAdjust={handleOpenAdjust}
            onQuickStep={handleQuickStep}
            onEdit={handleOpenEdit}
            onDelete={setPendingDelete}
            onResetFilters={handleResetFilters}
          />
        </FramePanel>

        <FrameFooter>
          <InventoryPagination
            total={totalCount}
            rowsPerPage={rowsPerPage}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </FrameFooter>
      </Frame>

      {/* Add / Edit Item Sheet */}
      <InventoryItemSheet
        key={`item-form-${editingItem?.id ?? formSession}`}
        item={editingItem}
        open={isFormOpen}
        onOpenChange={open => {
          setIsFormOpen(open)
          if (!open) setEditingItem(null)
        }}
        onSave={handleSaveItem}
      />

      {/* Adjust Stock Dialog */}
      <InventoryAdjustDialog
        key={`adjust-form-${adjustingItem?.id ?? adjustSession}`}
        item={adjustingItem}
        open={isAdjustOpen}
        onOpenChange={open => {
          setIsAdjustOpen(open)
          if (!open) setAdjustingItem(null)
        }}
        onAdjust={handleAdjustStock}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        title='Delete inventory item?'
        description={`This will permanently delete "${pendingDelete?.name ?? 'this item'}" from inventory records.`}
        cancelLabel='Cancel'
        confirmLabel='Delete'
        confirmVariant='destructive'
        open={Boolean(pendingDelete)}
        onOpenChange={open => {
          if (!open) setPendingDelete(null)
        }}
        onConfirm={handleDeleteItem}
      />
    </div>
  )
}
