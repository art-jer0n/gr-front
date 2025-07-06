import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Embassy as EmbassyItem } from "../../interfaces/embassy";
import { PageContext } from "../../page-context";
import { getCountries } from "../../services/country-service";
import { getEmbassies } from "../../services/embassy-service";
import EmbassyToolbar from "./embassy-toolbar";
import EmbassyView from "./embassy-view";
import * as styles from "styles/embassy-list.module.css";

const Embassy: React.FC = () => {
  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  const { id } = useParams();

  useEffect(() => {
    const country = getCountries().find((country) => Number(id) === country.id);
    setTitle(`${country?.name}, Посольства`);
    setBreadcrumbs([
      { label: `Посольства`, url: "/embassy", },
      { label: `${country?.name}`, url: `/embassy/${country?.id}`, },
    ]);
  }, [setTitle, setBreadcrumbs]);

  const [embassies, setEmbassies] = useState<EmbassyItem[]>(
    getEmbassies().filter((embassy) => Number(id) === embassy.countryId)
  );

  const handleFilterChange = (searchText: string) => {
    const lowerText = searchText.toLowerCase();
    const filtered = getEmbassies().filter(
      (embassy) =>
        Number(id) === embassy.countryId &&
        embassy?.embassyName &&
        embassy.embassyName.toLowerCase().includes(lowerText)
    );

    setEmbassies(filtered);
  };

  return (
    <div className={styles.container}>
      <EmbassyToolbar onFilterChange={handleFilterChange} countryId={Number(id)} />
      <EmbassyView embassies={embassies} />
    </div>
  );
};

export default Embassy;
