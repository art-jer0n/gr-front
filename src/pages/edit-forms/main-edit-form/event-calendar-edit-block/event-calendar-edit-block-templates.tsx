import { EMPTY_SHORT_MESSAGE } from "app-consts";
import { format } from "date-fns";
import { CalendarEvent } from "interfaces/calendar-event";
import React from "react";


export const textTemplate = (rowData: CalendarEvent): React.ReactNode => {
    if (!rowData || !rowData.text) {
        return <i>{EMPTY_SHORT_MESSAGE}</i>;
    }

    return rowData.text;
};

export const dateTemplate = (rowData: CalendarEvent): React.ReactNode => {
    if (!rowData || !rowData.date) {
        return <i>{EMPTY_SHORT_MESSAGE}</i>;
    }

    return format(rowData.date, "dd.MM.yyyy");
};