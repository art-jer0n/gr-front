import React, { useState, useEffect } from "react";
import { Calendar, CalendarDateTemplateEvent, } from "primereact/calendar";
import * as styles from "styles/event-calendar.module.css";
import { getEvents } from "services/calendar-event-service";
import { CalendarEvent } from "interfaces/calendar-event";
import { Tooltip } from "primereact/tooltip";
import { format } from "date-fns";

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const loadEvents = async (): Promise<void> => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const footerTemplate = (): React.ReactNode => <span className={styles.footer}>Календарь событий</span>;

  const dateTemplate = (event: CalendarDateTemplateEvent, events: CalendarEvent[]): React.ReactNode => {
    const { year, month, day } = event;

    if (!events?.length) {
      return (
        <div className={styles.cell}>
          <span>{day}</span>
        </div>
      );
    }

    const currentDate = new Date(year, month, day);

    const dateEvents = events?.filter(event =>
      event.date !== null &&
      event.date.getTime() === currentDate.getTime()) || [];

    if (!dateEvents?.length) {
      return (
        <div className={styles.cell}>
          <span>{day}</span>
        </div>
      );
    }

    const dateId = `date-cell-${year}-${month}-${day}`;

    const tooltipContent = [format(currentDate, "dd.MM.yyyy"), ...dateEvents.map(event => `* ${event.text}`)].join('\n\n');

    return (
      <div id={dateId} className={styles.cell}>
        <Tooltip
          target={`#${dateId}`}
          content={tooltipContent}
          style={{ width: "350px" }}
          position="top" />
        <span className={styles.dot} />
        <span>{day}</span>
      </div>
    );
  };

  return (
    <Calendar
      inline
      locale="ru"
      dateTemplate={(event) => dateTemplate(event, events)}
      footerTemplate={footerTemplate}
      className={styles.calendar}
      panelClassName={styles.panel}
    />
  );
};

export default EventCalendar;
