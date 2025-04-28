import React, { useContext, useRef } from "react";
import { PageContext } from "page-context";
import { BreadCrumb } from "primereact/breadcrumb";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import * as styles from "styles/page-header.module.css";
import { classNames } from "primereact/utils";

const PageHeader: React.FC = () => {
  const { title, breadcrumbs } = useContext(PageContext);

  const navigate = useNavigate();

  const menuRef = useRef<Menu>(null);

  const home: MenuItem = {
    label: "Главная",
    url: "/",
  };

  const settingsItems: MenuItem[] = [
    {
      label: "Настрока 1",
      icon: "pi pi-cog",
      disabled: true
    },
    {
      label: "Настрока 2",
      icon: "pi pi-cog",
      disabled: true
    },
    {
      label: "Форма редактирования",
      icon: "pi pi-pencil",
      command: () => {
        navigate(`/edit`);
      },
    },
    {
      label: "Форма редактирования посольств",
      icon: "pi pi-pencil",
      command: () => {
        navigate(`/country/edit/new`);
      },
    },
    {
      label: "Форма редактирования международных организации",
      icon: "pi pi-pencil",
      command: () => {
        navigate(`/organization/edit/new`);
      },
    }

  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.main}>
            <img className={styles.logo} src="../../assets/images/logo.svg" alt="Роснефть" />
            <div className={styles.separator}></div>
            <div className={styles.title}>{title}</div>
          </div>
          <div className={styles.setting}>
            <i
              className={classNames(styles.setting_icon, "pi pi-cog")}
              onClick={(e) => menuRef.current?.toggle(e)} />
            <Menu
              ref={menuRef}
              popup
              model={settingsItems}
              className={styles.menu}
              id="settings-menu" />
          </div>
        </div>
      </div>
      <div className={styles.breadcrumb_container_1}>
        <div className={styles.breadcrumb_container}>
          <BreadCrumb
            className={styles.breadcrumb}
            model={breadcrumbs}
            home={home} />
        </div>
      </div>
    </>
  );
};

export default PageHeader;