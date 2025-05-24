import React from "react";
import { Card } from "primereact/card";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { EmbassyEditBlockProps } from "./embassy-edit-block-props";
import * as styles from "styles/country-edit-form.module.css";
import { Embassy } from "interfaces/embassy";

const EmbassyEditBlock: React.FC<EmbassyEditBlockProps> = ({ formTitle, embassy, onChange, errors, }) => {

  const handleFileUploadSelect = (event: FileUploadSelectEvent, field: keyof Embassy): void => {
    if (!event.files || !event.files.length) {
      return
    }

    onChange(field, URL.createObjectURL(event.files[0]));
  }

  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Embassy): void => {
    onChange(field, event.target.value);
  }

  return (
    <Card header={formTitle} className={styles.card}>
      <div className={styles.items} style={{ height: "850px" }}>
        <div className={styles.row}>
          <div className={styles.left_column}>
            <Image
              preview
              alt="Фото посольства"
              className={errors?.embassyPhotoUrl ? styles.error_input : styles.image}
              src={embassy.embassyPhotoUrl || ""}
              width="300px"
              height="300px"
              style={{ minWidth: "300px", minHeight: "300px" }} />
            {errors?.embassyPhotoUrl && (<small className={styles.error_text}>{errors.embassyPhotoUrl}</small>)}
          </div>
          <div className={styles.right_column}>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`embassy-name-${embassy.id}`}
                  value={embassy.embassyName || ""}
                  onChange={(event) => handleInputTextChange(event, "embassyName")}
                  style={{ width: "100%" }}
                  className={errors?.embassyName ? styles.error_input : ""} />
                <label htmlFor={`embassy-name-${embassy.id}`}>Наименование</label>
              </FloatLabel>
              {errors?.embassyName && (<small className={styles.error_text}>{errors.embassyName}</small>)}
            </div>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`embassy-address-${embassy.id}`}
                  value={embassy.embassyAddress || ""}
                  onChange={(event) => handleInputTextChange(event, "embassyAddress")}
                  style={{ width: "100%" }}
                  className={errors?.embassyAddress ? styles.error_input : ""} />
                <label htmlFor={`embassy-address-${embassy.id}`}>Адрес</label>
              </FloatLabel>
              {errors?.embassyAddress && (<small className={styles.error_text}>{errors.embassyAddress}</small>)}
            </div>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`embassy-phone-${embassy.id}`}
                  value={embassy.embassyPhone || ""}
                  onChange={(event) => handleInputTextChange(event, "embassyPhone")}
                  style={{ width: "100%" }}
                  className={errors?.embassyPhone ? styles.error_input : ""} />
                <label htmlFor={`embassy-phone-${embassy.id}`}>Телефон</label>
              </FloatLabel>
              {errors?.embassyPhone && (<small className={styles.error_text}>{errors.embassyPhone}</small>)}
            </div>
            <div className={styles.item}>
              <FileUpload
                mode="basic"
                accept="image/*"
                auto
                chooseLabel="Выбрать фотографию посольства"
                maxFileSize={1000000}
                className={styles.button}
                onSelect={(event) => handleFileUploadSelect(event, "embassyPhotoUrl")} />
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id={`embassy-work-hours-${embassy.id}`}
              value={embassy.embassyWorkHours || ""}
              onChange={(event) => handleInputTextChange(event, "embassyWorkHours")}
              style={{ width: "100%" }}
              className={errors?.embassyWorkHours ? styles.error_input : ""} />
            <label htmlFor={`embassy-work-hours-${embassy.id}`}>Часы работы</label>
          </FloatLabel>
          {errors?.embassyWorkHours && (<small className={styles.error_text}>{errors.embassyWorkHours}</small>)}
        </div>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id={`embassy-fax-${embassy.id}`}
              value={embassy.embassyFax || ""}
              onChange={(event) => handleInputTextChange(event, "embassyFax")}
              style={{ width: "100%" }}
              className={errors?.embassyFax ? styles.error_input : ""} />
            <label htmlFor={`embassy-fax-${embassy.id}`}>Факс</label>
          </FloatLabel>
          {errors?.embassyFax && (<small className={styles.error_text}>{errors.embassyFax}</small>)}
        </div>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id={`embassy-website-${embassy.id}`}
              value={embassy.embassyWebsite || ""}
              onChange={(event) => handleInputTextChange(event, "embassyWebsite")}
              style={{ width: "100%" }}
              className={errors?.embassyWebsite ? styles.error_input : ""} />
            <label htmlFor={`embassy-website-${embassy.id}`}>Веб-сайт</label>
          </FloatLabel>
          {errors?.embassyWebsite && (<small className={styles.error_text}>{errors.embassyWebsite}</small>)}
        </div>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id={`embassy-email-${embassy.id}`}
              value={embassy.embassyEmail || ""}
              onChange={(event) => handleInputTextChange(event, "embassyEmail")}
              style={{ width: "100%" }}
              className={errors?.embassyEmail ? styles.error_input : ""} />
            <label htmlFor={`embassy-email-${embassy.id}`}>Email</label>
          </FloatLabel>
          {errors?.embassyEmail && (<small className={styles.error_text}>{errors.embassyEmail}</small>)}
        </div>
        <div className={styles.row}>
          <div className={styles.left_column}>
            <Image
              preview
              alt="Фото посла"
              className={errors?.ambassadorPhotoUrl ? styles.error_input : styles.image}
              src={embassy.ambassadorPhotoUrl || ""}
              width="220px"
              height="220px"
              style={{ minWidth: "220px", minHeight: "220px" }} />
            {errors?.ambassadorPhotoUrl && (<small style={{ paddingLeft: "10px" }} className={styles.error_text}>{errors.ambassadorPhotoUrl}</small>)}
          </div>
          <div className={styles.right_column}>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`ambassador-name-${embassy.id}`}
                  value={embassy.ambassadorName || ""}
                  onChange={(event) => handleInputTextChange(event, "ambassadorName")}
                  style={{ width: "100%" }}
                  className={errors?.ambassadorName ? styles.error_input : ""} />
                <label htmlFor={`ambassador-name-${embassy.id}`}>ФИО</label>
              </FloatLabel>
              {errors?.ambassadorName && (<small className={styles.error_text}>{errors.ambassadorName}</small>)}
            </div>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`ambassador-job-title-${embassy.id}`}
                  value={embassy.ambassadorJobTitle || ""}
                  onChange={(event) => handleInputTextChange(event, "ambassadorJobTitle")}
                  style={{ width: "100%" }}
                  className={errors?.ambassadorJobTitle ? styles.error_input : ""} />
                <label htmlFor={`ambassador-job-title-${embassy.id}`}>Должность</label>
              </FloatLabel>
              {errors?.ambassadorJobTitle && (<small className={styles.error_text}>{errors.ambassadorJobTitle}</small>)}
            </div>
            <div className={styles.item}>
              <FileUpload
                mode="basic"
                accept="image/*"
                auto
                chooseLabel="Выбрать фотографию посла"
                maxFileSize={1000000}
                className={styles.button}
                onSelect={(event) => handleFileUploadSelect(event, "ambassadorPhotoUrl")} />
            </div>
          </div>
        </div>
      </div>
    </Card >
  );
};

export default EmbassyEditBlock;
