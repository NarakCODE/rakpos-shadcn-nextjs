'use client'

import { useMemo, useState } from 'react'

import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  PencilIcon,
  SearchIcon,
  Trash2Icon
} from 'lucide-react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel } from '@/components/ui/frame'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { mockCategories, type CategoryStatus, type MenuCategory } from '@/fake-db/categories'

type StatusFilter = 'all' | CategoryStatus
type SortDirection = 'asc' | 'desc'

const PAGE_SIZE_OPTIONS = [10, 25, 50]
const PAGE_SIZE_ITEMS = PAGE_SIZE_OPTIONS.map(size => ({ label: String(size), value: String(size) }))

const STATUS_ITEMS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' }
]

export default function CategoriesView() {
  const [categories, setCategories] = useState<MenuCategory[]>(mockCategories)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<MenuCategory | null>(null)

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase()

    return categories
      .filter(category => {
        const matchesSearch =
          !query || category.name.toLowerCase().includes(query) || category.description.toLowerCase().includes(query)

        const matchesStatus = statusFilter === 'all' || category.status === statusFilter

        return matchesSearch && matchesStatus
      })
      .sort((first, second) => (sortDirection === 'asc' ? first.index - second.index : second.index - first.index))
  }, [categories, search, sortDirection, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / rowsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const pageStart = (safeCurrentPage - 1) * rowsPerPage
  const visibleCategories = filteredCategories.slice(pageStart, pageStart + rowsPerPage)
  const showingFrom = filteredCategories.length === 0 ? 0 : pageStart + 1
  const showingTo = Math.min(pageStart + rowsPerPage, filteredCategories.length)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleStatusChange = (value: string | null) => {
    setStatusFilter((value as StatusFilter | null) ?? 'all')
    setCurrentPage(1)
  }

  const handleRowsPerPageChange = (value: string | null) => {
    if (!value) return

    setRowsPerPage(Number(value))
    setCurrentPage(1)
  }

  const openEditSheet = (category: MenuCategory) => {
    setEditingCategory(category)
    setIsEditOpen(true)
  }

  const handleSaveCategory = (updatedCategory: MenuCategory) => {
    setCategories(current => current.map(category => (category.id === updatedCategory.id ? updatedCategory : category)))
    setEditingCategory(null)
    setIsEditOpen(false)
    toast.success('Category updated')
  }

  const handleDeleteCategory = () => {
    if (!pendingDelete) return

    setCategories(current => current.filter(category => category.id !== pendingDelete.id))
    toast.success(`${pendingDelete.name} category deleted`)
    setPendingDelete(null)
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Categories</h1>
        <FrameDescription>Organize the items on your menu by category</FrameDescription>
      </div>

      <Frame className='w-full'>
        <FrameHeader>
          <div className='grid gap-3 md:grid-cols-[auto_minmax(14rem,1fr)] xl:grid-cols-[auto_minmax(14rem,1fr)_12rem] xl:items-center'>
            <div className='flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground'>
              <Label htmlFor='categories-page-size'>Show</Label>
              <Select
                items={PAGE_SIZE_ITEMS}
                value={String(rowsPerPage)}
                onValueChange={handleRowsPerPageChange}
              >
                <SelectTrigger id='categories-page-size' className='w-20' aria-label='Entries per page'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {PAGE_SIZE_OPTIONS.map(size => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <span>entries</span>
            </div>

            <div className='min-w-0'>
              <Label htmlFor='categories-search' className='sr-only'>
                Search categories
              </Label>
              <InputGroup>
                <InputGroupAddon>
                  <SearchIcon className='size-4' aria-hidden='true' />
                </InputGroupAddon>
                <InputGroupInput
                  id='categories-search'
                  type='search'
                  value={search}
                  onChange={event => handleSearchChange(event.target.value)}
                  placeholder='Search categories…'
                />
              </InputGroup>
            </div>

            <div>
              <Label htmlFor='categories-status-filter' className='sr-only'>
                Filter by status
              </Label>
              <Select items={STATUS_ITEMS} value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger id='categories-status-filter' className='w-full' aria-label='Filter categories by status'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {STATUS_ITEMS.map(item => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FrameHeader>

        <FramePanel className='p-0'>
          <div className='overflow-x-auto'>
            <Table className='min-w-[720px]'>
              <TableHeader variant='muted'>
                <TableRow>
                  <TableHead className='w-20'>
                    <Button
                      type='button'
                      variant='ghost-muted'
                      size='sm'
                      className='-ml-2'
                      onClick={() => setSortDirection(current => (current === 'asc' ? 'desc' : 'asc'))}
                      aria-label={`Sort by index ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
                    >
                      <span>#</span>
                      {sortDirection === 'asc' ? (
                        <ArrowUpIcon className='size-3.5' aria-hidden='true' />
                      ) : sortDirection === 'desc' ? (
                        <ArrowDownIcon className='size-3.5' aria-hidden='true' />
                      ) : (
                        <ArrowUpDownIcon className='size-3.5' aria-hidden='true' />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className='w-20'>Icon</TableHead>
                  <TableHead className='min-w-44'>Name</TableHead>
                  <TableHead className='min-w-64'>Description</TableHead>
                  <TableHead className='w-32'>Status</TableHead>
                  <TableHead className='w-20 text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {visibleCategories.length > 0 ? (
                  visibleCategories.map(category => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <span className='text-muted-foreground'>{category.index}</span>
                      </TableCell>
                      <TableCell>
                        <span
                          className='flex size-10 items-center justify-center rounded-xl bg-muted text-xl'
                          aria-label={`${category.name} icon`}
                          role='img'
                        >
                          {category.icon}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className='font-semibold text-foreground'>{category.name}</span>
                      </TableCell>
                      <TableCell>
                        <span className='text-muted-foreground'>{category.description}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={category.status === 'Active' ? 'success' : 'secondary'}>{category.status}</Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button variant='ghost' size='icon-sm' aria-label={`Actions for ${category.name}`}>
                                <MoreHorizontalIcon aria-hidden='true' />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align='end' className='w-40'>
                            <DropdownMenuItem onClick={() => openEditSheet(category)}>
                              <PencilIcon aria-hidden='true' />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant='destructive' onClick={() => setPendingDelete(category)}>
                              <Trash2Icon aria-hidden='true' />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='h-28 text-center'>
                      <div className='flex flex-col items-center gap-1.5'>
                        <p className='font-medium'>No categories found</p>
                        <p className='text-sm text-muted-foreground'>Try another name, description, or status.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </FramePanel>

        <FrameFooter className='flex-row flex-wrap items-center justify-between gap-3'>
          <p className='text-sm text-muted-foreground'>
            Showing {showingFrom} to {showingTo} of {filteredCategories.length} entries
          </p>
          <nav aria-label='Category table pagination'>
            <ul className='flex items-center gap-1'>
              <li>
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  aria-label='Previous page'
                  disabled={safeCurrentPage <= 1}
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                >
                  <ChevronLeftIcon aria-hidden='true' />
                </Button>
              </li>
              <li>
                <Button type='button' variant='default' size='icon' aria-label={`Page ${safeCurrentPage}`} aria-current='page'>
                  {safeCurrentPage}
                </Button>
              </li>
              <li>
                <Button
                  type='button'
                  variant='outline'
                  size='icon'
                  aria-label='Next page'
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                >
                  <ChevronRightIcon aria-hidden='true' />
                </Button>
              </li>
            </ul>
          </nav>
        </FrameFooter>
      </Frame>

      <CategoryEditSheet
        key={editingCategory?.id ?? 'category-edit'}
        category={editingCategory}
        open={isEditOpen}
        onOpenChange={open => {
          setIsEditOpen(open)
          if (!open) setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
      />

      <ConfirmDialog
        title='Delete category?'
        description={`This will permanently remove ${pendingDelete?.name ?? 'this category'} from the menu.`}
        cancelLabel='Keep category'
        confirmLabel='Delete category'
        confirmVariant='destructive'
        open={Boolean(pendingDelete)}
        onOpenChange={open => {
          if (!open) setPendingDelete(null)
        }}
        onConfirm={handleDeleteCategory}
      />
    </div>
  )
}

type CategoryEditSheetProps = {
  category: MenuCategory | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (category: MenuCategory) => void
}

function CategoryEditSheet({ category, open, onOpenChange, onSave }: CategoryEditSheetProps) {
  const [icon, setIcon] = useState(category?.icon ?? '')
  const [name, setName] = useState(category?.name ?? '')
  const [description, setDescription] = useState(category?.description ?? '')
  const [status, setStatus] = useState<CategoryStatus>(category?.status ?? 'Active')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!category) return

    onSave({
      ...category,
      icon: icon.trim() || category.icon,
      name: name.trim(),
      description: description.trim(),
      status
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-md'>
        <form className='flex min-h-full flex-col' onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit category</SheetTitle>
            <SheetDescription>Update the name, description, icon, or availability for this menu group.</SheetDescription>
          </SheetHeader>

          <div className='flex flex-col gap-5 px-6 py-6'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='category-icon'>Icon</Label>
              <InputGroup>
                <InputGroupInput
                  id='category-icon'
                  value={icon}
                  onChange={event => setIcon(event.target.value)}
                  aria-label='Category icon'
                  maxLength={8}
                />
              </InputGroup>
              <p className='text-xs text-muted-foreground'>Emoji or symbol</p>
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='category-name'>Name</Label>
              <InputGroup>
                <InputGroupInput
                  id='category-name'
                  value={name}
                  onChange={event => setName(event.target.value)}
                  required
                  maxLength={48}
                />
              </InputGroup>
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='category-description'>Description</Label>
              <Textarea
                id='category-description'
                value={description}
                onChange={event => setDescription(event.target.value)}
                rows={3}
                maxLength={120}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='category-status'>Status</Label>
              <Select
                items={STATUS_ITEMS.slice(1)}
                value={status}
                onValueChange={value => {
                  if (value === 'Active' || value === 'Inactive') setStatus(value)
                }}
              >
                <SelectTrigger id='category-status'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {STATUS_ITEMS.slice(1).map(item => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter>
            <div className='flex items-center justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type='submit' disabled={!category || !name.trim()}>
                Save changes
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
