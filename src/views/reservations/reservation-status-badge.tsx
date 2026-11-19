import type { ComponentProps } from 'react'

import { Badge } from '@/components/ui/badge'
import type { ReservationStatus } from '@/types/reservations-types'

type BadgeVariant = NonNullable<ComponentProps<typeof Badge>['variant']>

const statusVariantMap: Record<ReservationStatus, BadgeVariant> = {
  Pending: 'warning',
  Confirmed: 'success',
  Seated: 'accent',
  Completed: 'success',
  Cancelled: 'danger'
}

export function ReservationStatusBadge({ status }: { status: ReservationStatus }) {
  return <Badge variant={statusVariantMap[status]}>{status}</Badge>
}
