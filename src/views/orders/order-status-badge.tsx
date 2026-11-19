import type { ComponentProps } from 'react'

import { Badge } from '@/components/ui/badge'
import type { OrderStatus } from '@/types/orders-types'

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>['variant']>

const statusVariantMap: Record<OrderStatus, BadgeVariant> = {
  New: 'accent',
  Preparing: 'warning',
  Ready: 'success',
  Served: 'secondary',
  Cancelled: 'danger'
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const variant = statusVariantMap[status] ?? 'outline'

  return <Badge variant={variant}>{status}</Badge>
}
