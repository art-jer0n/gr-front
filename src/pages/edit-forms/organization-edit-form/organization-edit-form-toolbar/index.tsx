import React from "react";
import { Button } from "primereact/button";
import { OrganizationFormToolbarProps } from "./organization-edit-form-toolbar-props";
import * as styles from "styles/organization-edit-form.module.css";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { SelectItemOptionsType } from "primereact/selectitem";
import { EMPTY_MESSAGE } from "app-consts";

const OrganizationEditFormToolbar: React.FC<OrganizationFormToolbarProps> = ({
  organizationId,
  organizations,
  handledChangeOrganizationId,
  onSave,
  onCancel,
  onDelete,
}) => {

  const onChangeOrganizationId = (event: DropdownChangeEvent): void => {
    handledChangeOrganizationId(event.value)
  }

  const getOrganizationOptions = (): SelectItemOptionsType | undefined => {
    return [
      { label: "Новая организация", value: "new" },
      ...organizations.map(_ => ({ label: _.name, value: _.id.toString() }))
    ]
  }

  return (
    <div className={styles.toolbar}>
      <Dropdown
        filter
        value={organizationId}
        options={getOrganizationOptions()}
        onChange={onChangeOrganizationId}
        placeholder="Выберите страну"
        optionValue="value"
        emptyFilterMessage={EMPTY_MESSAGE}
        emptyMessage={EMPTY_MESSAGE}
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

export default OrganizationEditFormToolbar;
