import React from "react";
import { DataView } from "primereact/dataview";
import { EmbassyViewProps } from "./embassy-view-props";
import { listTemplate } from "./embassy-view-templates";
import * as styles from "styles/country-list.module.css";
import { EMPTY_MESSAGE } from "app-consts";

const EmbassyView: React.FC<EmbassyViewProps> = ({ embassies }) => {
  return (
    <DataView
      value={embassies}
      listTemplate={listTemplate}
      layout="list"
      emptyMessage={EMPTY_MESSAGE}
      className={styles.view} />
  );
};

export default EmbassyView;
