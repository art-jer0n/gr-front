import React from "react";
import { TradeMissionDocument } from "interfaces/trade-mission-document";
import { EMPTY_SHORT_MESSAGE } from "app-consts";
import { format } from "date-fns";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import * as styles from "styles/trade-mission.module.css";

export const nameTemplate = (rowData: TradeMissionDocument): React.ReactNode => {
    if (!rowData?.name) {
        return <span>{EMPTY_SHORT_MESSAGE}</span>;
    }

    if (!rowData?.url) {
        return rowData.name;
    }

    return (
        <Button
            label={rowData.name}
            icon="pi pi-file"
            className={classNames("p-button-link", styles.link)}
            style={{ width: "100%" }}
            onClick={() => window.open(rowData.url!, "_blank", "noopener,noreferrer")} />
    );
};


export const dateTemplate = (rowData: TradeMissionDocument): React.ReactNode => {
    if (!rowData?.date) {
        return <span>{EMPTY_SHORT_MESSAGE}</span>;
    }

    return format(rowData.date, "dd.MM.yyyy");
};
