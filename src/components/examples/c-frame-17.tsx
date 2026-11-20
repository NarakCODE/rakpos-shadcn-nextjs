import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from '@/components/ui/frame'

export function Pattern() {
  return (
    <Frame className='w-full max-w-sm [--frame-radius:var(--radius-2xl)]'>
      <FrameHeader>
        <FrameTitle>Creative Portfolio</FrameTitle>
        <FrameDescription>Showcasing visual art and design</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h2 className='text-body-small-semibold'>Gallery View</h2>
        <p className='text-muted-foreground text-body-small-regular'>
          2XL radius provides a very soft, organic look suitable for creative portfolios and landing pages.
        </p>
      </FramePanel>
      <FrameFooter>
        <p className='text-muted-foreground text-body-small-regular'>Browse 12 projects</p>
      </FrameFooter>
    </Frame>
  )
}
