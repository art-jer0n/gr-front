import React, { useContext, useEffect, useState } from "react";
import { Organization } from "../../interfaces/organization";
import { PageContext } from "../../page-context";
import { getOrganizations } from "../../services/organization-service";
import OrganizationListToolbar from "./organization-list-toolbar";
import OrganizationListView from "./organization-list-view";
import * as styles from "styles/country-list.module.css";

const OrganizationList: React.FC = () => {
  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  useEffect(() => {
    setTitle("Международные организации");
    setBreadcrumbs([
      { label: "Международные организации", url: "/organization", },
    ]);
  }, [setTitle]);

  const [organizations, setOrganizations] = useState<Organization[]>(
    getOrganizations()
  );

  const handleFilterChange = (searchText: string) => {
    const lowerText = searchText.toLowerCase();
    const filtered = getOrganizations().filter((organization) =>
      organization.name.toLowerCase().includes(lowerText)
    );

    setOrganizations(filtered);
  };

  return (
    <div className={styles.container}>
      <OrganizationListToolbar onFilterChange={handleFilterChange} />
      <OrganizationListView organizations={organizations} />
    </div>
  );
};

export default OrganizationList;
