import { Organization } from 'interfaces/organization'

const ORGANIZATION_STORAGE_KEY = 'organizations'

export const getOrganizations = (): Organization[] => {
  const stored = localStorage.getItem(ORGANIZATION_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export const saveOrganizations = (organizations: Organization[]): void => {
  localStorage.setItem(ORGANIZATION_STORAGE_KEY, JSON.stringify(organizations))
}

export const generateOrganizationId = (): number => {
  const organizations = getOrganizations()
  return (
    organizations.reduce(
      (max, organization) => Math.max(max, organization.id),
      0,
    ) + 1
  )
}

export const addOrganization = (organization: Organization): void => {
  const organizations = getOrganizations()
  organizations.push(organization)
  saveOrganizations(organizations)
}

export const updateOrganization = (updatedOrganization: Organization): void => {
  const organizations = getOrganizations()
  const index = organizations.findIndex(o => o.id === updatedOrganization.id)
  if (index !== -1) {
    organizations[index] = updatedOrganization
    saveOrganizations(organizations)
  }
}

export const deleteOrganization = (organizationId: number): void => {
  const organizations = getOrganizations()
  const updatedOrganizations = organizations.filter(
    organization => organization.id !== organizationId,
  )
  saveOrganizations(updatedOrganizations)
}
