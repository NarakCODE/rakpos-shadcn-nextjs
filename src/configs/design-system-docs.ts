export type DesignSystemDocSectionName = 'Foundation' | 'Components'

export type DesignSystemDocItem = {
  title: string
  slug: string
  href: string
  section: DesignSystemDocSectionName
  aliases?: string[]
}

export type DesignSystemDocSection = {
  label: DesignSystemDocSectionName
  items: DesignSystemDocItem[]
}

const DOCS_BASE_PATH = '/design-system/docs'

function createDocItem(
  title: string,
  slug: string,
  section: DesignSystemDocSectionName,
  aliases?: string[]
): DesignSystemDocItem {
  return {
    title,
    slug,
    href: `${DOCS_BASE_PATH}/${slug}`,
    section,
    ...(aliases ? { aliases } : {})
  }
}

export const DESIGN_SYSTEM_DOCS_SECTIONS: DesignSystemDocSection[] = [
  {
    label: 'Foundation',
    items: [
      createDocItem('Get Started', 'get-started', 'Foundation'),
      createDocItem('Colors', 'colors', 'Foundation'),
      createDocItem('Typography', 'typography', 'Foundation'),
      createDocItem('Icons', 'icons', 'Foundation')
    ]
  },
  {
    label: 'Components',
    items: [
      createDocItem('Active Bar', 'active-bar', 'Components'),
      createDocItem('Alert', 'alert', 'Components'),
      createDocItem('Audio Player', 'audio-player', 'Components'),
      createDocItem('Avatar', 'avatar', 'Components'),
      createDocItem('Badge', 'badge', 'Components'),
      createDocItem('Banner', 'banner', 'Components'),
      createDocItem('Breadcrumb', 'breadcrumb', 'Components'),
      createDocItem('Button', 'button', 'Components'),
      createDocItem('Card', 'card', 'Components'),
      createDocItem('Checkbox', 'checkbox', 'Components'),
      createDocItem('Code Block', 'code-block', 'Components'),
      createDocItem('Collapsible', 'collapsible', 'Components'),
      createDocItem('Combobox', 'combobox', 'Components'),
      createDocItem('Command Bar', 'command-bar', 'Components'),
      createDocItem('Composer', 'composer', 'Components'),
      createDocItem('Confirm Dialog', 'confirm-dialog', 'Components'),
      createDocItem('Context Menu', 'context-menu', 'Components'),
      createDocItem('Dialog', 'dialog', 'Components'),
      createDocItem('Drawer', 'drawer', 'Components'),
      createDocItem('Dropdown Menu', 'dropdown-menu', 'Components'),
      createDocItem('Empty & Error States', 'empty-error-states', 'Components', ['empty-and-error-states']),
      createDocItem('Filter Builder', 'filter-builder', 'Components'),
      createDocItem('Highlights', 'highlights', 'Components'),
      createDocItem('Hover Card', 'hover-card', 'Components'),
      createDocItem('Input', 'input', 'Components'),
      createDocItem('Kbd', 'kbd', 'Components'),
      createDocItem('List', 'list', 'Components'),
      createDocItem('Multi-select Filter', 'multi-select-filter', 'Components'),
      createDocItem('Multi-step Form', 'multi-step-form', 'Components'),
      createDocItem('Notification Badge', 'notification-badge', 'Components'),
      createDocItem('Pagination', 'pagination', 'Components'),
      createDocItem('Pill / Tag', 'pill-tag', 'Components'),
      createDocItem('Popover', 'popover', 'Components'),
      createDocItem('Progress Bar', 'progress-bar', 'Components'),
      createDocItem('Question Tool', 'question-tool', 'Components'),
      createDocItem('Radio Group', 'radio-group', 'Components'),
      createDocItem('Resize Handle', 'resize-handle', 'Components'),
      createDocItem('Scroll Area', 'scroll-area', 'Components'),
      createDocItem('Section Header', 'section-header', 'Components'),
      createDocItem('Segmented Tabs', 'segmented-tabs', 'Components'),
      createDocItem('Separator', 'separator', 'Components'),
      createDocItem('Single-select Filter', 'single-select-filter', 'Components'),
      createDocItem('Skeleton', 'skeleton', 'Components'),
      createDocItem('Spinner', 'spinner', 'Components'),
      createDocItem('Split Button', 'split-button', 'Components'),
      createDocItem('Statistic', 'statistic', 'Components'),
      createDocItem('Status Badge', 'status-badge', 'Components'),
      createDocItem('Switch', 'switch', 'Components'),
      createDocItem('Tab Strip', 'tab-strip', 'Components'),
      createDocItem('Table', 'table', 'Components'),
      createDocItem('Tabs', 'tabs', 'Components'),
      createDocItem('Text Shimmer', 'text-shimmer', 'Components'),
      createDocItem('Textarea', 'textarea', 'Components'),
      createDocItem('Toast', 'toast', 'Components'),
      createDocItem('Toggle Group', 'toggle-group', 'Components'),
      createDocItem('Toolbar', 'toolbar', 'Components'),
      createDocItem('Tooltip', 'tooltip', 'Components'),
      createDocItem('Tree', 'tree', 'Components'),
      createDocItem('Truncated Text', 'truncated-text', 'Components'),
      createDocItem('Video Player', 'video-player', 'Components')
    ]
  }
]

export const ALL_DESIGN_SYSTEM_DOCS: DesignSystemDocItem[] = DESIGN_SYSTEM_DOCS_SECTIONS.flatMap(
  section => section.items
)

export function getDesignSystemDocBySlug(slug: string): DesignSystemDocItem | undefined {
  return ALL_DESIGN_SYSTEM_DOCS.find(item => item.slug === slug || item.aliases?.includes(slug))
}

export function getAdjacentDesignSystemDocs(slug: string): {
  prev: DesignSystemDocItem | null
  next: DesignSystemDocItem | null
} {
  const index = ALL_DESIGN_SYSTEM_DOCS.findIndex(item => item.slug === slug || item.aliases?.includes(slug))

  if (index === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: index > 0 ? ALL_DESIGN_SYSTEM_DOCS[index - 1] : null,
    next: index < ALL_DESIGN_SYSTEM_DOCS.length - 1 ? ALL_DESIGN_SYSTEM_DOCS[index + 1] : null
  }
}
