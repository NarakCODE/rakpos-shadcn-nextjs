import Link from 'next/link'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'

import type { DesignSystemDocItem } from '@/configs/design-system-docs'
import { ButtonDocsDemo } from '@/views/design-system/button-docs-demo'

type DesignSystemDocPageViewProps = {
  item: DesignSystemDocItem
  prev: DesignSystemDocItem | null
  next: DesignSystemDocItem | null
}

export function DesignSystemDocPageView({ item, prev, next }: DesignSystemDocPageViewProps) {
  return (
    <article className='flex flex-col gap-8'>
      <header className='border-border-gray flex flex-col gap-3 border-b pb-6'>
        <span className='bg-bg-secondary text-text-secondary border-border-gray text-body-mini-medium inline-flex w-fit items-center rounded-full border px-2.5 py-0.5'>
          {item.section}
        </span>
        <h1 className='text-text-primary text-title-regular'>Hello {item.title}</h1>
        <p className='text-text-secondary text-body-small-regular'>
          Route:{' '}
          <code className='bg-bg-tertiary text-text-primary text-body-mini-regular rounded px-1.5 py-0.5 font-mono'>
            {item.href}
          </code>
        </p>
      </header>

      {item.slug === 'button' ? (
        <ButtonDocsDemo />
      ) : (
        <section className='bg-bg-primary shadow-low rounded-xl p-6'>
          <p className='text-text-primary text-body-small-regular'>Hello {item.title}</p>
        </section>
      )}

      <nav aria-label='Documentation pagination' className='grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2'>
        {prev ? (
          <Link
            href={prev.href}
            className='bg-bg-primary shadow-low hover:shadow-low-hover focus-visible:shadow-low-focus flex items-center gap-3 rounded-xl p-4 transition-shadow duration-150 outline-none'
          >
            <ArrowLeftIcon className='text-text-secondary size-4 shrink-0' aria-hidden='true' />
            <div className='min-w-0'>
              <div className='text-text-tertiary text-body-mini-regular'>{prev.section}</div>
              <div className='text-text-primary text-body-small-medium truncate'>{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.href}
            className='bg-bg-primary shadow-low hover:shadow-low-hover focus-visible:shadow-low-focus flex items-center justify-end gap-3 rounded-xl p-4 text-right transition-shadow duration-150 outline-none'
          >
            <div className='min-w-0'>
              <div className='text-text-tertiary text-body-mini-regular'>{next.section}</div>
              <div className='text-text-primary text-body-small-medium truncate'>{next.title}</div>
            </div>
            <ArrowRightIcon className='text-text-secondary size-4 shrink-0' aria-hidden='true' />
          </Link>
        ) : null}
      </nav>
    </article>
  )
}
