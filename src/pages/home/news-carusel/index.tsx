import React, { useEffect, useState } from 'react';
import { Carousel } from 'primereact/carousel';
import * as styles from "styles/news-carousel.module.css";
import { NewsItem } from 'interfaces/news-item';
import { format } from "date-fns"
import { getNews } from 'services/news-service';

const NewsCarousel: React.FC = () => {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);

    const loadNews = async (): Promise<void> => {
        const data = await getNews();
        setNewsList(data);
    };

    useEffect(() => {
        loadNews();
    }, []);

    const itemTemplate = (item: NewsItem) => {
        const { title, content, date } = item;

        let formattedDate: string = "";

        if (date) {
            formattedDate = format(date, "yyyy-MM-dd");
        }

        return (
            <div className={styles.item}>
                <span className={styles.header}>{title}</span>
                <span className={styles.body}>
                    <img
                        className={styles.logo}
                        src="../../assets/images/logo_light.svg"
                        alt="Роснефть" />
                    {content}
                </span>
                <span className={styles.footer}>{formattedDate}</span>
            </div >
        );
    };

    return (
        <Carousel
            value={newsList}
            itemTemplate={itemTemplate}
            circular={true}
            showNavigators={false}
            showIndicators={true}
            numVisible={1}
            numScroll={1}
            autoplayInterval={5000}
            containerClassName={styles.carousel_container}
            className={styles.carousel} />
    );
};

export default NewsCarousel;
