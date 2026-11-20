'use client'

import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible'

import { cn } from '@/lib/utils'

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot='collapsible' {...props} />
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return <CollapsiblePrimitive.Trigger data-slot='collapsible-trigger' {...props} />
}

function CollapsibleContent({
  animation = 'height',
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props & { animation?: 'none' | 'height' }) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot='collapsible-content'
      data-animation={animation}
      className={cn(
        animation === 'height' &&
          'h-(--collapsible-panel-height) overflow-hidden transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-opacity motion-reduce:data-ending-style:h-(--collapsible-panel-height) motion-reduce:data-starting-style:h-(--collapsible-panel-height)',
        className
      )}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
