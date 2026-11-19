import type { InventoryItem, InventoryStatus } from '@/types/inventory-types'

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export function calculateStockLevel(currentStock: number, maxStock: number): number {
  if (maxStock <= 0) return 0

  return Math.min(100, Math.round((currentStock / maxStock) * 100))
}

export function determineStatus(currentStock: number, minStock: number): InventoryStatus {
  if (currentStock <= 0) {
    return 'Out of Stock'
  }

  if (currentStock <= minStock) {
    return 'Low Stock'
  }

  return 'Adequate'
}

export function exportInventoryToCsv(items: InventoryItem[], filename = 'inventory-report.csv') {
  const headers = [
    'Item Name',
    'Category',
    'Unit',
    'Current Stock',
    'Level (% of Max)',
    'Min Stock',
    'Max Stock',
    'Status',
    'Cost Per Unit ($)',
    'Total Value ($)',
    'Last Updated',
    'Notes'
  ]

  const rows = items.map(item => [
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.category}"`,
    `"${item.unit}"`,
    item.currentStock,
    `"${calculateStockLevel(item.currentStock, item.maxStock)}%"`,
    item.minStock,
    item.maxStock,
    `"${item.status}"`,
    item.costPerUnit.toFixed(2),
    (item.currentStock * item.costPerUnit).toFixed(2),
    `"${item.lastUpdated}"`,
    `"${(item.notes ?? '').replace(/"/g, '""')}"`
  ])

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
