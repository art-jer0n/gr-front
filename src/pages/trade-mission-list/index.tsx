import React, { useContext, useEffect, useState } from "react";
import { Country } from "interfaces/country";
import { PageContext } from "page-context";
import { getCountries } from "services/country-service";
import * as styles from "styles/country-list.module.css";
import TradeMissionListToolbar from "./trade-mission-list-toolbar";
import TradeMissionListView from "./trade-mission-list-view";

const TradeMissionList: React.FC = () => {
    const { setTitle, setBreadcrumbs } = useContext(PageContext);

    useEffect(() => {
        setTitle("Торговые представительства");
        setBreadcrumbs([{ label: "Торговые представительства", url: "/trade-mission" }]);
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
            <TradeMissionListToolbar onFilterChange={handleFilterChange} />
            <TradeMissionListView countries={countries} />
        </div>
    );
};

export default TradeMissionList;
