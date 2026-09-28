export type AddonGroupSelectionType = 'Single' | 'Multi'
export type AddonGroupRequirement = 'Required' | 'Optional'
export type AddonGroupStatus = 'Active' | 'Inactive'

export type AddonGroup = {
  id: string
  name: string
  selectionType: AddonGroupSelectionType
  requirement: AddonGroupRequirement
  options: string[]
  maxSelect: number
  status: AddonGroupStatus
}

export type AddonGroupFormValues = Omit<AddonGroup, 'id'>
