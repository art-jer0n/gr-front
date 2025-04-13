import React from "react";
import { Button } from "primereact/button";
import { CountryFormToolbarProps } from "./edit-form-toolbar-props";
import * as styles from "styles/country-edit-form.module.css";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectItemOptionsType } from "primereact/selectitem";
import { EMPTY_MESSAGE } from "app-consts";

const CountryEditFormToolbar: React.FC<CountryFormToolbarProps> = ({
  countryId,
  countries,
  handleCountryId,
  onSave,
  onCancel,
  onDelete,
}) => {

  const onChangeCountryId = (event: DropdownChangeEvent): void => {
    handleCountryId(event.value)
  }

  const getCountryOptions = (): SelectItemOptionsType | undefined => {
    return [
      { label: "Новая страна", value: "new" },
      ...countries.map(_ => ({ label: _.name, value: _.id.toString() }))
    ]
  }

  return (
    <div className={styles.toolbar}>
      <Dropdown
        filter
        value={countryId}
        options={getCountryOptions()}
        onChange={onChangeCountryId}
        emptyFilterMessage={EMPTY_MESSAGE}
        emptyMessage={EMPTY_MESSAGE}
        placeholder="Выберите страну"
        optionValue="value"
        optionLabel="label"
        className={styles.dropdown}
      />
      <Button
        label="Сохранить"
        icon="pi pi-save"
        className={styles.button}
        onClick={onSave}
      />
      <Button
        label="Отменить"
        icon="pi pi-times"
        className={styles.button}
        onClick={onCancel}
      />
      <Button
        label="Удалить"
        icon="pi pi-trash"
        className={styles.button}
        onClick={onDelete}
      />
    </div>
  );
};

export default CountryEditFormToolbar;
