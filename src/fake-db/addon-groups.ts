import type { AddonGroup } from '@/types/addon-group-types'

export const mockAddonGroups: AddonGroup[] = [
  {
    id: 'pizza-size',
    name: 'Pizza Size',
    selectionType: 'Single',
    requirement: 'Required',
    options: ['Small', 'Medium', 'Large', 'Extra Large'],
    maxSelect: 1,
    status: 'Active'
  },
  {
    id: 'crust-type',
    name: 'Crust Type',
    selectionType: 'Single',
    requirement: 'Required',
    options: ['Classic', 'Thin', 'Thick', 'Stuffed'],
    maxSelect: 1,
    status: 'Active'
  },
  {
    id: 'extra-toppings',
    name: 'Extra Toppings',
    selectionType: 'Multi',
    requirement: 'Optional',
    options: ['Mushrooms', 'Olives', 'Jalapeños', 'Extra cheese', 'Onions', 'Bell peppers'],
    maxSelect: 4,
    status: 'Active'
  },
  {
    id: 'burger-addons',
    name: 'Burger Add-ons',
    selectionType: 'Multi',
    requirement: 'Optional',
    options: ['Bacon', 'Cheese', 'Avocado', 'Pickles', 'Fried egg'],
    maxSelect: 3,
    status: 'Active'
  },
  {
    id: 'dressing',
    name: 'Dressing',
    selectionType: 'Single',
    requirement: 'Required',
    options: ['Ranch', 'Caesar', 'Balsamic', 'Honey mustard', 'Lemon vinaigrette'],
    maxSelect: 1,
    status: 'Active'
  },
  {
    id: 'bowl-size',
    name: 'Bowl Size',
    selectionType: 'Single',
    requirement: 'Required',
    options: ['Regular', 'Large'],
    maxSelect: 1,
    status: 'Active'
  },
  {
    id: 'size',
    name: 'Size',
    selectionType: 'Single',
    requirement: 'Required',
    options: ['Small', 'Medium', 'Large', 'Extra Large'],
    maxSelect: 1,
    status: 'Active'
  }
]
