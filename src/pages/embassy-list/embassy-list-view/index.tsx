import React from "react";
import { DataView } from "primereact/dataview";
import { EmbassyListViewProps } from "./embassy-list-view-props";
import { listTemplate } from "./embassy-list-view-templates";
import * as styles from "styles/country-list.module.css";
import { EMPTY_MESSAGE } from "app-consts";

const EmbassyListView: React.FC<EmbassyListViewProps> = ({ embassies }) => {
  return (
    <DataView
      value={embassies}
      listTemplate={listTemplate}
      layout="list"
      emptyMessage={EMPTY_MESSAGE}
      className={styles.view}
    />
  );
};

export default EmbassyListView;
