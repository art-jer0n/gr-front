import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import * as styles from "styles/axios-toast.module.css";

const AxiosToastContent: React.FC<{ message: string, details: string }> = ({ message, details }) => {
  return (
    <div className={styles.toast}>
      <Accordion className={styles.accordion}>
        <AccordionTab
          className={styles.accordion_tab}
          contentClassName={styles.accordion_content}
          headerClassName={styles.accordion_header}
          disabled={!details}
          header={message}>
          <iframe
            className={styles.frame}
            srcDoc={details}
            title="HTML Content"
            sandbox="allow-same-origin allow-scripts" />
        </AccordionTab>
      </Accordion>
    </div>
  );
};

export default AxiosToastContent;