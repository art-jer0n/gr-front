import React, { useContext, useEffect } from "react";
import { PageContext } from "page-context";
import * as styles from "styles/home-page.module.css";
import CountryMap from "./country-map";
import EventCalendar from "./event-calendar";
import NewsCarousel from "./news-carusel";
import LinkBlock from "./link-block";

const HomePage: React.FC = () => {
  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  useEffect(() => {
    setTitle("Международный GR");
    setBreadcrumbs([]);
  }, [setTitle]);

  return (
    <div className={styles.container}>
      <div className={styles.top_container}>
        <div className={styles.map_container}>
          <CountryMap />
        </div>
        <div className={styles.calendar_container}>
          <EventCalendar />
        </div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.news_container}>
          <NewsCarousel />
        </div>
        <div className={styles.links_container}>
          <LinkBlock />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
