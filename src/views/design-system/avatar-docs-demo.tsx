import { CheckIcon } from 'lucide-react'

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  UserAvatar
} from '@/components/ui/avatar'
import type { AvatarSizePreset } from '@/components/ui/avatar'

const SIZE_PRESETS: Array<{ size: AvatarSizePreset; label: string; src: string; initials: string }> = [
  { size: 'xs', label: 'Extra small (20px)', src: '/images/avatars/avatar-1.webp', initials: 'AK' },
  { size: 'sm', label: 'Small (24px)', src: '/images/avatars/avatar-2.webp', initials: 'SL' },
  { size: 'default', label: 'Default (32px)', src: '/images/avatars/avatar-3.webp', initials: 'MR' },
  { size: 'lg', label: 'Large (40px)', src: '/images/avatars/avatar-10.webp', initials: 'JD' },
  { size: 'xl', label: 'Extra large (48px)', src: '/images/avatars/avatar-11.webp', initials: 'EN' },
  { size: '2xl', label: 'Double extra large (64px)', src: '/images/avatars/avatar-12.webp', initials: 'TC' }
]

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <h2 className='text-text-primary text-title-mini-semibold'>{title}</h2>
      <p className='text-text-secondary text-body-small-regular'>{description}</p>
    </div>
  )
}

