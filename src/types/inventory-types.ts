export const INVENTORY_CATEGORIES = [
  'Grains',
  'Dairy',
  'Vegetables',
  'Proteins',
  'Essentials',
  'Spices'
] as const

export type InventoryCategory = (typeof INVENTORY_CATEGORIES)[number]

export const INVENTORY_STATUSES = ['Adequate', 'Low Stock', 'Out of Stock'] as const

export type InventoryStatus = (typeof INVENTORY_STATUSES)[number]

export const INVENTORY_UNITS = ['kg', 'ltr', 'pcs', 'g', 'ml'] as const

export type InventoryUnit = (typeof INVENTORY_UNITS)[number]

export type InventoryItem = {
  id: string
  name: string
  category: InventoryCategory
  unit: InventoryUnit
  currentStock: number
  minStock: number
  maxStock: number
  status: InventoryStatus
  lastUpdated: string
  costPerUnit: number
  notes?: string
}

export type InventoryItemFormValues = {
  name: string
  category: InventoryCategory
  unit: InventoryUnit
  currentStock: number
  minStock: number
  maxStock: number
  costPerUnit: number
  notes?: string
}

export type InventoryAdjustmentReason =
  | 'Received shipment'
  | 'Kitchen usage'
  | 'Inventory recount / audit'
  | 'Wastage / damaged'
  | 'Return to vendor'

export type InventoryAdjustmentValues = {
  mode: 'set' | 'add' | 'subtract'
  quantity: number
  reason: InventoryAdjustmentReason
  notes?: string
}
