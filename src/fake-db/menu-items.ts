import type { MenuItem } from '@/types/menu-item-types'

const pizzaImage = '/images/dashboard/pizza.jpg'
const burgerImage = '/images/dashboard/burger.jpg'
const saladImage = '/images/dashboard/poke.jpg'
const bowlImage = '/images/dashboard/risotto.jpg'

export const mockMenuItems: MenuItem[] = [
  {
    id: 'margherita-pizza',
    title: 'Margherita Pizza',
    description: 'Classic tomato base with mozzarella and fresh basil',
    category: 'Pizza',
    price: 2.96,
    dietaryType: 'Veg',
    addonGroupCount: 3,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'pepperoni-pizza',
    title: 'Pepperoni Pizza',
    description: 'Loaded with pepperoni slices on a rich tomato sauce',
    category: 'Pizza',
    price: 3.56,
    dietaryType: 'Non-Veg',
    addonGroupCount: 3,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'bbq-chicken-pizza',
    title: 'BBQ Chicken Pizza',
    description: 'Smoky BBQ sauce, grilled chicken, red onions and cilantro',
    category: 'Pizza',
    price: 3.92,
    dietaryType: 'Non-Veg',
    addonGroupCount: 3,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'veggie-supreme',
    title: 'Veggie Supreme',
    description: 'Garden-fresh vegetables on a herb-seasoned tomato base',
    category: 'Pizza',
    price: 3.32,
    dietaryType: 'Veg',
    addonGroupCount: 3,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'egg-cheese-pizza',
    title: 'Egg & Cheese Pizza',
    description: 'Sunny-side egg, four-cheese blend and chilli flakes on a crispy base',
    category: 'Pizza',
    price: 3.44,
    dietaryType: 'Egg',
    addonGroupCount: 3,
    status: 'Inactive',
    image: pizzaImage
  },
  {
    id: 'mushroom-truffle-pizza',
    title: 'Mushroom Truffle Pizza',
    description: 'Wild mushrooms, truffle oil and mozzarella on a white garlic base',
    category: 'Pizza',
    price: 3.72,
    dietaryType: 'Veg',
    addonGroupCount: 3,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'classic-beef-burger',
    title: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato and special sauce',
    category: 'Burgers',
    price: 2.96,
    dietaryType: 'Non-Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: burgerImage
  },
  {
    id: 'crispy-chicken-burger',
    title: 'Crispy Chicken Burger',
    description: 'Crispy fried chicken fillet with coleslaw and mayo',
    category: 'Burgers',
    price: 2.61,
    dietaryType: 'Non-Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: burgerImage
  },
  {
    id: 'garden-veggie-burger',
    title: 'Garden Veggie Burger',
    description: 'Plant-based patty with avocado spread and fresh greens',
    category: 'Burgers',
    price: 2.25,
    dietaryType: 'Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: burgerImage
  },
  {
    id: 'double-smash-burger',
    title: 'Double Smash Burger',
    description: 'Two smashed beef patties with American cheese and pickles',
    category: 'Burgers',
    price: 3.92,
    dietaryType: 'Non-Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: burgerImage
  },
  {
    id: 'four-cheese-pizza',
    title: 'Four Cheese Pizza',
    description: 'Mozzarella, cheddar, parmesan and blue cheese on a crisp base',
    category: 'Pizza',
    price: 3.78,
    dietaryType: 'Veg',
    addonGroupCount: 3,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'garden-pesto-pizza',
    title: 'Garden Pesto Pizza',
    description: 'Basil pesto, roasted peppers and seasonal vegetables',
    category: 'Pizza',
    price: 3.48,
    dietaryType: 'Veg',
    addonGroupCount: 3,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'spicy-sausage-pizza',
    title: 'Spicy Sausage Pizza',
    description: 'Italian sausage, chilli oil and melted mozzarella',
    category: 'Pizza',
    price: 3.88,
    dietaryType: 'Non-Veg',
    addonGroupCount: 3,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'garlic-herb-pizza',
    title: 'Garlic Herb Pizza',
    description: 'Roasted garlic, herbs and mozzarella on a golden crust',
    category: 'Pizza',
    price: 2.85,
    dietaryType: 'Veg',
    addonGroupCount: 2,
    status: 'Active',
    image: pizzaImage
  },
  {
    id: 'bbq-ranch-burger',
    title: 'BBQ Ranch Burger',
    description: 'Grilled beef, smoky barbecue sauce and house ranch',
    category: 'Burgers',
    price: 3.45,
    dietaryType: 'Non-Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: burgerImage
  },
  {
    id: 'mushroom-swiss-burger',
    title: 'Mushroom Swiss Burger',
    description: 'Sautéed mushrooms, Swiss cheese and toasted brioche',
    category: 'Burgers',
    price: 3.56,
    dietaryType: 'Non-Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: burgerImage
  },
  {
    id: 'spicy-chicken-stack',
    title: 'Spicy Chicken Stack',
    description: 'Crispy chicken, pepper jack and chipotle mayo',
    category: 'Burgers',
    price: 3.12,
    dietaryType: 'Non-Veg',
    addonGroupCount: 1,
    status: 'Inactive',
    image: burgerImage
  },
  {
    id: 'greek-garden-salad',
    title: 'Greek Garden Salad',
    description: 'Cucumber, tomato, olives and crumbled feta',
    category: 'Salads',
    price: 2.85,
    dietaryType: 'Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: saladImage
  },
  {
    id: 'classic-caesar-salad',
    title: 'Classic Caesar Salad',
    description: 'Romaine, parmesan, crisp croutons and Caesar dressing',
    category: 'Salads',
    price: 3.2,
    dietaryType: 'Egg',
    addonGroupCount: 2,
    status: 'Active',
    image: saladImage
  },
  {
    id: 'grilled-chicken-salad',
    title: 'Grilled Chicken Salad',
    description: 'Chargrilled chicken, greens and lemon herb dressing',
    category: 'Salads',
    price: 3.89,
    dietaryType: 'Non-Veg',
    addonGroupCount: 2,
    status: 'Active',
    image: saladImage
  },
  {
    id: 'tomato-basil-soup',
    title: 'Tomato Basil Soup',
    description: 'Slow-simmered tomatoes, sweet basil and cream',
    category: 'Soups',
    price: 1.95,
    dietaryType: 'Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: bowlImage
  },
  {
    id: 'creamy-mushroom-soup',
    title: 'Creamy Mushroom Soup',
    description: 'Wild mushrooms blended with thyme and cream',
    category: 'Soups',
    price: 2.25,
    dietaryType: 'Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: bowlImage
  },
  {
    id: 'roasted-pumpkin-soup',
    title: 'Roasted Pumpkin Soup',
    description: 'Roasted pumpkin, warm spices and toasted seeds',
    category: 'Soups',
    price: 2.05,
    dietaryType: 'Veg',
    addonGroupCount: 1,
    status: 'Active',
    image: bowlImage
  },
  {
    id: 'chocolate-lava-cake',
    title: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a soft molten centre',
    category: 'Desserts',
    price: 2.45,
    dietaryType: 'Egg',
    addonGroupCount: 1,
    status: 'Active',
    image: bowlImage
  },
  {
    id: 'new-york-cheesecake',
    title: 'New York Cheesecake',
    description: 'Creamy baked cheesecake with a buttery biscuit base',
    category: 'Desserts',
    price: 2.85,
    dietaryType: 'Egg',
    addonGroupCount: 1,
    status: 'Active',
    image: bowlImage
  },
  {
    id: 'tiramisu-cup',
    title: 'Tiramisu Cup',
    description: 'Espresso-soaked sponge layered with mascarpone cream',
    category: 'Desserts',
    price: 2.6,
    dietaryType: 'Egg',
    addonGroupCount: 1,
    status: 'Active',
    image: bowlImage
  },
  {
    id: 'brownie-sundae',
    title: 'Brownie Sundae',
    description: 'Fudgy brownie, vanilla ice cream and chocolate sauce',
    category: 'Desserts',
    price: 2.5,
    dietaryType: 'Egg',
    addonGroupCount: 1,
    status: 'Inactive',
    image: bowlImage
  },
  {
    id: 'fresh-lemonade',
    title: 'Fresh Lemonade',
    description: 'Freshly squeezed lemons with a touch of cane sugar',
    category: 'Drinks',
    price: 1.25,
    dietaryType: 'Veg',
    addonGroupCount: 0,
    status: 'Active',
    image: saladImage
  },
  {
    id: 'iced-latte',
    title: 'Iced Latte',
    description: 'Double espresso poured over chilled milk and ice',
    category: 'Drinks',
    price: 1.85,
    dietaryType: 'Veg',
    addonGroupCount: 0,
    status: 'Active',
    image: saladImage
  },
  {
    id: 'orange-juice',
    title: 'Orange Juice',
    description: 'Freshly pressed oranges served chilled',
    category: 'Drinks',
    price: 1.5,
    dietaryType: 'Veg',
    addonGroupCount: 0,
    status: 'Active',
    image: saladImage
  },
  {
    id: 'mango-smoothie',
    title: 'Mango Smoothie',
    description: 'Ripe mango blended with yoghurt and a splash of milk',
    category: 'Drinks',
    price: 2.15,
    dietaryType: 'Veg',
    addonGroupCount: 0,
    status: 'Active',
    image: saladImage
  },
  {
    id: 'sparkling-citrus-water',
    title: 'Sparkling Citrus Water',
    description: 'Sparkling water with fresh lime and orange',
    category: 'Drinks',
    price: 1,
    dietaryType: 'Veg',
    addonGroupCount: 0,
    status: 'Active',
    image: saladImage
  }
]
