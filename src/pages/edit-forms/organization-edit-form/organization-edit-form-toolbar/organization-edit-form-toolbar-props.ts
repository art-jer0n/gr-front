import { Organization } from "interfaces/organization";

export interface OrganizationFormToolbarProps {
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
  organizations: Organization[];
  organizationId: string;
  handledChangeOrganizationId: (organizationId: string) => void
}
