import React, { useContext } from "react";
import { PageContext } from "page-context";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import * as styles from "styles/page-header.module.css";
import { Menubar } from "primereact/menubar";

const PageHeader: React.FC = () => {
  const { title, breadcrumbs } = useContext(PageContext);
  const navigate = useNavigate();

  const homeMenuItem: MenuItem = {
    label: "Главная",
    url: "/",
  };

  const navigationMenuItems: MenuItem[] = [
    {
      label: "Редактирование",
      icon: "pi pi-pencil",
      items: [
        {
          label: "Домашнаяя",
          command: () => navigate("/edit"),
        },
        {
          label: "Посольства",
          command: () => navigate("/country/edit/new"),
        },
        {
          label: "Международные организации",
          command: () => navigate("/organization/edit/new"),
        },
      ],
    },
  ];

  return (
    <header className={styles.page_header}>
      <div className={styles.header_container}>
        <div className={styles.header_content}>
          <div className={styles.brand_section}>
            <img
              className={styles.brand_logo}
              src="../../assets/images/logo.svg"
              alt="Логотип Роснефть"
              onClick={() => navigate("/")}
            />
            <div className={styles.brand_separator}></div>
            <h1 className={styles.brand_title}>{title}</h1>
          </div>
          <Menubar
            className={styles.navigation_menu}
            model={navigationMenuItems}
          />
        </div>
      </div>

      <div className={styles.breadcrumbs_wrapper}>
        <div className={styles.breadcrumbs_container}>
          <BreadCrumb
            className={styles.breadcrumbs}
            model={breadcrumbs}
            home={homeMenuItem}
          />
        </div>
      </div>
    </header>
  );
};

export default PageHeader;