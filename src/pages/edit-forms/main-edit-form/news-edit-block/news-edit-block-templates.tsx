import { EMPTY_SHORT_MESSAGE } from "app-consts";
import { format } from "date-fns";
import { NewsItem } from "interfaces/news-item";
import React from "react";

export const titleTemplate = (rowData: NewsItem): React.ReactNode => {
    if (!rowData || !rowData.title) {
        return <i>{EMPTY_SHORT_MESSAGE}</i>;
    }

    return rowData.title;
};

export const contentTemplate = (rowData: NewsItem): React.ReactNode => {
    if (!rowData || !rowData.content) {
        return <i>{EMPTY_SHORT_MESSAGE}</i>;
    }

    return rowData.content;
};

export const dateTemplate = (rowData: NewsItem): React.ReactNode => {
    if (!rowData || !rowData.date) {
        return <i>{EMPTY_SHORT_MESSAGE}</i>;
    }

    return format(rowData.date, "dd.MM.yyyy");
};