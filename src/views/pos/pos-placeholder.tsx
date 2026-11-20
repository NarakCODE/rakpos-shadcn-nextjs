import type { LucideIcon } from 'lucide-react'

type PosPlaceholderProps = {
  title: string
  description: string
  icon: LucideIcon
}

const PosPlaceholder = ({ title, description, icon: Icon }: PosPlaceholderProps) => {
  return (
    <div className='flex min-h-96 flex-1 flex-col items-center justify-center gap-4 text-center'>
      <span className='bg-secondary text-secondary-foreground flex size-16 items-center justify-center rounded-2xl'>
        <Icon className='size-8' aria-hidden='true' />
      </span>
      <div className='flex max-w-md flex-col gap-2'>
        <h1 className='text-title-regular'>{title}</h1>
        <p className='text-muted-foreground text-body-small-regular'>{description}</p>
      </div>
    </div>
  )
}

export default PosPlaceholder
