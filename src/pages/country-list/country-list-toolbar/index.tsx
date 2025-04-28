import React, { useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { CountryListToolbarProps } from "./country-lsit-toolbar-props";
import * as styles from "styles/country-list.module.css";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";

const CountryListToolbar: React.FC<CountryListToolbarProps> = ({ onFilterChange, }) => {

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onFilterChange(e.target.value);
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
        label="Новая страна"
        icon="pi pi-plus"
        style={{ width: "100%", minWidth: "160px" }}
        onClick={() => navigate("/country/edit/new")} />
    </div>
  );
};

export default CountryListToolbar;
