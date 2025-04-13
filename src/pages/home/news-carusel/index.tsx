import React from 'react';
import { Carousel } from 'primereact/carousel';
import * as styles from "styles/news-carousel.module.css";
import { News } from 'interfaces/news';
import { NEWS } from 'app-consts';

const NewsCarousel: React.FC = () => {
    const itemTemplate = (item: News) => (
        <div className={styles.item}>
            <span className={styles.header}>{item.title}</span>
            <span className={styles.body}>{item.content}</span>
            <span className={styles.footer}>{item.date}</span>
        </div >
    );

    return (
        <Carousel
            value={NEWS}
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
