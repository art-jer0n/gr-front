import React from "react";
import { Card } from "primereact/card";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { OrganizationEditBlockProps } from "./organization-form-props";
import * as styles from "styles/organization-edit-form.module.css";
import { Organization } from "interfaces/organization";

const OrganizationEditBlock: React.FC<OrganizationEditBlockProps> = ({
  organization,
  onChange,
  errors,
}) => {

  const handleFileUploadSelect = (event: FileUploadSelectEvent, field: keyof Organization): void => {
    if (!event.files || !event.files.length) {
      return
    }

    onChange(field, URL.createObjectURL(event.files[0]));
  }

  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Organization): void => {
    onChange(field, event.target.value);
  }

  const getChooseLabel = (property: "logoUrl" | "pdfUrl" | "pptxUrl") => {
    if (property === "logoUrl") {
      if (organization.logoUrl) {
        return "Заменить логотип";
      }

      return "Добавить логотип";
    }

    if (property === "pdfUrl") {
      if (organization.pdfUrl) {
        return "Заменить PDF описание";
      }

      return "Добавить PDF описание";
    }

    if (property === "pptxUrl") {
      if (organization.pptxUrl) {
        return "Заменить PPTX описание";
      }

      return "Добавить PPTX описание";
    }

    return "Добавить";
  };

  return (
    <Card header="Редактирование организации" className={styles.card}>
      <div className={styles.items} style={{ height: "350px" }}>
        <div className={styles.row}>
          <div className={styles.left_column}>
            <Image
              preview
              alt="Логотип"
              className={styles.image}
              src={organization.logoUrl}
              width="330px"
              height="330px"
              style={{
                minWidth: "330px",
                minHeight: "330px",
              }} />
          </div>
          <div className={styles.right_column}>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id="name"
                  value={organization.name}
                  onChange={(event) => handleInputTextChange(event, "name")}
                  style={{ width: "90%" }}
                  className={errors?.name ? styles.error_input : ""} />
                <label htmlFor="name">Наименование</label>
              </FloatLabel>
              {errors?.name && (<small className={styles.error_text}>{errors.name}</small>)}
            </div>
            <div className={styles.item}>
              <FloatLabel>
                <InputText
                  id="shortName"
                  value={organization.shortName}
                  onChange={(event) => handleInputTextChange(event, "shortName")}
                  style={{ width: "90%" }}
                  className={errors?.shortName ? styles.error_input : ""} />
                <label htmlFor="shortName">Сокращенное наименование</label>
              </FloatLabel>
              {errors?.shortName && (<small className={styles.error_text}>{errors.shortName}</small>)}
            </div>
            <div className={styles.item}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <FileUpload
                  mode="basic"
                  name="logoUrl"
                  accept="image/*"
                  auto
                  chooseLabel={getChooseLabel("logoUrl")}
                  maxFileSize={90000000}
                  multiple={false}
                  onSelect={(event) => handleFileUploadSelect(event, "logoUrl")} />
                <span className={styles.url_text}>Ссылка на логотип: {organization.logoUrl}</span>
              </div>
              {errors?.logoUrl && (<small className={styles.error_text}>{errors.logoUrl}</small>)}
            </div>
            <div className={styles.item}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <FileUpload
                  mode="basic"
                  name="pdfFile"
                  accept="application/pdf"
                  maxFileSize={90000000}
                  auto
                  onSelect={(event) => handleFileUploadSelect(event, "pdfUrl")}
                  chooseLabel={getChooseLabel("pdfUrl")}
                  multiple={false} />
                <span className={styles.url_text}>Ссылка на PDF файл: {organization.pdfUrl}</span>
              </div>
              {errors?.pdfUrl && (<small className={styles.error_text}>{errors.pdfUrl}</small>)}
            </div>
            <div className={styles.item}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <FileUpload
                  mode="basic"
                  name="pptxFile"
                  accept="application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                  maxFileSize={90000000}
                  auto
                  onSelect={(event) => handleFileUploadSelect(event, "pptxUrl")}
                  chooseLabel={getChooseLabel("pptxUrl")}
                  multiple={false} />
                <span className={styles.url_text}>Ссылка на PPTX файл: {organization.pptxUrl}</span>
              </div>
              {errors?.pptxUrl && (<small className={styles.error_text}>{errors.pptxUrl}</small>)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationEditBlock;
