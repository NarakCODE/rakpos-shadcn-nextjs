export type CategoryStatus = 'Active' | 'Inactive'

export type MenuCategory = {
  id: string
  index: number
  icon: string
  name: string
  description: string
  status: CategoryStatus
}

export const mockCategories: MenuCategory[] = [
  {
    id: 'pizza',
    index: 1,
    icon: '🍕',
    name: 'Pizza',
    description: 'Stone-baked pizzas in every size',
    status: 'Active'
  },
  {
    id: 'burgers',
    index: 2,
    icon: '🍔',
    name: 'Burgers',
    description: 'Handcrafted burgers and sliders',
    status: 'Active'
  },
  {
    id: 'salads',
    index: 3,
    icon: '🥗',
    name: 'Salads',
    description: 'Fresh salads with house dressings',
    status: 'Active'
  },
  {
    id: 'soups',
    index: 4,
    icon: '🍲',
    name: 'Soups',
    description: 'Warm soups made from scratch daily',
    status: 'Active'
  },
  {
    id: 'desserts',
    index: 5,
    icon: '🍰',
    name: 'Desserts',
    description: 'Sweet endings and indulgent treats',
    status: 'Active'
  },
  {
    id: 'drinks',
    index: 6,
    icon: '🥤',
    name: 'Drinks',
    description: 'Cold beverages and fresh juices',
    status: 'Active'
  }
]
