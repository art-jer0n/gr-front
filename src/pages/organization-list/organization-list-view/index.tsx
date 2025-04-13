import React from "react";
import { DataView } from "primereact/dataview";
import { OrganizationListViewProps } from "./organization-list-view-props";
import * as styles from "styles/organization-list.module.css";
import { Organization } from "interfaces/organization";
import { Card } from "primereact/card";
import { useNavigate } from "react-router";
import { EMPTY_MESSAGE, EMPTY_SHORT_MESSAGE } from "app-consts";

const OrganizationListView: React.FC<OrganizationListViewProps> = ({ organizations, }) => {
  const navigate = useNavigate()

  const itemTemplate = (organization: Organization) => {
    return (
      <Card
        key={`card_${organization?.id}`}
        className={styles.card}
        header={organization?.name || EMPTY_SHORT_MESSAGE}
        onClick={() => navigate(`/organization/${organization.id}`)}
      >
        <img
          key={`url_${organization?.id}`}
          src={organization?.logoUrl || ""}
          alt={organization?.name || EMPTY_SHORT_MESSAGE}
          className={styles.logo}
        />
      </Card >
    );
  };

  const listTemplate = (organizations: Organization[]) => {
    return (
      <div className={styles.list}>
        {organizations.map((organization) => itemTemplate(organization))}
      </div>
    );
  };


  return (
    <DataView
      value={organizations}
      listTemplate={listTemplate}
      layout="grid"
      emptyMessage={EMPTY_MESSAGE}
      className={styles.view}
    />
  );
};

export default OrganizationListView;
