import React, { useState } from "react";
// import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { OrganizationListToolbarProps } from "./organization-lsit-toolbar-props";
import * as styles from "styles/organization-list.module.css";
// import { useNavigate } from "react-router";

const OrganizationListToolbar: React.FC<OrganizationListToolbarProps> = ({ onFilterChange, }) => {

  // const navigate = useNavigate()

  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    onFilterChange(event.target.value);
  };

  return (
    <div className={styles.toolbar}>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search"> </InputIcon>
        <InputText
          style={{ width: "70vw" }}
          value={searchText}
          onChange={handleSearchChange} />
      </IconField>
      {/* <Button
        label="Новая организация"
        icon="pi pi-plus"
        style={{ width: "15vw" }}
        className={styles.button}
        onClick={() => navigate(`/organization/edit/new`)}
      /> */}
    </div>
  );
};

export default OrganizationListToolbar;
