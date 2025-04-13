import React from "react";
import { Card } from "primereact/card";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { CountryEditBlockProps } from "./country-edit-block-props";
import * as styles from "styles/country-edit-form.module.css";
import { Country } from "interfaces/country";

const CountryEditBlock: React.FC<CountryEditBlockProps> = ({
  country,
  onChange,
  errors,
}) => {

  const handleFileUploadSelect = (event: FileUploadSelectEvent, field: keyof Country): void => {
    if (!event.files || !event.files.length) {
      return
    }

    onChange(field, URL.createObjectURL(event.files[0]));
  }

  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Country): void => {
    onChange(field, event.target.value);
  }

  return (
    <Card
      header="Редактирование страны"
      className={styles.card}
      style={{ height: "200px" }}>
      <Image
        id="flag"
        preview
        alt="Флаг"
        className={styles.image}
        src={country.flagUrl}
        width="240px"
        height="120px"
        style={{ minWidth: "240px", minHeight: "120px" }} />
      <div className={styles.items} style={{ height: "120px" }}>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id="name"
              value={country.name}
              onChange={(e) => handleInputTextChange(e, "name")}
              style={{ width: "100%" }}
              className={errors?.name ? styles.error_input : ""} />
            <label htmlFor="name">Наименование</label>
          </FloatLabel>
          {errors?.name && (<small className={styles.error_text}>{errors.name}</small>)}
        </div>
        <div className={styles.item}>
          <FileUpload
            mode="basic"
            accept="image/*"
            auto
            className={styles.button}
            chooseLabel="Выбрать флаг"
            maxFileSize={1000000}
            onSelect={(e) => handleFileUploadSelect(e, "flagUrl")} />
          {errors?.flagUrl && (<small className={styles.error_text}>{errors.flagUrl}</small>)}
        </div>
      </div>
    </Card>
  );
};

export default CountryEditBlock;
