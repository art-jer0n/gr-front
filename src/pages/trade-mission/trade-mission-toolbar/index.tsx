import React from "react";
import { Button } from "primereact/button";
import { TradeMissionToolbarProps } from "./trade-mission-toolbar-props";
import * as styles from "styles/trade-mission.module.css";
import { useNavigate } from "react-router";

const TradeMissionToolbar: React.FC<TradeMissionToolbarProps> = ({ countryName, countryId, }) => {

  const navigate = useNavigate();

  return (
    <div className={styles.toolbar}>
      <span
        className={styles.title}
        style={{ width: "90%", minWidth: "640px" }} >
        Торговое представительство Российской Федерации: {countryName}
      </span>
      <Button
        label="Редактировать"
        icon="pi pi-pencil"
        style={{ width: "10%", minWidth: "160px" }}
        onClick={() => navigate(`/country/edit/${countryId}`)} />
    </div>
  );
};

export default TradeMissionToolbar;
