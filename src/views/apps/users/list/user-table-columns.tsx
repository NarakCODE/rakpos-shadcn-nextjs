'use client'

// React Imports
import type { ReactNode } from 'react'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  BrushIcon,
  CrownIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  PencilLineIcon,
  PencilRulerIcon,
  Trash2Icon,
  UserCheckIcon,
  UserRoundIcon,
  UserXIcon
} from 'lucide-react'

// Type Imports
import type { AppUser, UserBilling, UserRole, UserStatus } from '@/types/apps/user-types'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// Config Imports
import { getInitialsFromName } from '@/configs/mailConfig'

// Util Imports

const ROLE_ICONS: Record<UserRole, ReactNode> = {
  Admin: <UserRoundIcon className='text-text-green size-4' />,
  Editor: <BrushIcon className='text-chart-2 size-4' />,
  Subscriber: <CrownIcon className='text-chart-5 size-4' />,
  Maintainer: <PencilRulerIcon className='text-chart-3 size-4' />,
  Guest: <PencilLineIcon className='text-chart-1 size-4' />
}

const STATUS_STYLES: Record<UserStatus, string> = {
  Active: 'bg-bg-green text-text-green [a&]:hover:bg-bg-green-hover',
  Pending: 'bg-bg-amber text-text-amber',
  Suspended:
    'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
  Inactive:
    'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive'
}

const formatBilling = (billing: UserBilling): string => {
  if (billing === 'Auto Debit') {
    return 'Auto debit'
  }

  if (billing === 'Credit Card') {
    return 'Credit Card'
  }

  return 'Manual - PayPal'
}

function UserRowActions({ user }: { user: AppUser }) {
  return (
    <div className='flex items-center gap-1'>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant='ghost'
              size='icon'
              aria-label='View user'
              render={<Link href='/apps/users/view' />}
              nativeButton={false}
            />
          }
        >
          <EyeIcon className='size-4.5' />
        </TooltipTrigger>
        <TooltipContent>
          <p>View</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger render={<Button variant='ghost' size='icon' aria-label='Delete user' />}>
          <Trash2Icon className='size-4.5' />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size='icon' variant='ghost' aria-label='Open actions' />}>
          <EllipsisVerticalIcon className='size-4.5' aria-hidden='true' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PencilIcon className='size-4' />
              Edit User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.status !== 'Suspended' ? (
              <DropdownMenuItem>
                <UserXIcon className='size-4' />
                Suspend
              </DropdownMenuItem>
            ) : null}
            {user.status !== 'Active' ? (
              <DropdownMenuItem>
                <UserCheckIcon className='size-4' />
                Activate
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>
              <Trash2Icon className='size-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const userTableColumns: ColumnDef<AppUser>[] = [
  {
    id: 'user',
    header: 'User',
    accessorKey: 'name',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar className='size-9'>
          {row.original.avatar ? <AvatarImage src={row.original.avatar} alt={row.original.name} /> : null}
          <AvatarFallback text='compact'>{getInitialsFromName(row.original.name)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='font-medium'>{row.original.name}</span>
          <span className='text-muted-foreground'>{row.original.email}</span>
        </div>
      </div>
    ),
    size: 360,
    enableSorting: true
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role',
    cell: ({ row }) => {
      const role = row.original.role

      return (
        <div className='flex items-center gap-2'>
          {ROLE_ICONS[role]}
          <span className='capitalize'>{role}</span>
        </div>
      )
    },
    enableSorting: true
  },
  {
    id: 'plan',
    header: 'Plan',
    accessorKey: 'plan',
    cell: ({ row }) => <span className='text-muted-foreground'>{row.original.plan}</span>,
    enableSorting: true
  },
  {
    id: 'billing',
    header: 'Billing',
    accessorKey: 'billing',
    cell: ({ row }) => <span className='text-muted-foreground'>{formatBilling(row.original.billing)}</span>,
    enableSorting: true
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original.status

      return (
        <Badge size='table' shape='square' border='none' className={STATUS_STYLES[status]}>
          {status}
        </Badge>
      )
    },
    enableSorting: true
  },
  {
    id: 'joinedDate',
    header: 'Joined Date',
    accessorKey: 'joinedDate',
    cell: ({ row }) => <span>{format(new Date(row.original.joinedDate), 'dd MMM yyyy')}</span>,
    enableSorting: true
  },
  {
    id: 'actions',
    header: () => 'Actions',
    cell: ({ row }) => <UserRowActions user={row.original} />,
    enableHiding: false,
    enableSorting: false
  }
]
