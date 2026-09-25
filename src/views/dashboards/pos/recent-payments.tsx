'use client'

// Third-party Imports
import { CreditCardIcon, BanknoteIcon, QrCodeIcon, SmartphoneIcon, WalletIcon } from 'lucide-react'

// Component Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export type PaymentTransaction = {
  id: string
  method: string
  orderId: string
  amount: string
  icon: React.ReactNode
}

const recentPayments: PaymentTransaction[] = [
  {
    id: '1',
    method: 'Credit Card',
    orderId: '#ORD-9024',
    amount: '$84.50',
    icon: <CreditCardIcon className='size-4' />
  },
  {
    id: '2',
    method: 'Mobile Pay',
    orderId: '#ORD-9023',
    amount: '$32.00',
    icon: <SmartphoneIcon className='size-4' />
  },
  {
    id: '3',
    method: 'QR Code',
    orderId: '#ORD-9022',
    amount: '$126.80',
    icon: <QrCodeIcon className='size-4' />
  },
  {
    id: '4',
    method: 'Cash',
    orderId: '#ORD-9021',
    amount: '$45.20',
    icon: <BanknoteIcon className='size-4' />
  },
  {
    id: '5',
    method: 'Wallet',
    orderId: '#ORD-9020',
    amount: '$67.10',
    icon: <WalletIcon className='size-4' />
  }
]

export const RecentPayments = () => {
  return (
    <Card className='flex flex-col justify-between'>
      <CardHeader className='pb-3'>
        <CardTitle>
          <span className='text-lg font-bold'>Recent Payments</span>
        </CardTitle>
        <CardDescription>
          <span className='text-muted-foreground text-xs'>Today&apos;s transaction stream across payment methods</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='space-y-3'>
          {recentPayments.map(payment => (
            <div key={payment.id} className='flex items-center justify-between gap-3'>
              <div className='flex min-w-0 items-center gap-3'>
                <div className='bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-(--radius)'>
                  {payment.icon}
                </div>

                <div className='min-w-0 space-y-0.5'>
                  <p className='text-foreground truncate text-sm font-semibold'>{payment.method}</p>
                  <p className='text-muted-foreground font-mono text-xs'>{payment.orderId}</p>
                </div>
              </div>

              <span className='text-foreground text-sm font-bold tabular-nums'>{payment.amount}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentPayments
