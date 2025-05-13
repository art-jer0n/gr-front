import React, { useContext, useEffect, useState } from "react";
import { Country } from "interfaces/country";
import { PageContext } from "page-context";
import { getCountries } from "services/country-service";
import EmbassyListToolbar from "./embassy-list-toolbar";
import EmbassyListView from "./embassy-list-view";
import * as styles from "styles/country-list.module.css";

const EmbassyList: React.FC = () => {
  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  useEffect(() => {
    setTitle("Посольства");
    setBreadcrumbs([{ label: "Посольства", url: "/embassy" }]);
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
      <EmbassyListToolbar onFilterChange={handleFilterChange} />
      <EmbassyListView countries={countries} />
    </div>
  );
};

export default EmbassyList;
