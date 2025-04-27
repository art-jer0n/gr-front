import React from 'react';
import { Carousel } from 'primereact/carousel';
import * as styles from "styles/news-carousel.module.css";
import { NewsItem } from 'interfaces/news-item';
import { format } from "date-fns"
import { getNews } from 'services/news-service';

const NewsCarousel: React.FC = () => {
    const itemTemplate = (item: NewsItem) => (
        <div className={styles.item}>
            <span className={styles.header}>{item.title}</span>
            <span className={styles.body}>{item.content}</span>
            <span className={styles.footer}>{item.date ? format(item.date, "yyyy-MM-dd") : ""}</span>
        </div >
    );

    return (
        <Carousel
            value={getNews()}
            itemTemplate={itemTemplate}
            numVisible={1}
            numScroll={1}
            showNavigators={false}
            autoplayInterval={3500}
            circular
            className={styles.carousel}
        />
    );
};

export default NewsCarousel;
