import React from "react";
import { Card } from "primereact/card";
import { TradeMissionCardProps } from "./trade-mission-card-props";
import * as styles from "styles/trade-mission.module.css";
import { EMPTY_SHORT_MESSAGE } from "app-consts";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

const TradeMissionCard: React.FC<TradeMissionCardProps> = ({ mission }) => {
    return (
        <Card
            header={mission?.name || "Торговое представительство"}
            key={`trade-mission-card-${mission?.id || 0}`}
            className={styles.card}>
            <div className={classNames(styles.row, styles.even)}>
                <span className={styles.label}>Торговый представитель:</span>
                <span className={styles.value}>{mission?.representative || EMPTY_SHORT_MESSAGE}</span>
            </div>
            <div className={classNames(styles.row, styles.odd)}>
                <span className={styles.label}>Адрес:</span>
                <span className={styles.value}>{mission?.address || EMPTY_SHORT_MESSAGE}</span>
            </div>
            <div className={classNames(styles.row, styles.even)}>
                <span className={styles.label}>Телефон:</span>
                <span className={styles.value}>{mission?.phone || EMPTY_SHORT_MESSAGE}</span>
            </div>
            <div className={classNames(styles.row, styles.odd)}>
                <span className={styles.label}>Факс:</span>
                <span className={styles.value}>{mission?.fax || EMPTY_SHORT_MESSAGE}</span>
            </div>
            <div className={classNames(styles.row, styles.even)}>
                <span className={styles.label}>Web:</span>
                <span className={styles.value}>
                    {!mission?.website ?
                        EMPTY_SHORT_MESSAGE :
                        <Button
                            label={mission.website}
                            className={classNames("p-button-link", styles.link)}
                            onClick={() => window.open(mission.website || "", "_blank", "noopener,noreferrer")} />
                    }
                </span>
            </div>
            <div className={classNames(styles.row, styles.odd)}>
                <span className={styles.label}>E-mail:</span>
                <span className={styles.value}>{mission?.email || EMPTY_SHORT_MESSAGE}</span>
            </div>
        </Card>
    );
};

export default TradeMissionCard;
