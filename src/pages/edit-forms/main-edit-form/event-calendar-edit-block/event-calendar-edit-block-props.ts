import { CalendarEvent } from "interfaces/calendar-event";

export interface EventCalendarEditBlockProps {
    items: CalendarEvent[]
    loading: boolean;
    onChangeItems: (items: CalendarEvent[]) => void;
}
