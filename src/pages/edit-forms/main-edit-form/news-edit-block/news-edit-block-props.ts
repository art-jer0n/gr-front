import { NewsItem } from "interfaces/news-item";

export interface NewsEditBlockProps {
  items: NewsItem[]
  loading: boolean;
  onChangeItems: (items: NewsItem[]) => void;
}
