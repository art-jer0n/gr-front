import React, { useContext, useEffect } from "react";
import { PageContext } from "page-context";
import * as styles from "styles/home-page.module.css";
import CountryMap from "./country-map";
import EventCalendar from "./event-calendar";
import NewsCarousel from "./news-carusel";
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { setTitle, setBreadcrumbs } = useContext(PageContext);

  useEffect(() => {
    setTitle("Международный GR");
    setBreadcrumbs([]);
  }, [setTitle]);

  const navigate = useNavigate();

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
          <div
            className={styles.link}
            onClick={() => navigate("/country")}
            role="link"
          >
            Посольства
          </div>
          <div
            className={styles.link}
            onClick={() => navigate("/organization")}
            role="link"
          >
            Международные организации
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
