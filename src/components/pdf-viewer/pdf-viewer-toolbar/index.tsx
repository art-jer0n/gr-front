import React from "react";
import * as styles from "styles/pdf-viewer.module.css";
import { Toolbar } from "primereact/toolbar";
import { PdfViewerToolbarProps } from "./pdf-viewer-toolbar-props";
import { SelectButton } from "primereact/selectbutton";
import { viewTypeItemTemplate } from "../pdf-viewer-templates";
import { VIEW_TYPES } from "../pdf-viewer-consts";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";

const PdfViewerToolbar: React.FC<PdfViewerToolbarProps> = ({
  viewType,
  onChangeViewType,
  items,
  first,
  rows,
  totalRecords,
  onPageChange,
}) => {
  return (
    <Toolbar
      className={styles.pdf_viewer_toolbar}
      start={
        <>
          {items?.map((item) => (
            <Button
              key={`pdf_viewer_toolbar_buttons_${item.id}`}
              label={item.label}
              icon={item.icon}
              onClick={item.command}
              style={item.style}
              className={item.className}
            />
          ))}
        </>
      }
      center={
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
          className={styles.paginator}
          template={{
            layout: "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
            CurrentPageReport: (options) => {
              return (
                <span
                  style={{
                    color: "var(--text-color)",
                    userSelect: "none",
                    width: "60px",
                    textAlign: "center",
                  }}>
                  {options.first}
                </span>
              );
            },
          }}
        />
      }
      end={
        <SelectButton
          value={viewType}
          onChange={(e) => onChangeViewType(e.value)}
          options={VIEW_TYPES}
          itemTemplate={viewTypeItemTemplate}
        />
      }
    />
  );
};

export default PdfViewerToolbar;
