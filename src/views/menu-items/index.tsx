'use client'

import { useMemo, useState } from 'react'

import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Button } from '@/components/ui/button'
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel } from '@/components/ui/frame'
import { mockMenuItems } from '@/fake-db/menu-items'
import type {
  MenuItem,
  MenuItemColumn,
  MenuItemColumnVisibility,
  MenuItemFormValues
} from '@/types/menu-item-types'
import { MenuItemFormSheet } from './menu-item-form-sheet'
import { MenuItemsPagination } from './menu-items-pagination'
import { MenuItemsTable } from './menu-items-table'
import {
  MenuItemsToolbar,
  type MenuItemCategoryFilter,
  type MenuItemStatusFilter,
  type MenuItemTypeFilter
} from './menu-items-toolbar'

export default function MenuItemsView() {
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<MenuItemCategoryFilter>('all')
  const [typeFilter, setTypeFilter] = useState<MenuItemTypeFilter>('all')
  const [statusFilter, setStatusFilter] = useState<MenuItemStatusFilter>('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const [columnVisibility, setColumnVisibility] = useState<MenuItemColumnVisibility>({
    category: true,
    price: true,
    type: true,
    addons: true,
    status: true
  })

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formSession, setFormSession] = useState(0)
  const [pendingDelete, setPendingDelete] = useState<MenuItem | null>(null)

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()

    return items.filter(item => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)

      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
      const matchesType = typeFilter === 'all' || item.dietaryType === typeFilter
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter

      return matchesSearch && matchesCategory && matchesType && matchesStatus
    })
  }, [categoryFilter, items, search, statusFilter, typeFilter])

  const totalCount = filteredItems.length
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const pageStart = (safeCurrentPage - 1) * rowsPerPage
  const paginatedItems = filteredItems.slice(pageStart, pageStart + rowsPerPage)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (value: MenuItemCategoryFilter) => {
    setCategoryFilter(value)
    setCurrentPage(1)
  }

  const handleTypeChange = (value: MenuItemTypeFilter) => {
    setTypeFilter(value)
    setCurrentPage(1)
  }

  const handleStatusChange = (value: MenuItemStatusFilter) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handlePageSizeChange = (value: number) => {
    setRowsPerPage(value)
    setCurrentPage(1)
  }

  const handleColumnVisibilityToggle = (column: MenuItemColumn, visible: boolean) => {
    setColumnVisibility(current => ({ ...current, [column]: visible }))
  }

  const openCreateSheet = () => {
    setEditingItem(null)
    setFormSession(session => session + 1)
    setIsFormOpen(true)
  }

  const openEditSheet = (item: MenuItem) => {
    setEditingItem(item)
    setFormSession(session => session + 1)
    setIsFormOpen(true)
  }

  const handleSaveItem = (values: MenuItemFormValues) => {
    if (editingItem) {
      setItems(current => current.map(item => (item.id === editingItem.id ? { ...item, ...values } : item)))
      toast.success('Menu item updated')
    } else {
      const newItem: MenuItem = { id: crypto.randomUUID(), ...values }

      setItems(current => [newItem, ...current])
      setSearch('')
      setCategoryFilter('all')
      setTypeFilter('all')
      setStatusFilter('all')
      setCurrentPage(1)
      toast.success('Menu item added')
    }

    setEditingItem(null)
    setIsFormOpen(false)
  }

  const handleDuplicateItem = (item: MenuItem) => {
    const duplicate: MenuItem = {
      ...item,
      id: crypto.randomUUID(),
      title: `${item.title} (copy)`
    }

    setItems(current => {
      const itemIndex = current.findIndex(currentItem => currentItem.id === item.id)

      return [...current.slice(0, itemIndex + 1), duplicate, ...current.slice(itemIndex + 1)]
    })
    toast.success('Menu item duplicated')
  }

  const handleDeleteItem = () => {
    if (!pendingDelete) return

    setItems(current => current.filter(item => item.id !== pendingDelete.id))
    toast.success('Menu item deleted')
    setPendingDelete(null)
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Menu Items</h1>
          <FrameDescription>Manage all items available in the POS menu</FrameDescription>
        </div>
        <Button variant='default' onClick={openCreateSheet}>
          <PlusIcon aria-hidden='true' />
          <span>Add Item</span>
        </Button>
      </div>

      <Frame className='w-full'>
        <FrameHeader>
          <MenuItemsToolbar
            search={search}
            onSearchChange={handleSearchChange}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={handleCategoryChange}
            typeFilter={typeFilter}
            onTypeFilterChange={handleTypeChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handlePageSizeChange}
            columnVisibility={columnVisibility}
            onColumnVisibilityToggle={handleColumnVisibilityToggle}
          />
        </FrameHeader>

        <FramePanel className='p-0'>
          <MenuItemsTable
            items={paginatedItems}
            columnVisibility={columnVisibility}
            onEdit={openEditSheet}
            onDuplicate={handleDuplicateItem}
            onDelete={setPendingDelete}
          />
        </FramePanel>

        <FrameFooter>
          <MenuItemsPagination
            total={totalCount}
            rowsPerPage={rowsPerPage}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </FrameFooter>
      </Frame>

      <MenuItemFormSheet
        key={formSession}
        item={editingItem}
        open={isFormOpen}
        onOpenChange={open => {
          setIsFormOpen(open)
          if (!open) setEditingItem(null)
        }}
        onSave={handleSaveItem}
      />

      <ConfirmDialog
        title='Delete menu item?'
        description={`This will permanently remove ${pendingDelete?.title ?? 'this item'} from the POS menu.`}
        cancelLabel='Keep item'
        confirmLabel='Delete item'
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
