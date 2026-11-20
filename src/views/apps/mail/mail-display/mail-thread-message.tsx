// Type Imports
import type { ThreadMessage } from '@/types/apps/mail-types'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Config Imports
import { formatMailDate, getInitialsFromName } from '@/configs/mailConfig'

export const MailThreadMessage = ({
  message,
  avatar,
  variant = 'card'
}: {
  message: ThreadMessage
  avatar?: string
  variant?: 'card' | 'plain'
}) => {
  // Props

  // Vars
  const content = (
    <>
      <div className='mb-4 flex items-start gap-3'>
        <Avatar className='size-9 shrink-0'>
          <AvatarImage src={avatar} alt={message.from} />
          <AvatarFallback>{getInitialsFromName(message.from)}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-body-small-semibold'>{message.from}</span>
            <span className='text-muted-foreground text-body-mini-regular shrink-0'>
              {formatMailDate(message.date)}
            </span>
          </div>
          <div className='text-muted-foreground text-body-mini-regular'>{message.fromEmail}</div>
        </div>
      </div>
      <div className='text-foreground/80 text-body-small-regular whitespace-pre-wrap'>{message.body}</div>
    </>
  )

  if (variant === 'plain') {
    return <div className='px-3'>{content}</div>
  }

  return <div className='border-border/60 bg-muted/20 rounded-lg border p-4'>{content}</div>
}
