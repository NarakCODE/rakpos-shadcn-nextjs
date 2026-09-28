import type { ReactElement, ReactNode } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  title: ReactNode
  description: ReactNode
  trigger?: ReactElement
  triggerLabel?: string
  cancelLabel?: string
  confirmLabel?: string
  confirmVariant?: 'default' | 'destructive'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onConfirm: () => void
}

export function ConfirmDialog({
  title,
  description,
  trigger,
  triggerLabel = 'Show Dialog',
  cancelLabel = 'Cancel',
  confirmLabel = 'Continue',
  confirmVariant = 'default',
  open,
  onOpenChange,
  onConfirm
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {trigger ? (
        <AlertDialogTrigger render={trigger} />
      ) : open === undefined ? (
        <AlertDialogTrigger render={<Button variant='outline'>{triggerLabel}</Button>} />
      ) : null}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
