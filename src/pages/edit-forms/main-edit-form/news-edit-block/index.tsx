import React, { useEffect, useState } from "react";
import * as styles from "styles/main-edit-form.module.css";
import { NewsEditBlockProps } from "./news-edit-block-props";
import { DataTable, DataTableRowReorderEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { DEFAULT_NEWS_ITEM, EMPTY_MESSAGE } from "app-consts";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { NewsItem } from "interfaces/news-item";
import { FloatLabel } from "primereact/floatlabel";
import { contentTemplate, dateTemplate, titleTemplate } from "./news-edit-block-templates";
import { nanoid } from "nanoid";

interface LocalNewsItem extends NewsItem {
    localId: string;
}

const NewsEditBlock: React.FC<NewsEditBlockProps> = ({ items, loading, onChangeItems }) => {
    const [localItems, setLocalItems] = useState<LocalNewsItem[]>([]);
    const [visibleEditDialog, setVisibleEditDialog] = useState<boolean>(false);
    const [editableLocalItem, setEditableLocalItem] = useState<LocalNewsItem>({ ...DEFAULT_NEWS_ITEM, localId: nanoid() });
    const [selectedLocalItem, setSelectedLocalItem] = useState<LocalNewsItem | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof LocalNewsItem, string>>>({});

    useEffect(() => {
        const _localItems = items.map(item => ({ ...item, localId: nanoid() }));
        setLocalItems(_localItems);
    }, [items]);

    const openCreateDialog = (): void => {
        setErrors({});
        setEditableLocalItem({ ...DEFAULT_NEWS_ITEM, localId: nanoid() });
        setVisibleEditDialog(true);
    };

    const openEditDialog = (): void => {
        setErrors({});
        if (!selectedLocalItem) {
            return;
        }

        setEditableLocalItem({ ...selectedLocalItem });
        setVisibleEditDialog(true);
    };

    const isValid = (): boolean => {
        const _errors: Partial<Record<keyof LocalNewsItem, string>> = {};

        if (!editableLocalItem?.title) _errors.title = "Заголовок обязателен к заполнению.";
        if (!editableLocalItem?.content) _errors.content = "Содержание обязательно к заполнению.";
        if (!editableLocalItem?.date) _errors.date = "Дата обязательна к заполнению.";

        setErrors(_errors);

        return Object.keys(_errors).length === 0;
    };

    const handleSave = (): void => {
        if (!isValid()) {
            return;
        }

        if (!isValid()) {
            return;
        }

        let _localItems: LocalNewsItem[];

        const isLocalItemExists = localItems.some(item => item.localId === editableLocalItem.localId);

        if (isLocalItemExists) {
            _localItems = localItems.map(localItem => localItem.localId === editableLocalItem.localId ? editableLocalItem : localItem);
        } else {
            _localItems = [...localItems, editableLocalItem];
        }

        setLocalItems(_localItems);
        onChangeItems(_localItems.map(({ localId, ...rest }) => rest));
        setVisibleEditDialog(false);
    };

    const handleDelete = (): void => {
        if (!selectedLocalItem) {
            return;
        }

        const _localItems = localItems.filter(item => item.localId !== selectedLocalItem.localId);

        setLocalItems(_localItems);
        onChangeItems(_localItems.map(({ localId, ...item }) => item));
        setSelectedLocalItem(null);
    };

    const handleRowReorder = (event: DataTableRowReorderEvent<LocalNewsItem[]>) => {
        const _localItems = event.value.map((item, index) => ({ ...item, order: index + 100 }));

        setLocalItems(_localItems);
        onChangeItems(_localItems.map(({ localId, ...rest }) => rest));
    };

    const dialogHeaderTemplate = (): React.ReactNode => {
        if (!editableLocalItem?.id) {
            return "Добавление новости";
        }

        return "Редактирование новости"
    };

    const dialogFooterTemplate = (): React.ReactNode => (
        <div className={styles.dialog_footer}>
            <Button icon="pi pi-check" label="Подтвердить" onClick={handleSave} />
            <Button icon="pi pi-times" label="Отменить" onClick={() => setVisibleEditDialog(false)} />
        </div>
    );

    const tableHeaderTemplate = (): React.ReactNode => (
        <div className={styles.card_header_container}>
            <span className={styles.card_header_text}>Новости</span>
            <div className={styles.card_header_button_container}>
                <Button icon="pi pi-plus" label="Добавить" className={styles.card_header_button} onClick={openCreateDialog} />
                <Button icon="pi pi-pencil" label="Редактировать" className={styles.card_header_button} disabled={!selectedLocalItem} onClick={openEditDialog} />
                <Button icon="pi pi-trash" label="Удалить" className={styles.card_header_button} disabled={!selectedLocalItem} onClick={handleDelete} />
            </div>
        </div>
    );

    return (
        <>
            <DataTable
                loading={loading}
                header={tableHeaderTemplate}
                dataKey="localId"
                value={localItems}
                selection={selectedLocalItem}
                onSelectionChange={(e) => setSelectedLocalItem(e.value as LocalNewsItem | null)}
                selectionMode="single"
                stripedRows
                showGridlines
                scrollable
                removableSort
                sortMode="multiple"
                emptyMessage={EMPTY_MESSAGE}
                className={styles.table}
                paginatorClassName={styles.paginator}
                scrollHeight="450px"
                reorderableRows
                onRowReorder={handleRowReorder}>
                <Column
                    header="Порядок"
                    field="order"
                    rowReorder
                    align="center"
                    alignHeader="center"
                    style={{ width: "5%" }} />
                <Column
                    header="Дата"
                    field="date"
                    sortable
                    align="center"
                    alignHeader="center"
                    body={dateTemplate}
                    style={{ width: "5%" }} />
                <Column
                    header="Заголовок"
                    field="title"
                    sortable
                    align="left"
                    alignHeader="center"
                    body={titleTemplate}
                    style={{ width: "20%" }} />
                <Column
                    header="Описание"
                    field="content"
                    sortable
                    align="left"
                    alignHeader="center"
                    body={contentTemplate}
                    style={{ width: "55%" }} />
            </DataTable>
            <Dialog
                style={{ width: "50vw" }}
                header={dialogHeaderTemplate}
                footer={dialogFooterTemplate}
                visible={visibleEditDialog}
                onHide={() => setVisibleEditDialog(false)}>
                <div className={styles.dialog_content}>
                    <div className={styles.dialog_field}>
                        <FloatLabel>
                            <label htmlFor="news-item-title">Заголовок</label>
                            <InputText
                                id="news-item-title"
                                style={{ width: "100%" }}
                                invalid={!!errors?.title}
                                value={editableLocalItem.title}
                                onChange={(e) => setEditableLocalItem({ ...editableLocalItem, title: e.target.value })}
                            />
                        </FloatLabel>
                        {errors?.title && <small className="p-error">{errors.title}</small>}
                    </div>
                    <div className={styles.dialog_field}>
                        <FloatLabel>
                            <label htmlFor="news-item-date">Дата</label>
                            <Calendar
                                id="news-item-date"
                                style={{ width: "100%" }}
                                invalid={!!errors?.date}
                                panelClassName={styles.calendar_panel}
                                value={editableLocalItem.date}
                                onChange={(e) => setEditableLocalItem({ ...editableLocalItem, date: e.value as Date | null })}
                                dateFormat="dd.mm.yy"
                                locale="ru"
                                showIcon
                                showButtonBar />
                        </FloatLabel>
                        {errors?.date && <small className="p-error">{errors.date}</small>}
                    </div>
                    <div className={styles.dialog_field}>
                        <FloatLabel>
                            <label htmlFor="news-item-content">Содержание</label>
                            <InputTextarea
                                id="news-item-content"
                                style={{ width: "100%" }}
                                invalid={!!errors?.content}
                                value={editableLocalItem.content}
                                onChange={(e) => setEditableLocalItem({ ...editableLocalItem, content: e.target.value })}
                                autoResize />
                        </FloatLabel>
                        {errors?.content && <small className="p-error">{errors.content}</small>}
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default NewsEditBlock;
