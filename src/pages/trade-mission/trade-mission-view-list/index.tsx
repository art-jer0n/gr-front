import React from "react";
import * as styles from "styles/trade-mission.module.css";
import TradeMissionCard from "../trade-mission-card";
import { TradeMissionViewListProps } from "./trade-mission-view-list-props";

const TradeMissionViewList: React.FC<TradeMissionViewListProps> = ({ missions }) => {

    return (
        <div className={styles.list}>
            {missions.map((mission) => <TradeMissionCard key={mission.id} mission={mission} />)}
        </div>
    );
};

export default TradeMissionViewList;
