import React from "react";
import { Embassy } from "interfaces/embassy";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import * as styles from "styles/embassy-list.module.css";
import { EMPTY_SHORT_MESSAGE } from "app-consts";

const itemTemplate = (embassy: Embassy) => {
  return (
    <Card
      key={`card_${embassy.id}`}
      className={styles.card}
      header={embassy.embassyName || EMPTY_SHORT_MESSAGE}>
      <div className={styles.embassy_photo_block} >
        <Image
          preview
          alt="Фото посольства"
          className={styles.embassy_photo}
          src={embassy.embassyPhotoUrl || ""}
          height="230px" />
      </div>

      <div>
        <div className={styles.ellipsis}>
          <span>
            <strong>Адрес:</strong> <i>{embassy.embassyAddress}</i>
          </span>
        </div>
        <div className={styles.ellipsis}>
          <strong>Телефон:</strong> <i>{embassy.embassyPhone}</i>
        </div>
        <div className={styles.ellipsis}>
          <strong>Факс:</strong> <i>{embassy.embassyFax}</i>
        </div>
        <div className={styles.ellipsis}>
          <strong>График работы:</strong> <i>{embassy.embassyWorkHours}</i>
        </div>
        <div className={styles.ellipsis}>
          <strong>Web:</strong>
          <i>
            <Button
              label={embassy.embassyWebsite || ""}
              link
              onClick={() => window.open(embassy.embassyWebsite || "", "_blank")}
            />
          </i>
        </div>
        <div className={styles.ellipsis}>
          <strong>E-mail:</strong>
          <Button
            label={embassy.embassyEmail || ""}
            link
            onClick={() => (window.location.href = `mailto:${embassy.embassyEmail}`)} />
        </div>
      </div>

      <div className={styles.ambassador_photo_block}>
        <Image
          preview
          alt="Фото посла"
          className={styles.ambassador_photo}
          src={embassy.ambassadorPhotoUrl || ""}
          height="200px"
        />
        <div className={styles.ambassador_job_title}>{embassy.ambassadorJobTitle}</div>
        <div className={styles.ambassador_name}>{embassy.ambassadorName}</div>
      </div>
    </Card>
  );
};

export const listTemplate = (embassies: Embassy[]) => {
  return (
    <div className={styles.list}>
      {embassies.map((embassy) => itemTemplate(embassy))}
    </div>
  );
};
