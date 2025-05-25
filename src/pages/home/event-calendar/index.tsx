import React, { useState, useEffect } from "react";
import { Calendar, CalendarDateTemplateEvent } from "primereact/calendar";
import * as styles from "styles/event-calendar.module.css";
import { getEvents } from "services/calendar-event-service";
import { CalendarEvent } from "interfaces/calendar-event";
import { Tooltip } from "primereact/tooltip";
import { format, isMonday, isSunday } from "date-fns";

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const loadEvents = async (): Promise<void> => {
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const footerTemplate = (): React.ReactNode => (
    <span className={styles.footer}>Календарь событий</span>
  );

  const dateTemplate = (
    event: CalendarDateTemplateEvent,
    events: CalendarEvent[]
  ): React.ReactNode => {
    const { year, month, day } = event;

    const currentDate = new Date(year, month, day);

    const monday = isMonday(currentDate);
    const sunday = isSunday(currentDate);

    const singleDayEvents = events.filter(
      (event) => event.beginDate && !event.endDate && event.beginDate.getTime() === currentDate.getTime()
    );

    const rangeEvents = events.filter(
      (event) => event.beginDate && event.endDate &&
        currentDate >= event.beginDate &&
        currentDate <= event.endDate
    );

    const dateId = `date-cell-${year}-${month}-${day}`;

    const tooltipItems: string[] = [];
    if (singleDayEvents.length || rangeEvents.length) {
      tooltipItems.push(format(currentDate, "dd.MM.yyyy"));
      singleDayEvents.forEach((event) => tooltipItems.push(`* ${event.content}`));
      rangeEvents.forEach((event) => tooltipItems.push(`* ${event.content}`));
    }
    const tooltipContent = tooltipItems.join("\n\n");

    return (
      <div id={dateId} className={styles.cell}>
        {singleDayEvents.length > 0 && <span className={styles.dot} />}
        {rangeEvents.map((event, index) => {

          const isStart = currentDate.getTime() === event.beginDate!.getTime();
          const isEnd = currentDate.getTime() === event.endDate!.getTime();

          let className = styles.middle;
          if (isStart) className = styles.start;
          if (isEnd) className = styles.end;
          if (monday) className = `${className} ${styles.monday}`;
          if (sunday) className = `${className} ${styles.sunday}`;

          return <span key={index} className={className} />;
        })}

        <Tooltip
          target={`#${dateId}`}
          content={tooltipContent}
          style={{ width: "350px" }}
          position="top"
        />
        <span>{day}</span>
      </div>
    );
  };

  return (
    <Calendar
      inline
      locale="ru"
      dateTemplate={(e) => dateTemplate(e, events)}
      footerTemplate={footerTemplate}
      className={styles.calendar}
      panelClassName={styles.panel}
    />
  );
};

export default EventCalendar;