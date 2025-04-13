import { MenuItem } from 'primereact/menuitem';

export interface PageContextProps {
  title: string
  setTitle: (title: string) => void;
  breadcrumbs: MenuItem[];
  setBreadcrumbs: (items: MenuItem[]) => void;

}
