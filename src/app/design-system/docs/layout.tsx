import type { ReactNode } from 'react'

import { DesignSystemDocsShell } from '@/components/layout/design-system-docs-shell'

export default function DesignSystemDocsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <DesignSystemDocsShell>{children}</DesignSystemDocsShell>
}
