export type PosCategory = 'Mains' | 'Burgers' | 'Pizza' | 'Bowls' | 'Pasta' | 'Salads' | 'Bakery'

export type PricedOption = { id: string; label: string; priceCents: number }

export type OptionGroup =
  | { id: string; label: string; mode: 'single'; defaultId: string; options: PricedOption[] }
  | {
      id: string
      label: string
      mode: 'multiple'
      defaultIds: string[]
      maxSelections: number
      options: PricedOption[]
    }

export type ProductCustomizations = { options: OptionGroup[]; addOns: PricedOption[] }

const pizzaOptions: OptionGroup[] = [
  {
    id: 'size',
    label: 'Pizza Size',
    mode: 'single',
    defaultId: 'personal',
    options: [
      { id: 'personal', label: 'Personal 7"', priceCents: 0 },
      { id: 'regular', label: 'Regular 10"', priceCents: 119 },
      { id: 'large', label: 'Large 12"', priceCents: 190 },
      { id: 'xl', label: 'XL 14"', priceCents: 262 }
    ]
  },
  {
    id: 'crust',
    label: 'Crust Type',
    mode: 'single',
    defaultId: 'thin',
    options: [
      { id: 'thin', label: 'Thin Crust', priceCents: 0 },
      { id: 'hand-tossed', label: 'Hand-Tossed', priceCents: 0 },
      { id: 'cheese-stuffed', label: 'Cheese Stuffed', priceCents: 95 },
      { id: 'whole-wheat', label: 'Whole Wheat', priceCents: 0 }
    ]
  },
  {
    id: 'toppings',
    label: 'Extra Toppings',
    mode: 'multiple',
    defaultIds: ['extra-cheese'],
    maxSelections: 4,
    options: [
      { id: 'extra-cheese', label: 'Extra Cheese', priceCents: 71 },
      { id: 'mushrooms', label: 'Mushrooms', priceCents: 48 },
      { id: 'black-olives', label: 'Black Olives', priceCents: 48 },
      { id: 'jalapenos', label: 'Jalapeños', priceCents: 36 },
      { id: 'bell-peppers', label: 'Bell Peppers', priceCents: 36 },
      { id: 'sweet-corn', label: 'Sweet Corn', priceCents: 30 }
    ]
  }
]

export const categoryCustomizations: Record<PosCategory, ProductCustomizations> = {
  Mains: {
    options: [
      {
        id: 'portion',
        label: 'Portion',
        mode: 'single',
        defaultId: 'regular',
        options: [
          { id: 'regular', label: 'Regular', priceCents: 0 },
          { id: 'large', label: 'Large', priceCents: 300 }
        ]
      }
    ],
    addOns: [
      { id: 'side-salad', label: 'Side Salad', priceCents: 143 },
      { id: 'roasted-vegetables', label: 'Roasted Vegetables', priceCents: 190 },
      { id: 'garlic-bread', label: 'Garlic Bread', priceCents: 119 }
    ]
  },
  Burgers: {
    options: [
      {
        id: 'bun',
        label: 'Bun',
        mode: 'single',
        defaultId: 'classic',
        options: [
          { id: 'classic', label: 'Classic Bun', priceCents: 0 },
          { id: 'brioche', label: 'Brioche Bun', priceCents: 50 },
          { id: 'lettuce-wrap', label: 'Lettuce Wrap', priceCents: 0 }
        ]
      }
    ],
    addOns: [
      { id: 'cheddar', label: 'Extra Cheddar', priceCents: 75 },
      { id: 'fries', label: 'Fries', priceCents: 250 },
      { id: 'fried-egg', label: 'Fried Egg', priceCents: 100 }
    ]
  },
  Pizza: {
    options: pizzaOptions,
    addOns: [
      { id: 'garlic-bread', label: 'Garlic Bread', priceCents: 119 },
      { id: 'side-salad', label: 'Side Salad', priceCents: 143 },
      { id: 'soft-drink', label: 'Soft Drink', priceCents: 95 }
    ]
  },
  Bowls: {
    options: [
      {
        id: 'base',
        label: 'Base',
        mode: 'single',
        defaultId: 'white-rice',
        options: [
          { id: 'white-rice', label: 'White Rice', priceCents: 0 },
          { id: 'brown-rice', label: 'Brown Rice', priceCents: 0 },
          { id: 'greens', label: 'Mixed Greens', priceCents: 0 }
        ]
      }
    ],
    addOns: [
      { id: 'avocado', label: 'Avocado', priceCents: 150 },
      { id: 'edamame', label: 'Edamame', priceCents: 100 },
      { id: 'sesame-sauce', label: 'Sesame Sauce', priceCents: 50 }
    ]
  },
  Pasta: {
    options: [
      {
        id: 'spice',
        label: 'Spice Level',
        mode: 'single',
        defaultId: 'mild',
        options: [
          { id: 'mild', label: 'Mild', priceCents: 0 },
          { id: 'medium', label: 'Medium', priceCents: 0 },
          { id: 'hot', label: 'Hot', priceCents: 0 }
        ]
      }
    ],
    addOns: [
      { id: 'parmesan', label: 'Extra Parmesan', priceCents: 75 },
      { id: 'mushrooms', label: 'Mushrooms', priceCents: 100 },
      { id: 'garlic-bread', label: 'Garlic Bread', priceCents: 119 }
    ]
  },
  Salads: {
    options: [
      {
        id: 'dressing',
        label: 'Dressing',
        mode: 'single',
        defaultId: 'vinaigrette',
        options: [
          { id: 'vinaigrette', label: 'Vinaigrette', priceCents: 0 },
          { id: 'olive-oil', label: 'Olive Oil', priceCents: 0 },
          { id: 'ranch', label: 'Ranch', priceCents: 0 }
        ]
      }
    ],
    addOns: [
      { id: 'feta', label: 'Extra Feta', priceCents: 100 },
      { id: 'avocado', label: 'Avocado', priceCents: 150 },
      { id: 'olives', label: 'Olives', priceCents: 75 }
    ]
  },
  Bakery: {
    options: [
      {
        id: 'serving',
        label: 'Serving',
        mode: 'single',
        defaultId: 'warm',
        options: [
          { id: 'warm', label: 'Warm', priceCents: 0 },
          { id: 'room-temperature', label: 'Room Temperature', priceCents: 0 }
        ]
      }
    ],
    addOns: [
      { id: 'side-salad', label: 'Side Salad', priceCents: 143 },
      { id: 'fruit', label: 'Fresh Fruit', priceCents: 150 },
      { id: 'coffee', label: 'Coffee', priceCents: 200 }
    ]
  }
}

export const productCustomizations: Partial<Record<string, ProductCustomizations>> = {
  'acai-bowl': {
    options: [
      {
        id: 'size',
        label: 'Bowl Size',
        mode: 'single',
        defaultId: 'regular',
        options: [
          { id: 'regular', label: 'Regular', priceCents: 0 },
          { id: 'large', label: 'Large', priceCents: 250 }
        ]
      }
    ],
    addOns: [
      { id: 'granola', label: 'Extra Granola', priceCents: 100 },
      { id: 'berries', label: 'Fresh Berries', priceCents: 150 },
      { id: 'peanut-butter', label: 'Peanut Butter', priceCents: 75 }
    ]
  }
}

export function getProductCustomizations(product: { id: string; category: PosCategory }): ProductCustomizations {
  return productCustomizations[product.id] ?? categoryCustomizations[product.category]
}
