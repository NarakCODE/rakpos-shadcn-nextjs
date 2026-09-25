'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/assets/svg/logo'
import ModeToggle from '@/components/layout/ModeToggle'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const navigation = [
  { label: 'Orders', href: '/orders' },
  { label: 'Kitchen', href: '/kitchen' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Floor plan', href: '/floor-plan' }
] as const

const PosHeader = () => {
  const pathname = usePathname()

  return (
    <header className='bg-background sticky top-0 z-30 border-b'>
      <a
        href='#pos-main'
        className='bg-background text-foreground focus-visible:ring-ring sr-only rounded-md px-3 py-2 focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus-visible:ring-2'
      >
        Skip to content
      </a>
      <div className='flex w-full flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:gap-6'>
        <div className='flex items-center justify-between gap-4'>
          <Link href='/pos' className='flex shrink-0 items-center gap-3' aria-label='RakPOS home'>
            <Logo className='size-9' aria-hidden='true' />
            <span className='font-semibold tracking-tight'>RakPOS</span>
          </Link>
          <div className='flex items-center gap-2 md:hidden'>
            <Badge variant='secondary'>Demo</Badge>
            <ModeToggle />
          </div>
        </div>

        <nav aria-label='Point of sale' className='min-w-0 flex-1 overflow-x-auto'>
          <div className='flex w-max items-center gap-1'>
            {navigation.map(item => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Button
                  key={item.href}
                  size='sm'
                  variant={active ? 'secondary' : 'ghost'}
                  className='h-10 shrink-0 px-4'
                  render={<Link href={item.href} aria-current={active ? 'page' : undefined} />}
                  nativeButton={false}
                >
                  {item.label}
                </Button>
              )
            })}
          </div>
        </nav>

        <div className='hidden items-center gap-2 md:flex'>
          <Badge variant='secondary'>Demo</Badge>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

export default PosHeader
