import React, { useContext, useEffect, useState } from "react";
import { Country } from "interfaces/country";
import { PageContext } from "page-context";
import { getCountries } from "services/country-service";
import CountryListToolbar from "./country-list-toolbar";
import CountryListView from "./country-list-view";
import * as styles from "styles/country-list.module.css";

const CountryList: React.FC = () => {
  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  useEffect(() => {
    setTitle("Страны");
    setBreadcrumbs([{ label: "Страны", url: "/country" }]);
  }, [setTitle]);

  const [countries, setCountries] = useState<Country[]>(getCountries());

  const handleFilterChange = (searchText: string) => {
    const lowerText = searchText.toLowerCase();
    const filtered = getCountries()
      .filter((country) => country.name.toLowerCase().includes(lowerText));
    setCountries(filtered);
  };

  return (
    <div className={styles.container}>
      <CountryListToolbar onFilterChange={handleFilterChange} />
      <CountryListView countries={countries} />
    </div>
  );
};

export default CountryList;
