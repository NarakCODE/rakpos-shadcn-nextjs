import type { RestaurantOrder } from '@/types/orders-types'

export const mockOrders: RestaurantOrder[] = [
  {
    id: '1',
    orderNumber: '#1001',
    type: 'Dine-In',
    status: 'Preparing',
    forDestination: 'Table T-02, 2 covers',
    locationSubtitle: 'Table T-02 · 2 covers',
    tableNumber: 'Table T-02',
    coverCount: 2,
    itemCount: 5,
    items: [
      {
        id: '1-1',
        name: 'Margherita Pizza',
        quantity: 1,
        price: 5.58,
        modifiers: 'Medium, Thin crust, Extra mozzarella',
        image: '/images/dashboard/pizza.jpg'
      },
      {
        id: '1-2',
        name: 'Parmesan Truffle Fries',
        quantity: 1,
        price: 4.02,
        modifiers: 'Crispy, Truffle parmesan dip',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '1-3',
        name: 'Fresh Lemon Iced Tea',
        quantity: 2,
        price: 1.42,
        modifiers: 'Less ice, Fresh mint leaves',
        image: '/images/dashboard/poke.jpg'
      },
      {
        id: '1-4',
        name: 'Herb Garlic Dip',
        quantity: 1,
        price: 0.0,
        modifiers: 'House special aioli',
        image: '/images/dashboard/risotto.jpg'
      }
    ],
    subtotal: 12.44,
    taxRate: 5,
    tax: 0.62,
    discount: 0.6,
    total: 12.46,
    placedAt: '26 Sep 2026, 7:52 AM',
    notes: 'Guests requested quick service due to meeting.'
  },
  {
    id: '2',
    orderNumber: '#1002',
    type: 'Takeaway',
    status: 'New',
    forDestination: 'William Thornton',
    locationSubtitle: 'William Thornton · Takeaway Pickup',
    customerName: 'William Thornton',
    itemCount: 2,
    items: [
      {
        id: '2-1',
        name: 'Wagyu Smash Burger',
        quantity: 1,
        price: 15.0,
        modifiers: 'Double patty, Caramelized onions, Brioche bun',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '2-2',
        name: 'Parmesan Truffle Fries',
        quantity: 1,
        price: 6.42,
        modifiers: 'Rosemary salt, Truffle aioli',
        image: '/images/dashboard/burger.jpg'
      }
    ],
    subtotal: 21.42,
    taxRate: 5,
    tax: 1.08,
    total: 22.5,
    placedAt: '26 Sep 2026, 8:15 AM',
    notes: 'Customer will collect at takeaway counter.'
  },
  {
    id: '3',
    orderNumber: '#1003',
    type: 'Delivery',
    status: 'Ready',
    forDestination: 'Sarah Jenkins',
    locationSubtitle: 'Sarah Jenkins · DoorDash Delivery',
    customerName: 'Sarah Jenkins',
    itemCount: 4,
    items: [
      {
        id: '3-1',
        name: 'Fresh Salmon Poke Bowl',
        quantity: 1,
        price: 16.5,
        modifiers: 'Brown rice, Edamame, Spicy mayo, Avocado',
        image: '/images/dashboard/poke.jpg'
      },
      {
        id: '3-2',
        name: 'Mediterranean Greek Salad',
        quantity: 1,
        price: 13.0,
        modifiers: 'Feta cheese, Kalamata olives, Lemon dressing',
        image: '/images/dashboard/poke.jpg'
      },
      {
        id: '3-3',
        name: 'Sparkling Mineral Water',
        quantity: 2,
        price: 1.86,
        modifiers: 'Chilled bottle, Lime wedge',
        image: '/images/dashboard/risotto.jpg'
      }
    ],
    subtotal: 33.22,
    taxRate: 5,
    tax: 1.66,
    total: 34.88,
    placedAt: '26 Sep 2026, 8:40 AM',
    notes: 'Leave at front door with doorman.'
  },
  {
    id: '4',
    orderNumber: '#1004',
    type: 'Dine-In',
    status: 'Served',
    forDestination: 'Table T-05, 4 covers',
    locationSubtitle: 'Table T-05 · 4 covers',
    tableNumber: 'Table T-05',
    coverCount: 4,
    itemCount: 8,
    items: [
      {
        id: '4-1',
        name: 'Wagyu Smash Burger',
        quantity: 2,
        price: 15.0,
        modifiers: 'Brioche bun, Cheddar, Smoked bacon',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '4-2',
        name: 'Creamy Pesto Penne',
        quantity: 2,
        price: 17.5,
        modifiers: 'Basil pesto, Roasted pine nuts, Grana Padano',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '4-3',
        name: 'Parmesan Truffle Fries',
        quantity: 2,
        price: 6.0,
        modifiers: 'Extra crispy',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '4-4',
        name: 'Craft Draft Beer',
        quantity: 2,
        price: 4.5,
        modifiers: 'IPA Pint, Served chilled',
        image: '/images/dashboard/pizza.jpg'
      }
    ],
    subtotal: 81.9,
    taxRate: 5,
    tax: 4.1,
    total: 86.0,
    placedAt: '26 Sep 2026, 9:15 AM'
  },
  {
    id: '5',
    orderNumber: '#1005',
    type: 'Takeaway',
    status: 'Ready',
    forDestination: 'Elena Rostova',
    locationSubtitle: 'Elena Rostova · Takeaway Pickup',
    customerName: 'Elena Rostova',
    itemCount: 3,
    items: [
      {
        id: '5-1',
        name: 'Margherita Pizza',
        quantity: 1,
        price: 12.5,
        modifiers: 'Regular crust, Extra fresh basil',
        image: '/images/dashboard/pizza.jpg'
      },
      {
        id: '5-2',
        name: 'Crispy Chicken Tacos',
        quantity: 1,
        price: 13.0,
        modifiers: 'Chipotle crema, Pickled jalapeños',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '5-3',
        name: 'Italian Blood Orange Soda',
        quantity: 1,
        price: 2.08,
        modifiers: 'Can 330ml',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 27.58,
    taxRate: 5,
    tax: 1.38,
    total: 28.96,
    placedAt: '26 Sep 2026, 9:30 AM'
  },
  {
    id: '6',
    orderNumber: '#1006',
    type: 'Delivery',
    status: 'Preparing',
    forDestination: 'Marcus Vance',
    locationSubtitle: 'Marcus Vance · UberEats Delivery',
    customerName: 'Marcus Vance',
    itemCount: 3,
    items: [
      {
        id: '6-1',
        name: 'Crispy Chicken Tacos',
        quantity: 2,
        price: 13.5,
        modifiers: 'Flour tortilla, Pico de gallo, Lime wedge',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '6-2',
        name: 'Wagyu Smash Burger',
        quantity: 1,
        price: 13.95,
        modifiers: 'No pickles, Extra sauce',
        image: '/images/dashboard/burger.jpg'
      }
    ],
    subtotal: 40.95,
    taxRate: 5,
    tax: 2.05,
    total: 43.0,
    placedAt: '26 Sep 2026, 9:45 AM'
  },
  {
    id: '7',
    orderNumber: '#1007',
    type: 'Dine-In',
    status: 'Cancelled',
    forDestination: 'Table T-01, 1 cover',
    locationSubtitle: 'Table T-01 · 1 cover',
    tableNumber: 'Table T-01',
    coverCount: 1,
    itemCount: 1,
    items: [
      {
        id: '7-1',
        name: 'Mediterranean Greek Salad',
        quantity: 1,
        price: 12.44,
        modifiers: 'Olive oil on side, No onions',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 12.44,
    taxRate: 5,
    tax: 0.62,
    total: 13.06,
    placedAt: '26 Sep 2026, 10:00 AM',
    notes: 'Guest cancelled before preparation started.'
  },
  {
    id: '8',
    orderNumber: '#1008',
    type: 'Dine-In',
    status: 'Served',
    forDestination: 'Table T-08, 6 covers',
    locationSubtitle: 'Table T-08 · 6 covers',
    tableNumber: 'Table T-08',
    coverCount: 6,
    itemCount: 12,
    items: [
      {
        id: '8-1',
        name: 'Truffle Mushroom Risotto',
        quantity: 3,
        price: 20.0,
        modifiers: 'Arborio rice, Wild porcini, Truffle oil',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '8-2',
        name: 'Wagyu Smash Burger',
        quantity: 3,
        price: 15.0,
        modifiers: 'Medium rare, Cheddar, Brioche',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '8-3',
        name: 'Margherita Pizza',
        quantity: 2,
        price: 12.5,
        modifiers: 'Crispy thin crust, Buffalo mozzarella',
        image: '/images/dashboard/pizza.jpg'
      },
      {
        id: '8-4',
        name: 'Chianti Classico Bottle',
        quantity: 1,
        price: 26.67,
        modifiers: 'Vintage 2021, Served in decanter',
        image: '/images/dashboard/pizza.jpg'
      }
    ],
    subtotal: 156.67,
    taxRate: 5,
    tax: 7.83,
    total: 164.5,
    placedAt: '26 Sep 2026, 10:15 AM'
  },
  {
    id: '9',
    orderNumber: '#1009',
    type: 'Takeaway',
    status: 'New',
    forDestination: 'David Miller',
    locationSubtitle: 'David Miller · Takeaway Pickup',
    customerName: 'David Miller',
    itemCount: 2,
    items: [
      {
        id: '9-1',
        name: 'Fresh Salmon Poke Bowl',
        quantity: 1,
        price: 16.5,
        modifiers: 'Sashimi grade salmon, Ponzu dressing',
        image: '/images/dashboard/poke.jpg'
      },
      {
        id: '9-2',
        name: 'Iced Matcha Green Tea Latte',
        quantity: 1,
        price: 3.98,
        modifiers: 'Oat milk, Light sweetness',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 20.48,
    taxRate: 5,
    tax: 1.02,
    total: 21.5,
    placedAt: '26 Sep 2026, 10:30 AM'
  },
  {
    id: '10',
    orderNumber: '#1010',
    type: 'Delivery',
    status: 'Preparing',
    forDestination: 'Aisha Patel',
    locationSubtitle: 'Aisha Patel · Deliveroo Delivery',
    customerName: 'Aisha Patel',
    itemCount: 5,
    items: [
      {
        id: '10-1',
        name: 'Margherita Pizza',
        quantity: 2,
        price: 12.5,
        modifiers: 'Extra basil, Garlic infused olive oil',
        image: '/images/dashboard/pizza.jpg'
      },
      {
        id: '10-2',
        name: 'Creamy Pesto Penne',
        quantity: 1,
        price: 16.0,
        modifiers: 'Gluten-free penne, Roasted cherry tomatoes',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '10-3',
        name: 'Homemade Mint Lemonade',
        quantity: 2,
        price: 2.55,
        modifiers: 'Freshly squeezed, Crushed ice',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 46.1,
    taxRate: 5,
    tax: 2.32,
    total: 48.42,
    placedAt: '26 Sep 2026, 10:45 AM'
  },
  {
    id: '11',
    orderNumber: '#1011',
    type: 'Dine-In',
    status: 'Served',
    forDestination: 'Table T-03, 2 covers',
    locationSubtitle: 'Table T-03 · 2 covers',
    tableNumber: 'Table T-03',
    coverCount: 2,
    itemCount: 4,
    items: [
      {
        id: '11-1',
        name: 'Crispy Chicken Tacos',
        quantity: 2,
        price: 14.0,
        modifiers: 'Cilantro lime rice, Guacamole',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '11-2',
        name: 'Craft Draft Beer',
        quantity: 2,
        price: 4.1,
        modifiers: 'Lager, Chilled mug',
        image: '/images/dashboard/pizza.jpg'
      }
    ],
    subtotal: 36.2,
    taxRate: 5,
    tax: 1.8,
    total: 38.0,
    placedAt: '26 Sep 2026, 11:00 AM'
  },
  {
    id: '12',
    orderNumber: '#1012',
    type: 'Takeaway',
    status: 'Served',
    forDestination: 'James Wilson',
    locationSubtitle: 'James Wilson · Takeaway Pickup',
    customerName: 'James Wilson',
    itemCount: 1,
    items: [
      {
        id: '12-1',
        name: 'Wagyu Smash Burger',
        quantity: 1,
        price: 14.28,
        modifiers: 'Medium, Swiss cheese, Truffle mayo',
        image: '/images/dashboard/burger.jpg'
      }
    ],
    subtotal: 14.28,
    taxRate: 5,
    tax: 0.72,
    total: 15.0,
    placedAt: '26 Sep 2026, 11:10 AM'
  },
  {
    id: '13',
    orderNumber: '#1013',
    type: 'Dine-In',
    status: 'Preparing',
    forDestination: 'Table T-06, 3 covers',
    locationSubtitle: 'Table T-06 · 3 covers',
    tableNumber: 'Table T-06',
    coverCount: 3,
    itemCount: 6,
    items: [
      {
        id: '13-1',
        name: 'Creamy Pesto Penne',
        quantity: 2,
        price: 17.5,
        modifiers: 'Al dente, Extra parmesan on side',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '13-2',
        name: 'Truffle Mushroom Risotto',
        quantity: 1,
        price: 19.5,
        modifiers: 'Wild forest mushrooms',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '13-3',
        name: 'Signature Tropical Mocktail',
        quantity: 3,
        price: 3.89,
        modifiers: 'Passion fruit & coconut foam',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 66.17,
    taxRate: 5,
    tax: 3.33,
    total: 69.5,
    placedAt: '26 Sep 2026, 11:20 AM'
  },
  {
    id: '14',
    orderNumber: '#1014',
    type: 'Delivery',
    status: 'Cancelled',
    forDestination: 'Chloe Bennet',
    locationSubtitle: 'Chloe Bennet · Grubhub Delivery',
    customerName: 'Chloe Bennet',
    itemCount: 2,
    items: [
      {
        id: '14-1',
        name: 'Margherita Pizza',
        quantity: 1,
        price: 12.5,
        modifiers: 'Extra crispy crust',
        image: '/images/dashboard/pizza.jpg'
      },
      {
        id: '14-2',
        name: 'Mediterranean Greek Salad',
        quantity: 1,
        price: 12.22,
        modifiers: 'Greek vinaigrette dressing',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 24.72,
    taxRate: 5,
    tax: 1.24,
    total: 25.96,
    placedAt: '26 Sep 2026, 11:25 AM',
    notes: 'Cancelled due to customer address outside delivery boundary.'
  },
  {
    id: '15',
    orderNumber: '#1015',
    type: 'Dine-In',
    status: 'New',
    forDestination: 'Table T-04, 2 covers',
    locationSubtitle: 'Table T-04 · 2 covers',
    tableNumber: 'Table T-04',
    coverCount: 2,
    itemCount: 3,
    items: [
      {
        id: '15-1',
        name: 'Truffle Mushroom Risotto',
        quantity: 1,
        price: 20.0,
        modifiers: 'Fresh shaved black truffles',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '15-2',
        name: 'Fresh Salmon Poke Bowl',
        quantity: 1,
        price: 16.5,
        modifiers: 'Sesame ginger soy sauce',
        image: '/images/dashboard/poke.jpg'
      },
      {
        id: '15-3',
        name: 'House Italian Soda',
        quantity: 1,
        price: 3.02,
        modifiers: 'Blood orange & mint',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 39.52,
    taxRate: 5,
    tax: 1.98,
    total: 41.5,
    placedAt: '26 Sep 2026, 11:35 AM'
  },
  {
    id: '16',
    orderNumber: '#1016',
    type: 'Delivery',
    status: 'Ready',
    forDestination: 'Liam Henderson',
    locationSubtitle: 'Liam Henderson · DoorDash Delivery',
    customerName: 'Liam Henderson',
    itemCount: 3,
    items: [
      {
        id: '16-1',
        name: 'Wagyu Smash Burger',
        quantity: 2,
        price: 15.0,
        modifiers: 'Double patty, Pepper jack cheese',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '16-2',
        name: 'Parmesan Truffle Fries',
        quantity: 1,
        price: 6.0,
        modifiers: 'Extra parmesan on side',
        image: '/images/dashboard/burger.jpg'
      }
    ],
    subtotal: 36.0,
    taxRate: 5,
    tax: 1.8,
    total: 37.8,
    placedAt: '26 Sep 2026, 11:45 AM',
    notes: 'Driver will pick up in thermal bag.'
  },
  {
    id: '17',
    orderNumber: '#1017',
    type: 'Dine-In',
    status: 'Preparing',
    forDestination: 'Table T-07, 4 covers',
    locationSubtitle: 'Table T-07 · 4 covers',
    tableNumber: 'Table T-07',
    coverCount: 4,
    itemCount: 4,
    items: [
      {
        id: '17-1',
        name: 'Margherita Pizza',
        quantity: 2,
        price: 12.5,
        modifiers: 'Gluten-free crust, Fresh basil',
        image: '/images/dashboard/pizza.jpg'
      },
      {
        id: '17-2',
        name: 'Truffle Mushroom Risotto',
        quantity: 2,
        price: 20.0,
        modifiers: 'Extra virgin olive oil finish',
        image: '/images/dashboard/risotto.jpg'
      }
    ],
    subtotal: 65.0,
    taxRate: 5,
    tax: 3.25,
    total: 68.25,
    placedAt: '26 Sep 2026, 12:00 PM'
  },
  {
    id: '18',
    orderNumber: '#1018',
    type: 'Takeaway',
    status: 'New',
    forDestination: 'Sophia Martinez',
    locationSubtitle: 'Sophia Martinez · Takeaway Pickup',
    customerName: 'Sophia Martinez',
    itemCount: 2,
    items: [
      {
        id: '18-1',
        name: 'Fresh Salmon Poke Bowl',
        quantity: 1,
        price: 16.5,
        modifiers: 'Quinoa base, Extra avocado',
        image: '/images/dashboard/poke.jpg'
      },
      {
        id: '18-2',
        name: 'Fresh Lemon Iced Tea',
        quantity: 1,
        price: 3.5,
        modifiers: 'No sugar added',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 20.0,
    taxRate: 5,
    tax: 1.0,
    total: 21.0,
    placedAt: '26 Sep 2026, 12:10 PM'
  },
  {
    id: '19',
    orderNumber: '#1019',
    type: 'Dine-In',
    status: 'Served',
    forDestination: 'Table T-09, 2 covers',
    locationSubtitle: 'Table T-09 · 2 covers',
    tableNumber: 'Table T-09',
    coverCount: 2,
    itemCount: 4,
    items: [
      {
        id: '19-1',
        name: 'Creamy Pesto Penne',
        quantity: 2,
        price: 17.5,
        modifiers: 'Sun-dried tomatoes, Pine nuts',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '19-2',
        name: 'Sparkling Mineral Water',
        quantity: 2,
        price: 2.0,
        modifiers: 'Lemon slice on side',
        image: '/images/dashboard/risotto.jpg'
      }
    ],
    subtotal: 39.0,
    taxRate: 5,
    tax: 1.95,
    total: 40.95,
    placedAt: '26 Sep 2026, 12:20 PM'
  },
  {
    id: '20',
    orderNumber: '#1020',
    type: 'Delivery',
    status: 'Preparing',
    forDestination: 'Ethan Brooks',
    locationSubtitle: 'Ethan Brooks · Deliveroo Delivery',
    customerName: 'Ethan Brooks',
    itemCount: 4,
    items: [
      {
        id: '20-1',
        name: 'Crispy Chicken Tacos',
        quantity: 3,
        price: 13.5,
        modifiers: 'Extra spicy salsa',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '20-2',
        name: 'Parmesan Truffle Fries',
        quantity: 1,
        price: 6.5,
        modifiers: 'Well done',
        image: '/images/dashboard/burger.jpg'
      }
    ],
    subtotal: 47.0,
    taxRate: 5,
    tax: 2.35,
    total: 49.35,
    placedAt: '26 Sep 2026, 12:35 PM'
  },
  {
    id: '21',
    orderNumber: '#1021',
    type: 'Dine-In',
    status: 'Ready',
    forDestination: 'Table T-02, 2 covers',
    locationSubtitle: 'Table T-02 · 2 covers',
    tableNumber: 'Table T-02',
    coverCount: 2,
    itemCount: 4,
    items: [
      {
        id: '21-1',
        name: 'Wagyu Smash Burger',
        quantity: 2,
        price: 15.0,
        modifiers: 'Medium, No mustard',
        image: '/images/dashboard/burger.jpg'
      },
      {
        id: '21-2',
        name: 'Craft Draft Beer',
        quantity: 2,
        price: 4.5,
        modifiers: 'Pilsner',
        image: '/images/dashboard/pizza.jpg'
      }
    ],
    subtotal: 39.0,
    taxRate: 5,
    tax: 1.95,
    total: 40.95,
    placedAt: '26 Sep 2026, 12:45 PM'
  },
  {
    id: '22',
    orderNumber: '#1022',
    type: 'Takeaway',
    status: 'Cancelled',
    forDestination: 'Olivia Taylor',
    locationSubtitle: 'Olivia Taylor · Takeaway Pickup',
    customerName: 'Olivia Taylor',
    itemCount: 1,
    items: [
      {
        id: '22-1',
        name: 'Margherita Pizza',
        quantity: 1,
        price: 12.5,
        modifiers: 'Standard',
        image: '/images/dashboard/pizza.jpg'
      }
    ],
    subtotal: 12.5,
    taxRate: 5,
    tax: 0.63,
    total: 13.13,
    placedAt: '26 Sep 2026, 12:50 PM',
    notes: 'Customer placed duplicate order by mistake.'
  },
  {
    id: '23',
    orderNumber: '#1023',
    type: 'Dine-In',
    status: 'New',
    forDestination: 'Table T-10, 5 covers',
    locationSubtitle: 'Table T-10 · 5 covers',
    tableNumber: 'Table T-10',
    coverCount: 5,
    itemCount: 9,
    items: [
      {
        id: '23-1',
        name: 'Truffle Mushroom Risotto',
        quantity: 2,
        price: 20.0,
        modifiers: 'Porcini mushrooms, Extra truffle',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '23-2',
        name: 'Margherita Pizza',
        quantity: 2,
        price: 13.0,
        modifiers: 'Crisp crust, Basil leaves',
        image: '/images/dashboard/pizza.jpg'
      },
      {
        id: '23-3',
        name: 'Mediterranean Greek Salad',
        quantity: 1,
        price: 13.0,
        modifiers: 'Dressing on the side',
        image: '/images/dashboard/poke.jpg'
      },
      {
        id: '23-4',
        name: 'Signature Tropical Mocktail',
        quantity: 4,
        price: 4.0,
        modifiers: 'Served with crushed ice',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 95.0,
    taxRate: 5,
    tax: 4.75,
    total: 99.75,
    placedAt: '26 Sep 2026, 1:00 PM'
  },
  {
    id: '24',
    orderNumber: '#1024',
    type: 'Delivery',
    status: 'Served',
    forDestination: 'Daniel Kim',
    locationSubtitle: 'Daniel Kim · UberEats Delivery',
    customerName: 'Daniel Kim',
    itemCount: 2,
    items: [
      {
        id: '24-1',
        name: 'Fresh Salmon Poke Bowl',
        quantity: 2,
        price: 16.5,
        modifiers: 'Spicy sriracha, Furikake seasoning',
        image: '/images/dashboard/poke.jpg'
      }
    ],
    subtotal: 33.0,
    taxRate: 5,
    tax: 1.65,
    total: 34.65,
    placedAt: '26 Sep 2026, 1:15 PM'
  },
  {
    id: '25',
    orderNumber: '#1025',
    type: 'Takeaway',
    status: 'Preparing',
    forDestination: 'Grace Hopper',
    locationSubtitle: 'Grace Hopper · Takeaway Pickup',
    customerName: 'Grace Hopper',
    itemCount: 2,
    items: [
      {
        id: '25-1',
        name: 'Creamy Pesto Penne',
        quantity: 1,
        price: 17.0,
        modifiers: 'Nut-free pesto',
        image: '/images/dashboard/risotto.jpg'
      },
      {
        id: '25-2',
        name: 'Herb Garlic Dip',
        quantity: 1,
        price: 1.5,
        modifiers: 'Standard',
        image: '/images/dashboard/risotto.jpg'
      }
    ],
    subtotal: 18.5,
    taxRate: 5,
    tax: 0.93,
    total: 19.43,
    placedAt: '26 Sep 2026, 1:30 PM'
  }
]
