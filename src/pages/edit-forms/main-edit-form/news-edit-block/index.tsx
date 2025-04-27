import React, { useState } from "react";
import * as styles from "styles/main-edit-form.module.css";
import { NewsEditBlockProps } from "./news-edit-block-props";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DEFAULT_NEWS_ITEM, EMPTY_MESSAGE } from "app-consts";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { NewsItem } from "interfaces/news-item";
import { FloatLabel } from "primereact/floatlabel";
import { generateNewsId } from "services/news-service";
import { contentTemplate, dateTemplate, titleTemplate } from "./news-edit-block-templates";

const NewsEditBlock: React.FC<NewsEditBlockProps> = ({ items, loading, onChangeItems }) => {

    const [visibleEditDialog, setVisibleEditDialog] = useState<boolean>(false);
    const [editableItem, setEditableItem] = useState<NewsItem>(DEFAULT_NEWS_ITEM);
    const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);

    const openCreateDialog = (): void => {
        setEditableItem({ ...DEFAULT_NEWS_ITEM });
        setVisibleEditDialog(true);
    };

    const openEditDialog = (): void => {
        if (!selectedItem) return;
        setEditableItem({ ...selectedItem });
        setVisibleEditDialog(true);
    };

    const handleSave = (): void => {
        let _items: NewsItem[];
        if (editableItem.id) {
            _items = items.map(_ => _.id === editableItem.id ? editableItem : _);
        }
        else {
            const newItem = { ...editableItem, id: generateNewsId() };
            _items = [...items, newItem];
        }

        onChangeItems(_items);
        setVisibleEditDialog(false);
    };

    const handleDelete = (): void => {
        if (!selectedItem) return;
        const _items = items.filter(_ => _.id !== selectedItem.id);
        onChangeItems(_items);
        setSelectedItem(null);
    };

    const dialogFooterTemplate = (): React.ReactNode => (
        <div className={styles.dialog_footer}>
            <Button icon="pi pi-check" label="Подтвердить" onClick={() => handleSave()} />
            <Button icon="pi pi-times" label="Отменить" onClick={() => setVisibleEditDialog(false)} />
        </div>
    );

    const cardHeaderTemplate = (): React.ReactNode => {
        return (
            <div className={styles.card_header_container}>
                <span className={styles.card_header_text}>Новости</span>
                <div className={styles.card_header_button_container}>
                    <Button
                        icon="pi pi-plus"
                        label="Добавить"
                        className={styles.card_header_button}
                        onClick={openCreateDialog} />
                    <Button
                        icon="pi pi-pencil"
                        label="Редактировать"
                        className={styles.card_header_button}
                        disabled={!selectedItem}
                        onClick={openEditDialog} />
                    <Button
                        icon="pi pi-trash"
                        label="Удалить"
                        className={styles.card_header_button}
                        disabled={!selectedItem}
                        onClick={handleDelete} />
                </div>
            </div>
        );
    }

    return (
        <>
            <DataTable
                loading={loading}
                header={cardHeaderTemplate}
                dataKey="id"
                value={items}
                selection={selectedItem}
                onSelectionChange={(e) => setSelectedItem(e.value as NewsItem | null)}
                selectionMode="single"
                stripedRows
                showGridlines
                scrollable
                emptyMessage={EMPTY_MESSAGE}
                className={styles.table}
                paginatorClassName={styles.paginator}
                scrollHeight="450px">
                <Column
                    align="center"
                    alignHeader="center"
                    header="Дата"
                    field="date"
                    sortable
                    body={(rowData) => dateTemplate(rowData)}
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "10%" }} />
                <Column
                    align="left"
                    alignHeader="center"
                    header="Заголовок"
                    field="title"
                    frozen
                    sortable
                    body={(rowData) => titleTemplate(rowData)}
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "20%" }} />
                <Column
                    align="left"
                    alignHeader="center"
                    header="Описание"
                    field="content"
                    sortable
                    body={(rowData) => contentTemplate(rowData)}
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "60%" }} />
            </DataTable>

            <Dialog
                style={{ width: "50vw" }}
                header={editableItem.id ? "Редактирование новости" : "Добавление новости"}
                footer={dialogFooterTemplate}
                visible={visibleEditDialog}
                onHide={() => setVisibleEditDialog(false)}>
                <div className={styles.form}>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="news_item_title">Заголовок</label>
                            <InputText
                                id="news_item_title"
                                style={{ width: "100%" }}
                                value={editableItem.title}
                                onChange={(e) => setEditableItem({ ...editableItem, title: e.target.value })} />
                        </FloatLabel>
                    </div>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="news_item_date">Дата</label>
                            <Calendar
                                id="news_item_date"
                                style={{ width: "100%" }}
                                panelClassName={styles.calendar_panel}
                                value={editableItem.date}
                                onChange={(e) => setEditableItem({ ...editableItem, date: e.value as Date | null })}
                                dateFormat="dd.mm.yy"
                                locale="ru"
                                showIcon
                                showButtonBar />
                        </FloatLabel>
                    </div>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="news_item_content">Содержание</label>
                            <InputTextarea
                                id="news_item_content"
                                style={{ width: "100%" }}
                                value={editableItem.content}
                                onChange={(e) => setEditableItem({ ...editableItem, content: e.target.value })}
                                autoResize />
                        </FloatLabel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default NewsEditBlock;