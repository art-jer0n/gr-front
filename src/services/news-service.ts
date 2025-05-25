import { NewsItem } from 'interfaces/news-item'

const NEWS_STORAGE_KEY = 'news'

export const getNews = (): NewsItem[] => {
    const _newListJson = localStorage.getItem(NEWS_STORAGE_KEY)
    return _newListJson ? JSON.parse(_newListJson) : []
}

export const saveNews = (newsList: NewsItem[]): void => {
    const _newsList = newsList.map(newsItem => newsItem.id ? newsItem : { ...newsItem, id: generateNewsId() });
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(_newsList))
}

export const generateNewsId = (): number => {
    const _newsList = getNews()
    return _newsList.reduce((maxId, news) => Math.max(maxId, news.id), 0) + 1
}

export const addNews = (newsItem: NewsItem): void => {
    const _newsList = getNews()
    newsItem.id = generateNewsId()
    _newsList.push(newsItem)
    saveNews(_newsList)
}

export const updateNews = (newsList: NewsItem): void => {
    const _newsList = getNews()
    const index = _newsList.findIndex(_ => _.id === newsList.id)
    if (index !== -1) {
        _newsList[index] = newsList
        saveNews(_newsList)
    }
}

export const deleteNews = (newsItemId: number): void => {
    const _newsList = getNews().filter(_ => _.id !== newsItemId)
    saveNews(_newsList)
}