import { Organization } from 'interfaces/organization'

export interface OrganizationEditBlockProps {
  organization: Organization
  onChange: (field: keyof Organization, value: string | File) => void
  errors: Partial<Record<keyof Organization, string>>
  toast: any
}
