import React from "react";
import * as styles from "styles/home-page.module.css";
import { useNavigate } from 'react-router-dom';
import { classNames } from "primereact/utils";

const LinkBlock: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.links_container}>
            <div className={styles.link} onClick={() => navigate("/country")} role="link">
                Посольства
            </div>
            <div className={styles.link} onClick={() => navigate("/organization")} role="link">
                Международные организации
            </div>
            <div className={classNames(styles.link, styles.disabled)} role="link">
                Ссылка 3
            </div>
            <div className={classNames(styles.link, styles.disabled)} role="link">
                Ссылка 4
            </div>
            <div className={classNames(styles.link, styles.disabled)} role="link">
                Ссылка 5
            </div>
            <div className={classNames(styles.link, styles.disabled)} role="link">
                Ссылка 6
            </div>
        </div>
    );
};

export default LinkBlock;
