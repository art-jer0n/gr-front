import React from "react";
import { Card } from "primereact/card";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { EmbassyEditBlockProps } from "./embassy-edit-block-props";
import * as styles from "styles/country-edit-form.module.css";
import { Embassy } from "interfaces/embassy";

const EmbassyEditBlock: React.FC<EmbassyEditBlockProps> = ({
  formTitle,
  embassy,
  onChange,
  errors,
}) => {

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
      <div className={styles.items} style={{ height: "750px" }}>
        <div className={styles.row}>
          <div className={styles.left_column}>
            <Image
              preview
              alt="Фото посольства"
              className={styles.image}
              src={embassy.embassyPhotoUrl}
              width="250px"
              height="250px"
              style={{ minWidth: "250px", minHeight: "250px" }} />
          </div>
          <div className={styles.right_column}>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`embassy_name_${embassy.embassyId}`}
                  value={embassy.embassyName}
                  onChange={(event) => handleInputTextChange(event, "embassyName")}
                  style={{ width: "100%" }}
                  className={errors?.embassyName ? styles.error_input : ""} />
                <label htmlFor={`embassy_name_${embassy.embassyId}`}>Наименование</label>
              </FloatLabel>
              {errors?.embassyName && (<small className={styles.error_text}>{errors.embassyName}</small>)}
            </div>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`embassy_address_${embassy.embassyId}`}
                  value={embassy.embassyAddress}
                  onChange={(event) => handleInputTextChange(event, "embassyAddress")}
                  style={{ width: "100%" }}
                  className={errors?.embassyAddress ? styles.error_input : ""} />
                <label htmlFor={`embassy_address_${embassy.embassyId}`}>Адрес</label>
              </FloatLabel>
              {errors?.embassyAddress && (<small className={styles.error_text}>{errors.embassyAddress}</small>)}
            </div>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`embassy_phone_${embassy.embassyId}`}
                  value={embassy.embassyPhone}
                  onChange={(event) => handleInputTextChange(event, "embassyPhone")}
                  style={{ width: "100%" }}
                  className={errors?.embassyPhone ? styles.error_input : ""} />
                <label htmlFor={`embassy_phone_${embassy.embassyId}`}>Телефон</label>
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
              {errors?.embassyPhotoUrl && (<small className={styles.error_text}>{errors.embassyPhotoUrl}</small>)}
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id={`embassy_work_hours_${embassy.embassyId}`}
              value={embassy.embassyWorkHours}
              onChange={(event) => handleInputTextChange(event, "embassyWorkHours")}
              style={{ width: "100%" }}
              className={errors?.embassyWorkHours ? styles.error_input : ""} />
            <label htmlFor={`embassy_work_hours_${embassy.embassyId}`}>Часы работы</label>
          </FloatLabel>
          {errors?.embassyWorkHours && (<small className={styles.error_text}>{errors.embassyWorkHours}</small>)}
        </div>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id={`embassy_fax_${embassy.embassyId}`}
              value={embassy.embassyFax}
              onChange={(event) => handleInputTextChange(event, "embassyFax")}
              style={{ width: "100%" }}
              className={errors?.embassyFax ? styles.error_input : ""} />
            <label htmlFor={`embassy_fax_${embassy.embassyId}`}>Факс</label>
          </FloatLabel>
          {errors?.embassyFax && (<small className={styles.error_text}>{errors.embassyFax}</small>)}
        </div>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id={`embassy_website_${embassy.embassyId}`}
              value={embassy.embassyWebsite}
              onChange={(event) => handleInputTextChange(event, "embassyWebsite")}
              style={{ width: "100%" }}
              className={errors?.embassyWebsite ? styles.error_input : ""}
            />
            <label htmlFor={`embassy_website_${embassy.embassyId}`}>Веб-сайт</label>
          </FloatLabel>
          {errors?.embassyWebsite && (<small className={styles.error_text}>{errors.embassyWebsite}</small>)}
        </div>
        <div className={styles.item}>
          <FloatLabel>
            <InputText
              id={`embassy_email_${embassy.embassyId}`}
              value={embassy.embassyEmail}
              onChange={(event) => handleInputTextChange(event, "embassyEmail")}
              style={{ width: "100%" }}
              className={errors?.embassyEmail ? styles.error_input : ""} />
            <label htmlFor={`embassy_email_${embassy.embassyId}`}>Email</label>
          </FloatLabel>
          {errors?.embassyEmail && (<small className={styles.error_text}>{errors.embassyEmail}</small>)}
        </div>
        <div className={styles.row}>
          <div className={styles.left_column}>
            <Image
              preview
              alt="Фото посла"
              className={styles.image}
              src={embassy.ambassadorPhotoUrl}
              width="200px"
              height="200px"
              style={{ minWidth: "200px", minHeight: "200px" }} />
          </div>
          <div className={styles.right_column}>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`ambassador_name_${embassy.embassyId}`}
                  value={embassy.ambassadorName}
                  onChange={(event) => handleInputTextChange(event, "ambassadorName")}
                  style={{ width: "100%" }}
                  className={errors?.ambassadorName ? styles.error_input : ""} />
                <label htmlFor={`ambassador_name_${embassy.embassyId}`}>ФИО</label>
              </FloatLabel>
              {errors?.ambassadorName && (<small className={styles.error_text}>{errors.ambassadorName}</small>)}
            </div>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id={`ambassador_job_title_${embassy.embassyId}`}
                  value={embassy.ambassadorJobTitle}
                  onChange={(event) => handleInputTextChange(event, "ambassadorJobTitle")}
                  style={{ width: "100%" }}
                  className={errors?.ambassadorJobTitle ? styles.error_input : ""} />
                <label htmlFor={`ambassador_job_title_${embassy.embassyId}`}>Должность</label>
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
              {errors?.ambassadorPhotoUrl && (<small className={styles.error_text}>{errors.ambassadorPhotoUrl}</small>)}
            </div>
          </div>
        </div>
      </div>
    </Card >
  );
};

export default EmbassyEditBlock;
