export interface NewsItem {
    id: number;
    title: string;
    content: string;
    date: Date | null;
    order: number;
}