'use client'

import * as React from 'react'

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { UserRoundIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const AVATAR_SIZE_PX = {
  xs: 20,
  sm: 24,
  default: 32,
  lg: 40,
  xl: 48,
  '2xl': 64
} as const

type AvatarSizePreset = keyof typeof AVATAR_SIZE_PX
type AvatarSize = AvatarSizePreset | number

function resolveSizePreset(size: AvatarSize): AvatarSizePreset {
  if (typeof size === 'string') return size
  if (size <= 22) return 'xs'
  if (size <= 28) return 'sm'
  if (size <= 36) return 'default'
  if (size <= 44) return 'lg'
  if (size <= 56) return 'xl'

  return '2xl'
}

function getInitials(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return ''
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
}

const avatarVariants = cva(
  [
    'group/avatar text-text-secondary relative inline-flex size-(--avatar-size) shrink-0 items-center justify-center select-none',
    'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_var(--color-shadow-ring-2)]'
  ],
  {
    variants: {
      shape: {
        round: 'rounded-full',
        square: 'rounded-md',
        tile: 'rounded-lg'
      },
      border: {
        default: '',
        none: 'after:hidden',
        profile: 'ring-bg-primary ring-4'
      }
    },
    defaultVariants: {
      shape: 'round',
      border: 'default'
    }
  }
)

type AvatarProps = AvatarPrimitive.Root.Props &
  VariantProps<typeof avatarVariants> & {
    /** Named preset (`xs` 20px, `sm` 24px, `default` 32px, `lg` 40px, `xl` 48px, `2xl` 64px) or pixel number */
    size?: AvatarSize

    /** Renders a matching-shape pulse skeleton without flashing fallback initials */
    isLoading?: boolean
  }

function Avatar({
  className,
  style,
  size = 'default',
  shape = 'round',
  border = 'default',
  isLoading = false,
  children,
  ...props
}: AvatarProps) {
  const sizePreset = resolveSizePreset(size)
  const pixelSize = typeof size === 'number' ? size : AVATAR_SIZE_PX[size]

  return (
    <AvatarPrimitive.Root
      data-slot='avatar'
      data-size={sizePreset}
      data-shape={shape}
      aria-busy={isLoading || undefined}
      style={{ '--avatar-size': `${pixelSize}px`, ...style } as unknown as React.CSSProperties}
      className={cn(avatarVariants({ shape, border }), className)}
      {...props}
    >
      {isLoading ? (
        <span
          data-slot='avatar-skeleton'
          aria-hidden='true'
          className='bg-bg-tertiary size-full animate-pulse rounded-[inherit]'
        />
      ) : (
        children
      )}
    </AvatarPrimitive.Root>
  )
}

type AvatarImageSrc = string | { src: string } | null | undefined

type AvatarImageProps = Omit<AvatarPrimitive.Image.Props, 'src'> & {
  src?: AvatarImageSrc
  inset?: 'default' | 'logo'

  /** Loads eagerly with high fetch priority for above-the-fold avatars */
  priority?: boolean
}

function AvatarImage({
  className,
  src,
  inset = 'default',
  priority = false,
  loading,
  fetchPriority,
  decoding = 'async',
  ...props
}: AvatarImageProps) {
  const resolvedSrc = typeof src === 'string' ? src : src?.src

  return (
    <AvatarPrimitive.Image
      data-slot='avatar-image'
      src={resolvedSrc}
      decoding={decoding}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      fetchPriority={fetchPriority ?? (priority ? 'high' : 'auto')}
      className={cn(
        'aspect-square size-full rounded-[inherit] object-cover',
        inset === 'logo' && 'bg-bg-primary object-contain p-1.5',
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  text = 'default',
  ...props
}: AvatarPrimitive.Fallback.Props & { text?: 'default' | 'compact' | 'tiny' }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot='avatar-fallback'
      className={cn(
        'from-bg-tertiary to-bg-secondary flex size-full items-center justify-center overflow-hidden rounded-[inherit] bg-linear-to-t',
        'group-data-[size=xs]/avatar:text-body-micro-medium',
        'group-data-[size=sm]/avatar:text-body-micro-medium',
        'group-data-[size=default]/avatar:text-body-mini-medium',
        'group-data-[size=lg]/avatar:text-body-regular-medium',
        'group-data-[size=xl]/avatar:text-title-mini-medium',
        'group-data-[size=2xl]/avatar:text-title-small-medium',
        text === 'compact' && 'text-body-mini-medium',
        text === 'tiny' && 'text-body-micro-medium',
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot='avatar-badge'
      className={cn(
        'bg-control-primary text-text-inverse ring-bg-primary absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full ring-2 select-none',
        'group-data-[size=xs]/avatar:size-1.5 group-data-[size=xs]/avatar:[&>svg]:hidden',
        'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden',
        'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2',
        'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2',
        'group-data-[size=xl]/avatar:size-3.5 group-data-[size=xl]/avatar:[&>svg]:size-2.5',
        'group-data-[size=2xl]/avatar:size-4 group-data-[size=2xl]/avatar:[&>svg]:size-2.5',
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='avatar-group'
      className={cn(
        'group/avatar-group *:data-[slot=avatar]:ring-bg-primary flex -space-x-2 *:data-[slot=avatar]:ring-2',
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='avatar-group-count'
      className={cn(
        'bg-bg-tertiary text-text-secondary ring-bg-primary relative flex size-8 shrink-0 items-center justify-center rounded-full tabular-nums ring-2 select-none',
        'group-has-data-[size=xs]/avatar-group:size-5',
        'group-has-data-[size=sm]/avatar-group:size-6',
        'group-has-data-[size=lg]/avatar-group:size-10',
        'group-has-data-[size=xl]/avatar-group:size-12',
        'group-has-data-[size=2xl]/avatar-group:size-16',
        '[&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 group-has-data-[size=xs]/avatar-group:[&>svg]:size-3',
        className
      )}
      {...props}
    >
      <span className='text-body-mini-medium group-has-data-[size=xs]/avatar-group:text-body-micro-medium group-has-data-[size=sm]/avatar-group:text-body-micro-medium group-has-data-[size=lg]/avatar-group:text-body-small-medium'>
        {props.children}
      </span>
    </div>
  )
}

type UserAvatarProps = Omit<AvatarProps, 'children' | 'shape'> & {
  /** Accessible label for the image and icon fallback */
  alt: string

  /** URL or static-import object of the profile image */
  src?: AvatarImageSrc

  /** Show initials instead of the default person icon when no image is available */
  showInitials?: boolean

  /** Load the profile image eagerly with high priority */
  imagePriority?: boolean
}

function UserAvatar({
  alt,
  src,
  size = 'xs',
  showInitials = false,
  imagePriority = false,
  className,
  ...props
}: UserAvatarProps) {
  return (
    <Avatar size={size} shape='round' className={className} {...props}>
      {src ? <AvatarImage src={src} alt={alt} priority={imagePriority} /> : null}
      <AvatarFallback role='img' aria-label={alt}>
        {showInitials ? getInitials(alt) : <UserRoundIcon className='size-[60%] shrink-0' aria-hidden='true' />}
      </AvatarFallback>
    </Avatar>
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  UserAvatar,
  avatarVariants,
  getInitials
}
export type { AvatarProps, AvatarImageProps, AvatarSize, AvatarSizePreset, UserAvatarProps }
