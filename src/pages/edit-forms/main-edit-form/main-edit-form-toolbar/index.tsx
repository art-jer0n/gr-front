import React from "react";
import { Button } from "primereact/button";
import * as styles from "styles/main-edit-form.module.css";
import { MainEditFormToolbarProps } from "./main-edit-form-toolbar-props";

const CountryEditFormToolbar: React.FC<MainEditFormToolbarProps> = ({
    onSave,
    onCancel,
}) => {

    return (
        <div className={styles.toolbar}>
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
        </div>
    );
};

export default CountryEditFormToolbar;
