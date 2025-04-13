import { EMPTY_MESSAGE } from "app-consts";
import React from "react";
import * as styles from "styles/pdf-viewer.module.css";

export const noDataTemplate = (): React.ReactNode => {
  return (
    <span className={styles.pdf_viewer_empty_message}>
      {EMPTY_MESSAGE}
    </span>
  );
};

export const loadingTemplate = (): React.ReactNode => (
  <div className={styles.pdf_viewer_loading_container}>
    <i className={`pi pi-spin pi-spinner ${styles.pdf_viewer_loading}`} />
  </div>
);

export const viewTypeItemTemplate = (viewType: string): React.ReactNode => {
  let iconClass = "";

  switch (viewType) {
    case "Scroll":
      iconClass = "pi pi-list";
      break;
    case "Button":
      iconClass = "pi pi-file";
      break;
    default:
      iconClass = "";
  }

  return <i className={iconClass} />;
};
