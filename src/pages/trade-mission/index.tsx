import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { PageContext } from "../../page-context";
import { getCountries } from "../../services/country-service";
import TradeMissionToolbar from "./trade-mission-toolbar";
import * as styles from "styles/trade-mission.module.css";
import { Country } from "interfaces/country";
import { TradeMission as TradeMissionItem } from "interfaces/trade-mission";
import { getTradeMissionDocuments, getTradeMissions } from "services/trade-mission-service";
import { DEFAULT_TRADE_MISSION, EMPTY_SHORT_MESSAGE } from "app-consts";
import TradeMissionView from "./trade-mission-view";
import TradeMissionDocumentTable from "./trade-mission-document-table";
import { TradeMissionDocument } from "interfaces/trade-mission-document";

const TradeMission: React.FC = () => {
  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  const { id } = useParams();

  const countryId = Number(id);

  const [country, setCountry] = useState<Country>();

  const [tradeMissions, setTradeMissions] = useState<TradeMissionItem[]>([]);

  const [tradeMissionDocuments, setTradeMissionDocuments] = useState<TradeMissionDocument[]>([]);

  useEffect(() => {
    const countries = getCountries();
    const tradeMissions = getTradeMissions();
    const tradeMissionDocuments = getTradeMissionDocuments();

    let _country = countries.find((country) => country.id === countryId);
    let _tradeMissions = tradeMissions.filter((mission) => mission.countryId === _country?.id);
    let _tradeMissionDocuments = tradeMissionDocuments.filter((document) => document.countryId === _country?.id);

    if (!_tradeMissions.length) {
      _tradeMissions = [DEFAULT_TRADE_MISSION];
    }

    setCountry(_country);
    setTradeMissions(_tradeMissions);
    setTradeMissionDocuments(_tradeMissionDocuments);

    setTitle(`${_country?.name}, Торговое представительство`);
    setBreadcrumbs([
      { label: `Торговые представительства`, url: "/trade-mission", },
      { label: `${_country?.name || EMPTY_SHORT_MESSAGE}`, url: `/trade-mission/${_country?.id || 0}`, },
    ]);

  }, [id, setTitle, setBreadcrumbs]);

  return (
    <div className={styles.container}>
      <TradeMissionToolbar countryName={country?.name || EMPTY_SHORT_MESSAGE} countryId={countryId} />
      <TradeMissionView missions={tradeMissions} />
      <TradeMissionDocumentTable documents={tradeMissionDocuments} />
    </div>
  );
};

export default TradeMission;
