'use client'

// Third-party Imports
import { format } from 'date-fns'
import { CheckIcon, DownloadIcon } from 'lucide-react'

// Type Imports
import type { AppUser, InvoiceStatus } from '@/types/apps/user-types'

// Component Imports
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Util Imports

const INVOICE_STATUS_STYLES: Record<InvoiceStatus, string> = {
  paid: 'bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400',
  pending: 'bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400',
  cancelled: 'bg-destructive/10 text-destructive',
  draft: 'bg-muted text-muted-foreground'
}

const formatInvoiceStatus = (status: InvoiceStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export interface BillingTabProps {
  user: AppUser
}

export function BillingTab({ user }: BillingTabProps) {
  const billingPlan = user.billingPlan
  const invoices = user.invoices ?? []
  const daysProgress = billingPlan ? Math.round((billingPlan.daysUsed / billingPlan.totalDays) * 100) : 0

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {!billingPlan ? (
            <p className='text-muted-foreground text-body-small-regular'>No billing plan assigned.</p>
          ) : (
            <>
              <div className='flex flex-wrap items-start justify-between gap-4'>
                <div>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-title-mini-semibold'>{billingPlan.name}</h3>
                    {billingPlan.isPopular ? <Badge variant='secondary'>Popular</Badge> : null}
                  </div>
                  <p className='text-muted-foreground text-body-small-regular mt-1'>
                    {user.plan} plan · {user.billing}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='text-title-small-semibold'>
                    ${billingPlan.price}
                    <span className='text-muted-foreground text-body-small-regular'>/{billingPlan.period}</span>
                  </p>
                  <Button variant='outline' size='sm' className='mt-2'>
                    Upgrade Plan
                  </Button>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='text-body-small-regular flex items-center justify-between'>
                  <span className='text-muted-foreground'>Days</span>
                  <span>
                    {billingPlan.daysUsed} of {billingPlan.totalDays} Days
                  </span>
                </div>
                <Progress value={daysProgress} className='*:data-[slot=progress-track]:h-2' />
                <p className='text-muted-foreground text-body-mini-regular'>{daysProgress}% of billing period used</p>
              </div>

              <ul className='grid gap-2 sm:grid-cols-2'>
                {billingPlan.features.map(feature => (
                  <li key={feature} className='text-muted-foreground text-body-small-regular flex items-center gap-2'>
                    <CheckIcon className='text-muted-foreground size-4 shrink-0' />
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <p className='text-muted-foreground text-body-small-regular'>Company</p>
              <p className='font-medium'>{user.company ?? '—'}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-body-small-regular'>Billing Email</p>
              <p className='font-medium'>{user.billingEmail ?? user.email}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-body-small-regular'>Tax ID</p>
              <p className='font-medium'>{user.taxId ?? '—'}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-body-small-regular'>Country</p>
              <p className='font-medium'>{user.country ?? '—'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='gap-0 py-0'>
        <CardHeader variant='divided' className='px-6 py-4'>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        {invoices.length === 0 ? (
          <CardContent className='py-8'>
            <p className='text-muted-foreground text-body-small-regular'>No invoices found.</p>
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow variant='static'>
                <TableHead className='pl-6'>
                  <span className='text-muted-foreground'>Invoice</span>
                </TableHead>
                <TableHead>
                  <span className='text-muted-foreground'>Status</span>
                </TableHead>
                <TableHead>
                  <span className='text-muted-foreground'>Total</span>
                </TableHead>
                <TableHead>
                  <span className='text-muted-foreground'>Issued Date</span>
                </TableHead>
                <TableHead className='pr-6 text-right'>
                  <span className='text-muted-foreground'>Action</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className='pl-6 font-medium'>{invoice.number}</TableCell>
                  <TableCell>
                    <Badge shape='square' className={INVOICE_STATUS_STYLES[invoice.status]}>
                      <span className='font-normal'>{formatInvoiceStatus(invoice.status)}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>${invoice.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className='text-muted-foreground'>
                      {format(new Date(invoice.issuedDate), 'MMM dd, yyyy')}
                    </span>
                  </TableCell>
                  <TableCell className='pr-6 text-right'>
                    <Button variant='ghost' size='icon' aria-label={`Download ${invoice.number}`}>
                      <DownloadIcon className='size-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}
