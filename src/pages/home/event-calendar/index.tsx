import React from "react";
import { Calendar, } from "primereact/calendar";
import * as styles from "styles/event-calendar.module.css";
import { dateTemplate, footerTemplate } from "./event-calendar-templates";
import { getEvents } from "services/calendar-event-service";


const EventCalendar: React.FC = () => {
  return (
    <Calendar
      dateTemplate={(event) => dateTemplate(event, getEvents())}
      footerTemplate={footerTemplate}
      className={styles.calendar}
      panelClassName={styles.panel}
      inline
      locale="ru"
    />
  );
};

export default EventCalendar;
