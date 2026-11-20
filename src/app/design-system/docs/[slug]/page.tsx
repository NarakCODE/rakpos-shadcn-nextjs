import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  ALL_DESIGN_SYSTEM_DOCS,
  getAdjacentDesignSystemDocs,
  getDesignSystemDocBySlug
} from '@/configs/design-system-docs'
import { DesignSystemDocPageView } from '@/views/design-system/docs-page-view'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return ALL_DESIGN_SYSTEM_DOCS.flatMap(item => [
    { slug: item.slug },
    ...(item.aliases ?? []).map(alias => ({ slug: alias }))
  ])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = getDesignSystemDocBySlug(slug)

  if (!item) {
    return { title: 'Not Found' }
  }

  return {
    title: item.title,
    description: `${item.section} documentation for ${item.title}`
  }
}

export default async function DesignSystemDocPage({ params }: PageProps) {
  const { slug } = await params
  const item = getDesignSystemDocBySlug(slug)

  if (!item) {
    notFound()
  }

  const { prev, next } = getAdjacentDesignSystemDocs(slug)

  return <DesignSystemDocPageView item={item} prev={prev} next={next} />
}
