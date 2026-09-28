import type { Metadata } from 'next'

import AddonGroupsView from '@/views/addon-groups'

export const metadata: Metadata = {
  title: 'Addon Groups | RakPOS',
  description: 'Manage customization options available for menu items.'
}

const AddonGroupsPage = () => <AddonGroupsView />

export default AddonGroupsPage