export function AvatarDocsDemo() {
  return (
    <section aria-label='Avatar demo preview' className='bg-bg-primary shadow-low flex flex-col gap-6 rounded-xl p-6'>
      <div className='flex flex-col gap-4'>
        <SectionHeading
          title='Sizes (7)'
          description='Six named presets from 20px to 64px plus arbitrary numeric pixel sizing.'
        />

        <div className='flex flex-wrap items-end gap-6'>
          {SIZE_PRESETS.map(item => (
            <div key={item.size} className='flex flex-col items-center gap-2'>
              <Avatar size={item.size}>
                <AvatarImage src={item.src} alt={item.label} />
                <AvatarFallback>{item.initials}</AvatarFallback>
              </Avatar>
              <span className='text-text-tertiary text-body-mini-regular'>{item.label}</span>
            </div>
          ))}

          <div className='flex flex-col items-center gap-2'>
            <Avatar size={52}>
              <AvatarImage src='/images/avatars/avatar-13.webp' alt='Custom 52px avatar' />
              <AvatarFallback>52</AvatarFallback>
            </Avatar>
            <span className='text-text-tertiary text-body-mini-regular'>Custom (52px)</span>
          </div>
        </div>
      </div>

      <div className='border-border-gray grid grid-cols-1 gap-6 border-t pt-6 lg:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <SectionHeading
            title='Shapes (3)'
            description='Round for people, tile and square for workspaces, brands, and stations.'
          />

          <div className='flex flex-wrap items-center gap-6'>
            <div className='flex items-center gap-2.5'>
              <Avatar size='lg' shape='round'>
                <AvatarImage src='/images/avatars/avatar-14.webp' alt='Round avatar' />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
              <span className='text-text-secondary text-body-small-regular'>Round</span>
            </div>

            <div className='flex items-center gap-2.5'>
              <Avatar size='lg' shape='tile'>
                <AvatarImage src='/images/avatars/avatar-15.webp' alt='Tile avatar' />
                <AvatarFallback>TL</AvatarFallback>
              </Avatar>
              <span className='text-text-secondary text-body-small-regular'>Tile</span>
            </div>

            <div className='flex items-center gap-2.5'>
              <Avatar size='lg' shape='square'>
                <AvatarImage src='/images/avatars/avatar-16.webp' alt='Square avatar' />
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
              <span className='text-text-secondary text-body-small-regular'>Square</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <SectionHeading
            title='Borders & logo inset (4)'
            description='Inner shadow ring, borderless, profile halo ring, and contained brand logo inset.'
          />

          <div className='flex flex-wrap items-center gap-6'>
            <div className='flex items-center gap-2.5'>
              <Avatar size='lg' border='default'>
                <AvatarImage src='/images/avatars/avatar-17.webp' alt='Default border' />
                <AvatarFallback>DF</AvatarFallback>
              </Avatar>
              <span className='text-text-secondary text-body-small-regular'>Default ring</span>
            </div>

            <div className='flex items-center gap-2.5'>
              <Avatar size='lg' border='none'>
                <AvatarImage src='/images/avatars/avatar-18.webp' alt='No border' />
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
              <span className='text-text-secondary text-body-small-regular'>No border</span>
            </div>

            <div className='flex items-center gap-2.5'>
              <Avatar size='lg' border='profile'>
                <AvatarImage src='/images/avatars/avatar-19.webp' alt='Profile halo' />
                <AvatarFallback>PR</AvatarFallback>
              </Avatar>
              <span className='text-text-secondary text-body-small-regular'>Profile halo</span>
            </div>

            <div className='flex items-center gap-2.5'>
              <Avatar size='lg' shape='tile'>
                <AvatarImage src='/brand/rakfound-mark-cobalt.svg' alt='Rakfound mark' inset='logo' />
                <AvatarFallback>RF</AvatarFallback>
              </Avatar>
              <span className='text-text-secondary text-body-small-regular'>Logo inset</span>
            </div>
          </div>
        </div>
      </div>

      <div className='border-border-gray grid grid-cols-1 gap-6 border-t pt-6 lg:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <SectionHeading
            title='Fallbacks, UserAvatar & skeleton (6)'
            description='Initials scale, person icon fallback, and matching-shape loading skeletons.'
          />

          <div className='flex flex-wrap items-center gap-5'>
            <div className='flex items-center gap-2'>
              <Avatar size='lg'>
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <span className='text-text-tertiary text-body-mini-regular'>Initials</span>
            </div>

            <div className='flex items-center gap-2'>
              <Avatar size='lg' shape='tile'>
                <AvatarFallback text='compact'>POS</AvatarFallback>
              </Avatar>
              <span className='text-text-tertiary text-body-mini-regular'>Compact text</span>
            </div>

            <div className='flex items-center gap-2'>
              <UserAvatar size='lg' alt='Maya Lin' showInitials />
              <span className='text-text-tertiary text-body-mini-regular'>Auto initials</span>
            </div>

            <div className='flex items-center gap-2'>
              <UserAvatar size='lg' alt='Guest cashier' />
              <span className='text-text-tertiary text-body-mini-regular'>Icon fallback</span>
            </div>

            <div className='flex items-center gap-2'>
              <Avatar size='lg' isLoading />
              <Avatar size='lg' shape='tile' isLoading />
              <span className='text-text-tertiary text-body-mini-regular'>Loading</span>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <SectionHeading
            title='Badges & stacked groups (3)'
            description='Corner status indicators and overlapping team stacks with overflow count.'
          />

          <div className='flex flex-wrap items-center gap-6'>
            <div className='flex items-center gap-3'>
              <Avatar size='default'>
                <AvatarImage src='/images/avatars/avatar-1.webp' alt='Online staff' />
                <AvatarFallback>OS</AvatarFallback>
                <AvatarBadge />
              </Avatar>

              <Avatar size='xl'>
                <AvatarImage src='/images/avatars/avatar-2.webp' alt='Verified manager' />
                <AvatarFallback>VM</AvatarFallback>
                <AvatarBadge>
                  <CheckIcon aria-hidden='true' />
                </AvatarBadge>
              </Avatar>
            </div>

            <AvatarGroup>
              <Avatar size='default'>
                <AvatarImage src='/images/avatars/avatar-1.webp' alt='Team member 1' />
                <AvatarFallback>T1</AvatarFallback>
              </Avatar>
              <Avatar size='default'>
                <AvatarImage src='/images/avatars/avatar-2.webp' alt='Team member 2' />
                <AvatarFallback>T2</AvatarFallback>
              </Avatar>
              <Avatar size='default'>
                <AvatarImage src='/images/avatars/avatar-3.webp' alt='Team member 3' />
                <AvatarFallback>T3</AvatarFallback>
              </Avatar>
              <Avatar size='default'>
                <AvatarImage src='/images/avatars/avatar-10.webp' alt='Team member 4' />
                <AvatarFallback>T4</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+5</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
