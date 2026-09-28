import type { Metadata } from 'next'

import CategoriesView from '@/views/categories'

export const metadata: Metadata = {
  title: 'Categories | RakPOS',
  description: 'Manage food and beverage categories for the menu.'
}

const CategoriesPage = () => <CategoriesView />

export default CategoriesPage
