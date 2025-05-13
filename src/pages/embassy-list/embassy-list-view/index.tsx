import React from "react";
import { DataView } from "primereact/dataview";
import { EmbassyListViewProps } from "./embassy-list-view-props";
import { Card } from "primereact/card";
import * as styles from "styles/country-list.module.css";
import { useNavigate } from "react-router";
import { Country } from "interfaces/country";
import { EMPTY_MESSAGE, EMPTY_SHORT_MESSAGE } from "app-consts";

const EmbassyListView: React.FC<EmbassyListViewProps> = ({ countries }) => {
  const navigate = useNavigate();

  const itemTemplate = (country: Country) => {
    return (
      <Card
        key={`country_card_${country?.id}`}
        className={styles.card}
        header={country?.name || EMPTY_SHORT_MESSAGE}
        onClick={() => navigate(`/embassy/${country?.id || "new"}`)}
      >
        <img
          key={`country_flag_${country?.id}`}
          src={country?.flagUrl || ""}
          alt={country?.name || EMPTY_SHORT_MESSAGE}
          className={styles.flag}
        />
      </Card >
    );
  };

  const listTemplate = (countries: Country[]) => {
    return (
      <div className={styles.list}>
        {countries.map((country) => itemTemplate(country,))}
      </div>
    );
  };


  return (
    <DataView
      value={countries}
      listTemplate={listTemplate}
      layout="grid"
      emptyMessage={EMPTY_MESSAGE}
      className={styles.view}
    />
  );
};

export default EmbassyListView;
