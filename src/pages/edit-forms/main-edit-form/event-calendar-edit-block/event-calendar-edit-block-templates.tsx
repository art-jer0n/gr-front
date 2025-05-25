import { EMPTY_SHORT_MESSAGE } from "app-consts";
import { format } from "date-fns";
import { CalendarEvent } from "interfaces/calendar-event";
import React from "react";

export const contentTemplate = (rowData: CalendarEvent): React.ReactNode => {
    if (!rowData || !rowData.content) {
        return EMPTY_SHORT_MESSAGE;
    }

    return rowData.content;
};

export const beginDateTemplate = (rowData: CalendarEvent): React.ReactNode => {
    if (!rowData || !rowData.beginDate) {
        return EMPTY_SHORT_MESSAGE;
    }

    return format(rowData.beginDate, "dd.MM.yyyy");
};

export const endDateTemplate = (rowData: CalendarEvent): React.ReactNode => {
    if (!rowData || !rowData.endDate) {
        return EMPTY_SHORT_MESSAGE;
    }

    return format(rowData.endDate, "dd.MM.yyyy");
};

