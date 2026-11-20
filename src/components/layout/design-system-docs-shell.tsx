'use client'

import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SearchIcon, XIcon } from 'lucide-react'

import { RakfoundLogo } from '@/components/brand/rakfound-logo'
import ModeToggle from '@/components/layout/ModeToggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { ALL_DESIGN_SYSTEM_DOCS, DESIGN_SYSTEM_DOCS_SECTIONS } from '@/configs/design-system-docs'

export function DesignSystemDocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [query, setQuery] = useState('')

  const activeDoc = useMemo(() => {
    const slug = pathname.split('/').filter(Boolean).pop()

    return ALL_DESIGN_SYSTEM_DOCS.find(item => item.slug === slug || item.aliases?.includes(slug ?? '')) ?? null
  }, [pathname])

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) return DESIGN_SYSTEM_DOCS_SECTIONS

    return DESIGN_SYSTEM_DOCS_SECTIONS.map(section => ({
      ...section,
      items: section.items.filter(
        item => item.title.toLowerCase().includes(normalized) || item.slug.includes(normalized)
      )
    })).filter(section => section.items.length > 0)
  }, [query])

  return (
    <div className='bg-bg-base flex min-h-dvh w-full min-w-0'>
      <Sidebar collapsible='offcanvas' variant='sidebar'>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size='lg' render={<Link href='/design-system/docs/get-started' />}>
                <div className='flex items-center gap-2.5'>
                  <RakfoundLogo variant='mark' className='size-7 shrink-0' label='' />
                  <div className='flex flex-col items-start leading-tight'>
                    <span className='text-text-primary text-body-small-semibold text-nowrap'>Rakfound UI</span>
                    <span className='text-text-secondary text-body-mini-regular text-nowrap'>Design System Docs</span>
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className='px-2 pb-1'>
            <div className='bg-control-bg shadow-low hover:shadow-low-hover focus-within:shadow-low-focus flex h-8 items-center gap-2 rounded-md px-2.5 transition-shadow duration-150'>
              <SearchIcon className='text-text-tertiary size-3.5 shrink-0' aria-hidden='true' />
              <input
                type='search'
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder='Filter docs...'
                aria-label='Filter design system docs'
                className='text-text-primary placeholder:text-text-tertiary text-body-mini-regular w-full bg-transparent outline-none'
              />
              {query && (
                <button
                  type='button'
                  onClick={() => setQuery('')}
                  aria-label='Clear filter'
                  className='text-text-tertiary hover:text-text-primary rounded-sm p-0.5 transition-colors duration-150'
                >
                  <XIcon className='size-3' />
                </button>
              )}
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {filteredSections.length > 0 ? (
            filteredSections.map(section => (
              <SidebarGroup key={section.label}>
                <SidebarGroupLabel variant='section'>{section.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map(item => {
                      const isActive =
                        pathname === item.href || Boolean(item.aliases?.some(alias => pathname.endsWith(`/${alias}`)))

                      return (
                        <SidebarMenuItem key={item.slug}>
                          <SidebarMenuButton
                            variant='navigation'
                            isActive={isActive}
                            render={<Link href={item.href} />}
                          >
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))
          ) : (
            <div className='px-4 py-6 text-center'>
              <p className='text-text-secondary text-body-mini-regular'>No matching components</p>
            </div>
          )}
        </SidebarContent>
      </Sidebar>

      <SidebarInset className='flex flex-1 flex-col'>
        <header className='bg-bg-header border-border-gray sticky top-0 z-30 border-b backdrop-blur-md'>
          <div className='mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 sm:px-8'>
            <div className='flex min-w-0 items-center gap-3'>
              <SidebarTrigger />
              <Separator orientation='vertical' className='h-4' />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden sm:inline-flex'>
                    <BreadcrumbLink href='/design-system/docs/get-started'>Design System</BreadcrumbLink>
                  </BreadcrumbItem>
                  {activeDoc && (
                    <>
                      <BreadcrumbSeparator className='hidden sm:inline-flex' />
                      <BreadcrumbItem className='hidden md:inline-flex'>
                        <span className='text-text-secondary'>{activeDoc.section}</span>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className='hidden md:inline-flex' />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{activeDoc.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className='flex items-center gap-2'>
              <Link
                href='/dashboard'
                className='text-text-secondary hover:text-text-primary hover:bg-control-hover text-body-mini-medium rounded-md px-2.5 py-1.5 transition-colors duration-150'
              >
                App
              </Link>
              <ModeToggle />
            </div>
          </div>
        </header>

        <div className='mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8'>{children}</div>
      </SidebarInset>
    </div>
  )
}
