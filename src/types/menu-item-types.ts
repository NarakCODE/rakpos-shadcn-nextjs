export const MENU_CATEGORIES = ['Pizza', 'Burgers', 'Salads', 'Soups', 'Desserts', 'Drinks'] as const

export type MenuCategoryName = (typeof MENU_CATEGORIES)[number]
export type DietaryType = 'Veg' | 'Non-Veg' | 'Egg'
export type MenuItemStatus = 'Active' | 'Inactive'

export type MenuItem = {
  id: string
  title: string
  description: string
  category: MenuCategoryName
  price: number
  dietaryType: DietaryType
  addonGroupCount: number
  status: MenuItemStatus
  image: string
}

export type MenuItemFormValues = Omit<MenuItem, 'id'>
export type MenuItemColumn = 'category' | 'price' | 'type' | 'addons' | 'status'
export type MenuItemColumnVisibility = Record<MenuItemColumn, boolean>
