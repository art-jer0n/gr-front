import React, { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "page-context";
import { Toast } from "primereact/toast";
import * as styles from "styles/main-edit-form.module.css";
import MainEditFormToolbar from "./main-edit-form-toolbar";
import NewsEditBlock from "./news-edit-block";
import { getNews, saveNews } from "services/news-service";
import { NewsItem } from "interfaces/news-item";
import { CalendarEvent } from "interfaces/calendar-event";
import { getEvents, saveEvents } from "services/calendar-event-service";
import EventCalendarEditBlock from "./event-calendar-edit-block";

const MainEditForm: React.FC = () => {
    const { setTitle, setBreadcrumbs } = useContext(PageContext);

    const toast = useRef<Toast>(null);

    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    const [newsLoading, setNewsLoading] = useState<boolean>(true);
    const [eventLoading, setEventLoading] = useState<boolean>(true);

    useEffect(() => {
        setNewsLoading(true);
        setEventLoading(true);
        const timer = setTimeout(() => {
            const _news = getNews();
            const _events = getEvents();

            setNewsList(_news);
            setEvents(_events);

            setTitle("Форма редактирования");
            setBreadcrumbs([{ label: `Форма редактирования`, url: `/edit` }]);

            setNewsLoading(false);
            setEventLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleSave = () => {
        saveNews(newsList);
        saveEvents(events);
        toast.current?.show({
            severity: "success",
            summary: "Сохранено",
            detail: "Данные успешно сохранены.",
            life: 3000,
        });
    };

    const handleCancel = () => {
        // toast.current?.show({
        //     severity: 'success',
        //     summary: 'Отмена',
        //     detail: 'Изменения отменены.',
        //     life: 3000,
        // });

        window.location.reload();
    };

    const handleChangeNewsList = (newsList: NewsItem[]) => {
        setNewsList(newsList);
    };

    const handleChangeEvents = (events: CalendarEvent[]) => {
        setEvents(events);
    };


    return (
        <div className={styles.container}>
            <Toast ref={toast} />
            <MainEditFormToolbar
                onSave={handleSave}
                onCancel={handleCancel} />
            <div className={styles.forms}>
                <NewsEditBlock
                    items={newsList}
                    loading={newsLoading}
                    onChangeItems={handleChangeNewsList} />
                <EventCalendarEditBlock
                    items={events}
                    loading={eventLoading}
                    onChangeItems={handleChangeEvents} />
            </div>
        </div>
    );
};

export default MainEditForm;