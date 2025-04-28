import React, { useState } from "react";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { EmbassyListToolbarProps } from "./embassy-list-toolbar-props";
import * as styles from "styles/country-list.module.css";
import { useNavigate } from "react-router";

const EmbassyListToolbar: React.FC<EmbassyListToolbarProps> = ({ onFilterChange, countryId, }) => {

  const navigate = useNavigate();

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
          style={{ width: "60vw", minWidth: "640px" }}
          value={searchText}
          onChange={handleSearchChange} />
      </IconField>
      <Button
        label="Редактировать"
        icon="pi pi-plus"
        style={{ width: "100%", minWidth: "160px" }}
        onClick={() => navigate(`/country/edit/${countryId}`)} />
    </div>
  );
};

export default EmbassyListToolbar;
