import React, { useState } from "react";
import { Calendar, CalendarSelectEvent } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import * as styles from "styles/event-calendar.module.css";
import { dateTemplate, footerTemplate } from "./event-calendar-templates";

const MOQ_EVENT_DATES = [
  new Date(2025, 3, 6),
  new Date(2025, 3, 10),
  new Date(2025, 3, 15),
];

const EventCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const onSelect = (e: CalendarSelectEvent): void => {
    const value = e.value;
    if (value instanceof Date) {
      const hasEvent = MOQ_EVENT_DATES.some(date =>
        date.getDate() === value.getDate() &&
        date.getMonth() === value.getMonth() &&
        date.getFullYear() === value.getFullYear());

      if (hasEvent) {
        setSelectedDate(value);
        setVisible(true);
      }
    }
  };

  return (
    <>
      <Calendar
        value={selectedDate}
        onSelect={onSelect}
        dateTemplate={(event) => dateTemplate(event, MOQ_EVENT_DATES)}
        footerTemplate={footerTemplate}
        className={styles.calendar}
        panelClassName={styles.panel}
        inline
        locale="ru"
      />
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "40vw" }}
        focusOnShow={false}
        dismissableMask
      >
        <p>Это заглушка новости для даты: {selectedDate?.toLocaleDateString("ru-RU")}</p>
      </Dialog>
    </>
  );
};

export default EventCalendar;
