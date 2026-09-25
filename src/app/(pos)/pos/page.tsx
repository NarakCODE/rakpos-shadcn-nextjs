import type { Metadata } from 'next'

import PosWorkspace from '@/views/pos/pos-workspace'

export const metadata: Metadata = {
  title: 'Point of sale | RakPOS',
  description: 'Build a sample order in the point of sale workspace.'
}

const PosPage = () => <PosWorkspace />

export default PosPage
