'use client'

// React Imports
import { useState } from 'react'

// Type Imports
import type { AppUser } from '@/types/apps/user-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export interface SecurityTabProps {
  user: AppUser
}

export function SecurityTab({ user }: SecurityTabProps) {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(user.twoFactorEnabled ?? false)
  const recentDevices = user.recentDevices ?? []

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='current-password'>Current Password</Label>
              <Input id='current-password' type='password' placeholder='············' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='new-password'>New Password</Label>
              <Input id='new-password' type='password' placeholder='············' />
            </div>
          </div>
          <div className='space-y-2 md:max-w-md'>
            <Label htmlFor='confirm-password'>Confirm New Password</Label>
            <Input id='confirm-password' type='password' placeholder='············' />
          </div>
          <ul className='text-muted-foreground list-inside list-disc space-y-1 text-sm'>
            <li>Minimum 8 characters long — the more, the better</li>
            <li>At least one lowercase & one uppercase character</li>
            <li>At least one number, symbol, or whitespace character</li>
          </ul>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between gap-4'>
          <div>
            <CardTitle>Two-steps verification</CardTitle>
            <p className='text-muted-foreground mt-1 text-sm'>Keep your account secure with authentication step.</p>
          </div>
          <Switch
            checked={isTwoFactorEnabled}
            onCheckedChange={setIsTwoFactorEnabled}
            aria-label='Two-step verification'
          />
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground text-sm'>
            {isTwoFactorEnabled
              ? 'Two-factor authentication is enabled for this account.'
              : 'Two-factor authentication is not enabled yet.'}
          </p>
        </CardContent>
      </Card>

      <Card className='gap-0 py-0'>
        <CardHeader variant='divided' className='px-6 py-4'>
          <CardTitle>Recent Devices</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow variant='static'>
              <TableHead className='pl-6'>
                <span className='text-muted-foreground'>Browser</span>
              </TableHead>
              <TableHead>
                <span className='text-muted-foreground'>Device</span>
              </TableHead>
              <TableHead>
                <span className='text-muted-foreground'>Location</span>
              </TableHead>
              <TableHead className='pr-6 text-right'>
                <span className='text-muted-foreground'>Recent Activity</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentDevices.length === 0 ? (
              <TableRow variant='static'>
                <TableCell colSpan={4} className='py-8 text-center text-sm'>
                  <span className='text-muted-foreground'>No recent devices found.</span>
                </TableCell>
              </TableRow>
            ) : (
              recentDevices.map(device => (
                <TableRow key={device.id}>
                  <TableCell className='pl-6 font-medium'>{device.browser}</TableCell>
                  <TableCell>
                    <span className='text-muted-foreground'>{device.device}</span>
                  </TableCell>
                  <TableCell>
                    <span className='text-muted-foreground'>{device.location}</span>
                  </TableCell>
                  <TableCell className='pr-6 text-right'>
                    {device.isCurrentDevice ? (
                      <span className='text-primary text-sm font-medium'>{device.lastActive}</span>
                    ) : (
                      <span className='text-muted-foreground text-sm'>{device.lastActive}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
