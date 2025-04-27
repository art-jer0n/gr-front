import { CalendarEvent } from "interfaces/calendar-event";

const EVENTS_STORAGE_KEY = 'calendarEvents';

export const getEvents = (): CalendarEvent[] => {
    const json = localStorage.getItem(EVENTS_STORAGE_KEY);

    if (!json) {
        return []
    }

    return JSON
        .parse(json)
        .map((event: CalendarEvent) => ({ ...event, date: event.date ? new Date(event.date) : null }));
};

export const saveEvents = (events: CalendarEvent[]): void => {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
};

export const generateEventId = (): number => {
    const events = getEvents();
    return events.reduce((maxId, event) => Math.max(maxId, event.id), 0) + 1;
};

export const addEvent = (event: CalendarEvent): void => {
    const events = getEvents();
    events.push({ ...event, id: generateEventId() });
    saveEvents(events);
};

export const updateEvent = (updatedEvent: CalendarEvent): void => {
    const events = getEvents();
    const index = events.findIndex(_ => _.id === updatedEvent.id);
    if (index !== -1) {
        events[index] = updatedEvent;
        saveEvents(events);
    }
};

export const deleteEvent = (eventId: number): void => {
    const events = getEvents().filter(_ => _.id !== eventId);
    saveEvents(events);
};