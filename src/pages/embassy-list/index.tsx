import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Embassy } from "../../interfaces/embassy";
import { PageContext } from "../../page-context";
import { getCountries } from "../../services/country-service";
import { getEmbassies } from "../../services/embassy-service";
import EmbassyListToolbar from "./embassy-list-toolbar";
import EmbassyListView from "./embassy-list-view";
import * as styles from "styles/embassy-list.module.css";

const EmbassyList: React.FC = () => {
  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  const { id } = useParams();

  useEffect(() => {
    const country = getCountries().find((country) => Number(id) === country.id);
    setTitle(`${country?.name}, Посольства`);
    setBreadcrumbs([
      { label: `Страны`, url: "/country", },
      { label: `${country?.name}, Посольства`, url: `/country/${country?.id}`, },
    ]);
  }, [setTitle, setBreadcrumbs]);

  const [embassies, setEmbassies] = useState<Embassy[]>(
    getEmbassies().filter((embassy) => Number(id) === embassy.countryId)
  );

  const handleFilterChange = (searchText: string) => {
    const lowerText = searchText.toLowerCase();
    const filtered = getEmbassies().filter(
      (embassy) =>
        Number(id) === embassy.countryId &&
        embassy.embassyName.toLowerCase().includes(lowerText)
    );

    setEmbassies(filtered);
  };

  return (
    <div className={styles.container}>
      <EmbassyListToolbar onFilterChange={handleFilterChange} countryId={Number(id)} />
      <EmbassyListView embassies={embassies} />
    </div>
  );
};

export default EmbassyList;
