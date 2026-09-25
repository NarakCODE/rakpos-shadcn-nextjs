// Third-party Imports
import type * as Icon from 'lucide-react'

type IconName = keyof typeof Icon

export type MenuLeafSubItem = {
  label: string
  href: string
  activePath?: string
  badge?: string
  badgeClassName?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export type MenuGroupSubItem = {
  label: string
  childItems: MenuLeafSubItem[]
}

export type MenuSubItem = MenuLeafSubItem | MenuGroupSubItem

export type MenuItem = {
  icon: IconName
  label: string
} & (
  | {
      href: string
      activePath?: string
      badge?: string
      badgeClassName?: string
      childItems?: never
      target?: '_blank' | '_self' | '_parent' | '_top'
    }
  | {
      href?: never
      badge?: string
      badgeClassName?: string
      childItems: MenuSubItem[]
    }
)

export type NavItem = {
  groupLabel?: string
  items: MenuItem[]
}

export const navItems: NavItem[] = [
  {
    groupLabel: 'Main',
    items: [
      {
        icon: 'LayoutDashboard',
        label: 'Dashboard',
        href: '/dashboard'
      },
      {
        icon: 'Store',
        label: 'POS',
        href: '/pos'
      },
      {
        icon: 'Layers',
        label: 'Floor Plan',
        href: '/floor-plan'
      },
      {
        icon: 'ChefHat',
        label: 'Kitchen Display',
        href: '/kitchen'
      },
      {
        icon: 'Package',
        label: 'Orders',
        href: '/orders'
      },
      {
        icon: 'CalendarCheck',
        label: 'Reservations',
        href: '/reservations'
      }
    ]
  },
  {
    groupLabel: 'Menu Management',
    items: [
      {
        icon: 'FolderTree',
        label: 'Category',
        href: '/menu/category'
      },
      {
        icon: 'Utensils',
        label: 'Items',
        href: '/menu/items'
      },
      {
        icon: 'PlusCircle',
        label: 'Addons',
        href: '/menu/addons'
      },
      {
        icon: 'TicketPercent',
        label: 'Coupons',
        href: '/menu/coupons'
      },
      {
        icon: 'Boxes',
        label: 'Inventory',
        href: '/menu/inventory'
      }
    ]
  },
  {
    groupLabel: 'Operations',
    items: [
      {
        icon: 'Users',
        label: 'Customers',
        href: '/operations/customers'
      },
      {
        icon: 'FileText',
        label: 'Invoices',
        href: '/operations/invoices'
      },
      {
        icon: 'CreditCard',
        label: 'Payments',
        href: '/operations/payments'
      }
    ]
  },
  {
    groupLabel: 'Auth',
    items: [
      {
        icon: 'LogIn',
        label: 'Login',
        href: '/pages/auth/login',
        target: '_blank'
      },
      {
        icon: 'UserPlus',
        label: 'Register',
        href: '/pages/auth/register',
        target: '_blank'
      },
      {
        icon: 'KeyRound',
        label: 'Forgot Password',
        href: '/pages/auth/forgot-password',
        target: '_blank'
      }
    ]
  },
  {
    groupLabel: 'Settings',
    items: [
      {
        icon: 'Settings2',
        label: 'Store Settings',
        childItems: [
          {
            label: 'Profile',
            href: '/settings/store/profile'
          },
          {
            label: 'Tax & Billing',
            href: '/settings/store/tax-billing'
          },
          {
            label: 'Orders',
            href: '/settings/store/orders'
          },
          {
            label: 'Payments',
            href: '/settings/store/payments'
          },
          {
            label: 'Operating Hours',
            href: '/settings/store/operating-hours'
          }
        ]
      },
      {
        icon: 'ShieldCheck',
        label: 'Administration',
        childItems: [
          {
            label: 'Roles',
            href: '/settings/admin/roles'
          },
          {
            label: 'Permissions',
            href: '/settings/admin/permissions'
          }
        ]
      }
    ]
  }
]
