import React from "react";
import { PdfViewerPanelProps } from "./pdf-viewer-panel-props";
import * as styles from "styles/pdf-viewer.module.css";
import { Panel } from "primereact/panel";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const PdfViewerPanel: React.FC<PdfViewerPanelProps> = ({ pageCount, onPageClick, fileUrl }) => {
  return (
    <Panel
      header="Страницы"
      className={styles.pdf_viewer_panel}>
      <Document
        file={fileUrl}
        noData={null}
        loading={null}
        error={null}>
        {Array.from({ length: pageCount }, (_, index) => (
          <div
            key={`pdf_viewer_panel_item_container_${index}`}
            className={styles.pdf_viewer_panel_item_container}
            onClick={() => onPageClick(index + 1)}>
            <Page
              key={`pdf_viewer_panel_item_${index}`}
              className={styles.pdf_viewer_panel_item}
              noData={null}
              loading={null}
              error={null}
              pageNumber={index + 1}
              scale={0.3} />
            <div
              key={`pdf_viewer_panel_item_title_${index}`}
              className={styles.pdf_viewer_panel_item_title}>
              {index + 1}
            </div>
          </div>
        ))}
      </Document>
    </Panel>
  );
};

export default PdfViewerPanel;
