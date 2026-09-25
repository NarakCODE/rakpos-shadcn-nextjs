import type { ReactNode } from 'react'

import PosHeader from '@/components/layout/pos-header'

const PosLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='bg-muted/30 flex min-h-dvh w-full flex-col'>
      <PosHeader />
      <div className='flex w-full flex-1 flex-col'>{children}</div>
    </div>
  )
}

export default PosLayout
