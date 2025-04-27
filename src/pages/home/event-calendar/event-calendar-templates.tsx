import { CalendarEvent } from "interfaces/calendar-event";
import { CalendarDateTemplateEvent } from "primereact/calendar";
import { Tooltip } from "primereact/tooltip";
import React from "react";
import * as styles from "styles/event-calendar.module.css";

export const footerTemplate = (): React.ReactNode => {
    return <span className={styles.footer}>Календарь событий</span>;
};

export const dateTemplate = (event: CalendarDateTemplateEvent, events: CalendarEvent[]): React.ReactNode => {
    const { year, month, day } = event;

    if (!events.length) {
        return (
            <div className={styles.cell}>
                <span>{day}</span>
            </div>
        );
    }

    const currentDate = new Date(year, month, day);

    const dateEvents = events?.filter(event =>
        event.date !== null &&
        event.date.getDate() === currentDate.getDate() &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()) || [];

    const dateId = `date-cell-${year}-${month}-${day}`;

    const tooltipContent = dateEvents
        .map(event => `* ${event.text}`)
        .join('\n\n');

    return (
        <div id={dateId} className={styles.cell}>
            {dateEvents.length > 0 && (
                <>
                    <Tooltip
                        target={`#${dateId}`}
                        content={tooltipContent}
                        style={{ width: "350px" }}
                        position="top" />
                    <span className={styles.dot} />
                </>
            )}
            <span>{day}</span>
        </div>
    );
};