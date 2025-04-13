import React, { useState } from "react";
// import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { CountryListToolbarProps } from "./country-lsit-toolbar-props";
import * as styles from "styles/country-list.module.css";
// import { useNavigate } from "react-router";

const CountryListToolbar: React.FC<CountryListToolbarProps> = ({ onFilterChange, }) => {

  // const navigate = useNavigate();

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
          style={{ width: "70vw" }}
          value={searchText}
          onChange={handleSearchChange}
        />
      </IconField>
      {/* <Button
        label="Новая страна"
        icon="pi pi-plus"
        style={{ minWidth: "160px", width: "10vw" }}
        onClick={() => navigate("/country/edit/new")}
      /> */}
    </div>
  );
};

export default CountryListToolbar;
