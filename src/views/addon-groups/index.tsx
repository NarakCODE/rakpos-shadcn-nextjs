'use client'

import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import { ChevronLeftIcon, ChevronRightIcon, CopyIcon, MoreHorizontalIcon, PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { ConfirmDialog } from '@/components/shared/confirm-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel } from '@/components/ui/frame'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
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
import { mockAddonGroups } from '@/fake-db/addon-groups'
import type {
  AddonGroup,
  AddonGroupFormValues,
  AddonGroupRequirement,
  AddonGroupSelectionType,
  AddonGroupStatus
} from '@/types/addon-group-types'

type GroupTypeFilter = 'all' | AddonGroupSelectionType

const PAGE_SIZE_OPTIONS = [10, 25, 50]
const PAGE_SIZE_ITEMS = PAGE_SIZE_OPTIONS.map(size => ({ label: String(size), value: String(size) }))

const TYPE_ITEMS = [
  { label: 'All types', value: 'all' },
  { label: 'Single', value: 'Single' },
  { label: 'Multi', value: 'Multi' }
]

const GROUP_TYPE_ITEMS: { label: AddonGroupSelectionType; value: AddonGroupSelectionType }[] = [
  { label: 'Single', value: 'Single' },
  { label: 'Multi', value: 'Multi' }
]

const REQUIREMENT_ITEMS: { label: AddonGroupRequirement; value: AddonGroupRequirement }[] = [
  { label: 'Required', value: 'Required' },
  { label: 'Optional', value: 'Optional' }
]

const STATUS_ITEMS: { label: AddonGroupStatus; value: AddonGroupStatus }[] = [
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' }
]

export default function AddonGroupsView() {
  const [groups, setGroups] = useState<AddonGroup[]>(mockAddonGroups)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<GroupTypeFilter>('all')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [editingGroup, setEditingGroup] = useState<AddonGroup | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formSession, setFormSession] = useState(0)
  const [pendingDelete, setPendingDelete] = useState<AddonGroup | null>(null)

  const filteredGroups = useMemo(() => {
    const query = search.trim().toLowerCase()

    return groups.filter(group => {
      const matchesSearch =
        !query || group.name.toLowerCase().includes(query) || group.options.some(option => option.toLowerCase().includes(query))

      const matchesType = typeFilter === 'all' || group.selectionType === typeFilter

      return matchesSearch && matchesType
    })
  }, [groups, search, typeFilter])

  const totalCount = filteredGroups.length
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const pageStart = (safeCurrentPage - 1) * rowsPerPage
  const visibleGroups = filteredGroups.slice(pageStart, pageStart + rowsPerPage)

  const openCreateSheet = () => {
    setEditingGroup(null)
    setFormSession(session => session + 1)
    setIsFormOpen(true)
  }

  const openEditSheet = (group: AddonGroup) => {
    setEditingGroup(group)
    setFormSession(session => session + 1)
    setIsFormOpen(true)
  }

  const handleSaveGroup = (values: AddonGroupFormValues) => {
    if (editingGroup) {
      setGroups(current => current.map(group => (group.id === editingGroup.id ? { ...group, ...values } : group)))
      toast.success('Addon group updated')
    } else {
      setGroups(current => [{ id: crypto.randomUUID(), ...values }, ...current])
      setSearch('')
      setTypeFilter('all')
      setCurrentPage(1)
      toast.success('Addon group added')
    }

    setEditingGroup(null)
    setIsFormOpen(false)
  }

  const handleDuplicateGroup = (group: AddonGroup) => {
    const duplicate: AddonGroup = {
      ...group,
      id: crypto.randomUUID(),
      name: `${group.name} (copy)`
    }

    setGroups(current => {
      const groupIndex = current.findIndex(currentGroup => currentGroup.id === group.id)

      return [...current.slice(0, groupIndex + 1), duplicate, ...current.slice(groupIndex + 1)]
    })
    toast.success('Addon group duplicated')
  }

  const handleDeleteGroup = () => {
    if (!pendingDelete) return

    setGroups(current => current.filter(group => group.id !== pendingDelete.id))
    toast.success('Addon group deleted')
    setPendingDelete(null)
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>Addon Groups</h1>
          <FrameDescription>Manage customization options available for menu items</FrameDescription>
        </div>
        <Button variant='default' onClick={openCreateSheet}>
          <PlusIcon aria-hidden='true' />
          <span>Add Group</span>
        </Button>
      </div>

      <Frame className='w-full'>
        <FrameHeader>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground'>
              <Label htmlFor='addon-groups-page-size'>Show</Label>
              <Select
                items={PAGE_SIZE_ITEMS}
                value={String(rowsPerPage)}
                onValueChange={value => {
                  if (!value) return

                  setRowsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger id='addon-groups-page-size' className='w-20' aria-label='Entries per page'>
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

            <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
              <div className='w-full sm:w-64'>
                <Label htmlFor='addon-groups-search' className='sr-only'>
                  Search addon groups
                </Label>
                <InputGroup>
                  <InputGroupAddon>
                    <SearchIcon className='size-4' aria-hidden='true' />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='addon-groups-search'
                    type='search'
                    value={search}
                    onChange={event => {
                      setSearch(event.target.value)
                      setCurrentPage(1)
                    }}
                    placeholder='Search addon groups…'
                  />
                </InputGroup>
              </div>

              <div>
                <Label htmlFor='addon-groups-type-filter' className='sr-only'>
                  Filter by selection type
                </Label>
                <Select
                  items={TYPE_ITEMS}
                  value={typeFilter}
                  onValueChange={value => {
                    setTypeFilter((value as GroupTypeFilter | null) ?? 'all')
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger id='addon-groups-type-filter' className='w-36' aria-label='Filter by addon group type'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {TYPE_ITEMS.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </FrameHeader>

        <FramePanel className='p-0'>
          <div className='overflow-x-auto'>
            <Table className='min-w-[860px]'>
              <TableHeader variant='muted'>
                <TableRow>
                  <TableHead className='min-w-52'>Group name</TableHead>
                  <TableHead className='w-32'>Type</TableHead>
                  <TableHead className='w-32'>Required</TableHead>
                  <TableHead className='w-32'>Options</TableHead>
                  <TableHead className='w-32'>Max select</TableHead>
                  <TableHead className='w-32'>Status</TableHead>
                  <TableHead className='w-20 text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {visibleGroups.length > 0 ? (
                  visibleGroups.map(group => (
                    <TableRow key={group.id}>
                      <TableCell>
                        <span className='font-semibold text-foreground'>{group.name}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={group.selectionType === 'Single' ? 'secondary' : 'accent'}>
                          {group.selectionType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={group.requirement === 'Required' ? 'warning' : 'outline'}>
                          {group.requirement}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className='text-muted-foreground'>
                          {group.options.length} {group.options.length === 1 ? 'option' : 'options'}
                        </span>
                      </TableCell>
                      <TableCell>{group.maxSelect}</TableCell>
                      <TableCell>
                        <Badge variant={group.status === 'Active' ? 'success' : 'secondary'}>{group.status}</Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button variant='ghost' size='icon-sm' aria-label={`Actions for ${group.name}`}>
                                <MoreHorizontalIcon aria-hidden='true' />
                              </Button>
                            }
                          />
                          <DropdownMenuContent align='end' className='w-44'>
                            <DropdownMenuItem onClick={() => openEditSheet(group)}>
                              <PencilIcon aria-hidden='true' />
                              Edit group
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateGroup(group)}>
                              <CopyIcon aria-hidden='true' />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant='destructive' onClick={() => setPendingDelete(group)}>
                              <Trash2Icon aria-hidden='true' />
                              Delete group
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className='h-28 text-center'>
                      <div className='flex flex-col items-center gap-1.5'>
                        <p className='font-medium'>No addon groups found</p>
                        <p className='text-sm text-muted-foreground'>Try another name or selection type.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </FramePanel>

        <FrameFooter>
          <AddonGroupsPagination
            total={totalCount}
            rowsPerPage={rowsPerPage}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </FrameFooter>
      </Frame>

      <AddonGroupFormSheet
        key={formSession}
        group={editingGroup}
        open={isFormOpen}
        onOpenChange={open => {
          setIsFormOpen(open)
          if (!open) setEditingGroup(null)
        }}
        onSave={handleSaveGroup}
      />

      <ConfirmDialog
        title='Delete addon group?'
        description={`This will permanently remove ${pendingDelete?.name ?? 'this group'} from menu customizations.`}
        cancelLabel='Keep group'
        confirmLabel='Delete group'
        confirmVariant='destructive'
        open={Boolean(pendingDelete)}
        onOpenChange={open => {
          if (!open) setPendingDelete(null)
        }}
        onConfirm={handleDeleteGroup}
      />
    </div>
  )
}

type AddonGroupsPaginationProps = {
  total: number
  rowsPerPage: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function AddonGroupsPagination({ total, rowsPerPage, currentPage, totalPages, onPageChange }: AddonGroupsPaginationProps) {
  const showingFrom = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const showingTo = Math.min(currentPage * rowsPerPage, total)

  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <p className='text-sm text-muted-foreground'>
        Showing {showingFrom} to {showingTo} of {total} entries
      </p>
      <nav aria-label='Addon groups pagination'>
        <ul className='flex items-center gap-1'>
          <li>
            <Button
              type='button'
              variant='outline'
              size='icon'
              aria-label='Previous page'
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            >
              <ChevronLeftIcon aria-hidden='true' />
            </Button>
          </li>
          <li>
            <Button type='button' variant='default' size='icon' aria-label={`Page ${currentPage}`} aria-current='page'>
              {currentPage}
            </Button>
          </li>
          <li>
            <Button
              type='button'
              variant='outline'
              size='icon'
              aria-label='Next page'
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            >
              <ChevronRightIcon aria-hidden='true' />
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

type AddonGroupFormSheetProps = {
  group: AddonGroup | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (values: AddonGroupFormValues) => void
}

function AddonGroupFormSheet({ group, open, onOpenChange, onSave }: AddonGroupFormSheetProps) {
  const [name, setName] = useState(group?.name ?? '')
  const [selectionType, setSelectionType] = useState<AddonGroupSelectionType>(group?.selectionType ?? 'Single')
  const [requirement, setRequirement] = useState<AddonGroupRequirement>(group?.requirement ?? 'Required')
  const [optionsText, setOptionsText] = useState(group?.options.join('\n') ?? '')
  const [maxSelect, setMaxSelect] = useState(String(group?.maxSelect ?? 1))
  const [status, setStatus] = useState<AddonGroupStatus>(group?.status ?? 'Active')

  const options = optionsText.split('\n').map(option => option.trim()).filter(Boolean)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || options.length === 0) return

    const requestedMax = selectionType === 'Single' ? 1 : Number(maxSelect)
    const safeMaxSelect = Math.min(Math.max(1, requestedMax), options.length)

    onSave({
      name: name.trim(),
      selectionType,
      requirement,
      options,
      maxSelect: safeMaxSelect,
      status
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='sm:max-w-lg'>
        <form className='flex min-h-full flex-col' onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>{group ? 'Edit addon group' : 'Add addon group'}</SheetTitle>
            <SheetDescription>Set the choices customers can select for menu items.</SheetDescription>
          </SheetHeader>

          <div className='flex flex-col gap-4 overflow-y-auto px-4 pb-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='addon-group-name'>Group name</Label>
              <Input
                id='addon-group-name'
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder='e.g. Pizza Size'
                maxLength={60}
                required
              />
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='addon-group-type'>Selection type</Label>
                <Select
                  items={GROUP_TYPE_ITEMS}
                  value={selectionType}
                  onValueChange={value => {
                    if (value === 'Single' || value === 'Multi') {
                      setSelectionType(value)
                      if (value === 'Single') setMaxSelect('1')
                    }
                  }}
                >
                  <SelectTrigger id='addon-group-type' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {GROUP_TYPE_ITEMS.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2'>
                <Label htmlFor='addon-group-requirement'>Selection requirement</Label>
                <Select
                  items={REQUIREMENT_ITEMS}
                  value={requirement}
                  onValueChange={value => {
                    if (value === 'Required' || value === 'Optional') setRequirement(value)
                  }}
                >
                  <SelectTrigger id='addon-group-requirement' className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {REQUIREMENT_ITEMS.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='addon-group-options'>Options</Label>
              <Textarea
                id='addon-group-options'
                value={optionsText}
                onChange={event => setOptionsText(event.target.value)}
                placeholder={'Small\nMedium\nLarge'}
                rows={6}
                required
              />
              <p className='text-xs text-muted-foreground'>Enter one option per line. {options.length} options added.</p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='flex flex-col gap-2'>
                <Label htmlFor='addon-group-max-select'>Max select</Label>
                <Input
                  id='addon-group-max-select'
                  type='number'
                  min='1'
                  max={Math.max(1, options.length)}
                  step='1'
                  value={selectionType === 'Single' ? 1 : maxSelect}
                  onChange={event => setMaxSelect(event.target.value)}
                  disabled={selectionType === 'Single'}
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <Label htmlFor='addon-group-status'>Status</Label>
                <Select
                  items={STATUS_ITEMS}
                  value={status}
                  onValueChange={value => {
                    if (value === 'Active' || value === 'Inactive') setStatus(value)
                  }}
                >
                  <SelectTrigger id='addon-group-status' className='w-full'>
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
          </div>

          <SheetFooter>
            <div className='flex items-center justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type='submit' variant='default' disabled={!name.trim() || options.length === 0}>
                {group ? 'Save changes' : 'Add group'}
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
