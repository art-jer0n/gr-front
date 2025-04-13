import { CalendarDateTemplateEvent } from "primereact/calendar";
import React from "react";
import * as styles from "styles/event-calendar.module.css";

export const footerTemplate = (): React.ReactNode => {
    return <span className={styles.footer}>Календарь событий</span>;
};


export const dateTemplate = (event: CalendarDateTemplateEvent, eventDates: Date[]): React.ReactNode => {
    const { year, month, day } = event;

    if (!eventDates.length) {
        return (
            <div className={styles.cell}>
                <span>{day}</span>
            </div>
        );
    }

    const currentDate = new Date(year, month, day);

    const hasEvent = eventDates.some(date =>
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear());

    return (
        <div className={styles.cell}>
            {hasEvent && <span className={styles.dot} />}
            <span>{day}</span>
        </div>
    );
};