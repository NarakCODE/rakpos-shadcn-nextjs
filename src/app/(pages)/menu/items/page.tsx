import type { Metadata } from 'next'

import MenuItemsView from '@/views/menu-items'

export const metadata: Metadata = {
  title: 'Menu Items | RakPOS',
  description: 'Manage all items available in the POS menu.'
}

const MenuItemsPage = () => <MenuItemsView />

export default MenuItemsPage
