import React from "react";
import { DataView } from "primereact/dataview";
import { TradeMissionViewProps } from "./trade-mission-view-props";
import * as styles from "styles/trade-mission.module.css";
import { EMPTY_MESSAGE } from "app-consts";
import { TradeMission } from "interfaces/trade-mission";
import TradeMissionViewList from "../trade-mission-view-list";

const TradeMissionView: React.FC<TradeMissionViewProps> = ({ missions }) => {

  const listTemplate = (missions: TradeMission[]) => <TradeMissionViewList missions={missions} />;

  return (
    <DataView
      value={missions}
      listTemplate={listTemplate}
      layout="list"
      emptyMessage={EMPTY_MESSAGE}
      className={styles.view} />
  );
};

export default TradeMissionView;
