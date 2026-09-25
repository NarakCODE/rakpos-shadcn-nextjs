'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { MailIcon, MonitorIcon, SmartphoneIcon } from 'lucide-react'

// Type Imports
import type { AppUser, UserNotificationSetting } from '@/types/apps/user-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type NotificationChannel = keyof Pick<UserNotificationSetting, 'email' | 'browser' | 'app'>

export interface NotificationsTabProps {
  user: AppUser
}

export function NotificationsTab({ user }: NotificationsTabProps) {
  const [settings, setSettings] = useState<UserNotificationSetting[]>(user.notificationSettings ?? [])

  const handleToggle = (id: string, channel: NotificationChannel, value: boolean) => {
    setSettings(prev => prev.map(setting => (setting.id === id ? { ...setting, [channel]: value } : setting)))
  }

  return (
    <Card className='gap-0 py-0'>
      <CardHeader variant='divided' className='px-6 py-4'>
        <CardTitle>Notifications</CardTitle>
        <p className='text-muted-foreground text-sm'>
          Choose how {user.name} receives notifications for account activity.
        </p>
      </CardHeader>
      <CardContent className='px-0 pb-0'>
        <Table>
          <TableHeader>
            <TableRow variant='static'>
              <TableHead className='pl-6'>
                <span className='text-muted-foreground'>Type</span>
              </TableHead>
              <TableHead className='text-center'>
                <div className='text-muted-foreground flex items-center justify-center gap-1.5'>
                  <MailIcon className='size-4' />
                  Email
                </div>
              </TableHead>
              <TableHead className='text-center'>
                <div className='text-muted-foreground flex items-center justify-center gap-1.5'>
                  <MonitorIcon className='size-4' />
                  Browser
                </div>
              </TableHead>
              <TableHead className='pr-6 text-center'>
                <div className='text-muted-foreground flex items-center justify-center gap-1.5'>
                  <SmartphoneIcon className='size-4' />
                  App
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.length === 0 ? (
              <TableRow variant='static'>
                <TableCell colSpan={4} className='py-8 text-center text-sm'>
                  <span className='text-muted-foreground'>No notification settings found.</span>
                </TableCell>
              </TableRow>
            ) : (
              settings.map(setting => (
                <TableRow key={setting.id}>
                  <TableCell className='pl-6'>
                    <p className='font-medium'>{setting.title}</p>
                    <p className='text-muted-foreground text-sm'>{setting.description}</p>
                  </TableCell>
                  <TableCell className='text-center'>
                    <Switch
                      checked={setting.email}
                      onCheckedChange={value => handleToggle(setting.id, 'email', value)}
                      aria-label={`${setting.title} email notifications`}
                    />
                  </TableCell>
                  <TableCell className='text-center'>
                    <Switch
                      checked={setting.browser}
                      onCheckedChange={value => handleToggle(setting.id, 'browser', value)}
                      aria-label={`${setting.title} browser notifications`}
                    />
                  </TableCell>
                  <TableCell className='pr-6 text-center'>
                    <Switch
                      checked={setting.app}
                      onCheckedChange={value => handleToggle(setting.id, 'app', value)}
                      aria-label={`${setting.title} app notifications`}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className='flex justify-end border-t px-6 py-4'>
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
