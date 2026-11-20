import { ArrowUpRightIcon, MoreHorizontalIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className='flex flex-col gap-0.5'>
      <h2 className='text-text-primary text-title-mini-semibold'>{title}</h2>
      <p className='text-text-secondary text-body-small-regular'>{description}</p>
    </div>
  )
}

export function CardDocsDemo() {
  return (
    <div aria-label='Card demo preview' className='flex flex-col gap-8'>
      <section className='flex flex-col gap-4'>
        <SectionHeading
          title='Variants (4)'
          description='Default, flat, interactive hover/focus, and subdued surface treatments.'
        />

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <Card variant='default'>
            <CardHeader>
              <CardTitle>Default card</CardTitle>
              <CardDescription>Standard surface with subtle shadow and 1px perimeter ring.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary text-body-small-regular'>
                Use for primary content blocks, metric summaries, and settings groups.
              </p>
            </CardContent>
          </Card>

          <Card variant='flat'>
            <CardHeader>
              <CardTitle>Flat card</CardTitle>
              <CardDescription>Zero drop shadow while retaining the 1px surface ring.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary text-body-small-regular'>
                Use in dense grids or low-elevation layouts where shadow depth is not needed.
              </p>
            </CardContent>
          </Card>

          <Card variant='interactive' tabIndex={0}>
            <CardHeader>
              <CardTitle>Interactive card</CardTitle>
              <CardDescription>Elevates shadow on hover and displays a focus ring on keyboard focus.</CardDescription>
              <CardAction>
                <ArrowUpRightIcon className='text-text-tertiary size-4' aria-hidden='true' />
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary text-body-small-regular'>
                Click or tab to focus this card surface when the entire container acts as a trigger.
              </p>
            </CardContent>
          </Card>

          <Card variant='subdued'>
            <CardHeader>
              <CardTitle>Subdued card</CardTitle>
              <CardDescription>Reduced opacity for inactive, paused, or archived items.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary text-body-small-regular'>
                Keeps structural alignment in lists while signaling lower visual priority.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className='border-border-gray flex flex-col gap-4 border-t pt-6'>
        <SectionHeading
          title='Sizes (2)'
          description='Default (24px spacing) and small (16px spacing with compact title typography).'
        />

        <div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
          <Card size='default'>
            <CardHeader>
              <CardTitle>Default size</CardTitle>
              <CardDescription>Uses 24px internal spacing and mini title scale.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary text-body-small-regular'>
                Ideal for standalone panels, forms, and detailed overview sections.
              </p>
            </CardContent>
            <CardFooter className='justify-end gap-2'>
              <Button type='button' variant='outline' size='sm'>
                Dismiss
              </Button>
              <Button type='button' size='sm'>
                Confirm
              </Button>
            </CardFooter>
          </Card>

          <Card size='sm'>
            <CardHeader>
              <CardTitle>Small size</CardTitle>
              <CardDescription>Uses 16px internal spacing and body-regular semibold title.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-text-secondary text-body-small-regular'>
                Ideal for compact widgets, sidebars, and high-density dashboard tiles.
              </p>
            </CardContent>
            <CardFooter className='justify-end gap-2'>
              <Button type='button' variant='outline' size='xs'>
                Dismiss
              </Button>
              <Button type='button' size='xs'>
                Confirm
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className='border-border-gray flex flex-col gap-4 border-t pt-6'>
        <SectionHeading
          title='Composition & divided header (2)'
          description='Combine header actions, status badges, divided headers, content rows, and footers.'
        />

        <div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Kitchen station</CardTitle>
              <CardDescription>Main dining room prep queue</CardDescription>
              <CardAction>
                <Badge variant='success'>Online</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <span className='text-text-secondary text-body-small-regular'>Active tickets</span>
                <span className='text-text-primary text-body-small-medium'>14 orders</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-text-secondary text-body-small-regular'>Average prep time</span>
                <span className='text-text-primary text-body-small-medium'>6m 40s</span>
              </div>
            </CardContent>
            <CardFooter className='justify-between gap-2'>
              <span className='text-text-tertiary text-body-mini-regular'>Updated just now</span>
              <Button type='button' variant='secondary' size='sm'>
                Open queue
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader variant='divided'>
              <CardTitle>Divided header</CardTitle>
              <CardDescription>Adds a bottom border below the card header region.</CardDescription>
              <CardAction>
                <Button type='button' variant='ghost' size='icon-sm' aria-label='Card options'>
                  <MoreHorizontalIcon aria-hidden='true' />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <span className='text-text-secondary text-body-small-regular'>Daily settlement</span>
                <span className='text-text-primary text-body-small-medium'>Ready for review</span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-text-secondary text-body-small-regular'>Batch reference</span>
                <span className='text-text-primary text-body-small-medium'>POS-2048</span>
              </div>
            </CardContent>
            <CardFooter className='justify-end gap-2'>
              <Button type='button' variant='outline' size='sm'>
                Export
              </Button>
              <Button type='button' variant='pos-action' size='sm'>
                Settle batch
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
