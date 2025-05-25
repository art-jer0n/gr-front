import React, { useEffect, useRef, useState } from "react";
import * as styles from "styles/main-edit-form.module.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DEFAULT_EVENT, EMPTY_MESSAGE } from "app-consts";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { EventCalendarEditBlockProps } from "./event-calendar-edit-block-props";
import { CalendarEvent } from "interfaces/calendar-event";
import { beginDateTemplate, endDateTemplate, contentTemplate } from "./event-calendar-edit-block-templates";
import { nanoid } from "nanoid";

/** Расширенный интерфейс для локальной идентификации события. */
interface LocalCalendarEvent extends CalendarEvent {
    localId: string;
}

const EventCalendarEditBlock: React.FC<EventCalendarEditBlockProps> = ({ items, loading, onChangeItems }) => {
    const [localItems, setLocalItems] = useState<LocalCalendarEvent[]>([]);
    const [visibleEditDialog, setVisibleEditDialog] = useState<boolean>(false);
    const [editableLocalItem, setEditableLocalItem] = useState<LocalCalendarEvent>({ ...DEFAULT_EVENT, localId: nanoid() });
    const [selectedLocalItem, setSelectedLocalItem] = useState<LocalCalendarEvent | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof LocalCalendarEvent, string>>>({});

    useEffect(() => {
        const _localItems = items.map(item => ({ ...item, localId: nanoid() }));
        setLocalItems(_localItems);
    }, [items]);


    const openCreateDialog = (): void => {
        setErrors({});
        setEditableLocalItem({ ...DEFAULT_EVENT, localId: nanoid() });
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
        const errors: Partial<Record<keyof LocalCalendarEvent, string>> = {};

        if (!editableLocalItem?.beginDate) errors.beginDate = "Дата начала обязательна к заполнению.";
        if (!editableLocalItem?.content) errors.content = "Описание события обязательно к заполнению.";

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSave = (): void => {
        if (!isValid()) {
            return;
        }

        let _localItems: LocalCalendarEvent[];

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
        setErrors({});
        if (!selectedLocalItem) {
            return;
        }

        const _localItems = localItems.filter(localItem => localItem.localId !== selectedLocalItem.localId);

        setLocalItems(_localItems);
        onChangeItems(_localItems.map(({ localId, ...item }) => item));
        setSelectedLocalItem(null);
    };

    const dialogHeaderTemplate = (): React.ReactNode => {
        if (!editableLocalItem?.id) {
            return "Добавление события";
        }

        return "Редактирование события"
    };

    const dialogFooterTemplate = (): React.ReactNode => (
        <div className={styles.dialog_footer}>
            <Button icon="pi pi-check" label="Подтвердить" onClick={() => handleSave()} />
            <Button icon="pi pi-times" label="Отменить" onClick={() => setVisibleEditDialog(false)} />
        </div>
    );

    const tableHeaderTemplate = (): React.ReactNode => (
        <div className={styles.card_header_container}>
            <span className={styles.card_header_text}>Календарь событий</span>
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
                    disabled={!selectedLocalItem}
                    onClick={openEditDialog} />
                <Button
                    icon="pi pi-trash"
                    label="Удалить"
                    className={styles.card_header_button}
                    disabled={!selectedLocalItem}
                    onClick={handleDelete} />
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
                onSelectionChange={(e) => setSelectedLocalItem(e.value as LocalCalendarEvent | null)}
                selectionMode="single"
                stripedRows
                showGridlines
                scrollable
                removableSort
                sortMode="multiple"
                emptyMessage={EMPTY_MESSAGE}
                className={styles.table}
                paginatorClassName={styles.paginator}
                scrollHeight="450px">
                <Column
                    align="left"
                    alignHeader="left"
                    header="Описание"
                    field="content"
                    sortable
                    body={contentTemplate}
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "70%" }} />
                <Column
                    align="center"
                    alignHeader="center"
                    header="Дата начала"
                    field="beginDate"
                    sortable
                    body={beginDateTemplate}
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "15%" }} />
                <Column
                    align="center"
                    alignHeader="center"
                    header="Дата окончания"
                    field="endDate"
                    sortable
                    body={endDateTemplate}
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "15%" }} />
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
                            <label htmlFor="calendar-event-begin-date">Дата начала</label>
                            <Calendar
                                id="calendar-event-begin-date"
                                style={{ width: "100%" }}
                                invalid={!!errors?.beginDate}
                                panelClassName={styles.calendar_panel}
                                value={editableLocalItem.beginDate}
                                maxDate={editableLocalItem.endDate || undefined}
                                onChange={(e) => setEditableLocalItem({ ...editableLocalItem, beginDate: e.value as Date | null })}
                                dateFormat="dd.mm.yy"
                                locale="ru"
                                showIcon
                                showButtonBar />
                        </FloatLabel>
                        {errors?.beginDate && (<small className="p-error">{errors.beginDate}</small>)}
                    </div>
                    <div className={styles.dialog_field}>
                        <FloatLabel>
                            <label htmlFor="calendar-event-end-date">Дата окончания</label>
                            <Calendar
                                id="calendar-event-end-date"
                                style={{ width: "100%" }}
                                invalid={!!errors?.endDate}
                                panelClassName={styles.calendar_panel}
                                value={editableLocalItem.endDate}
                                minDate={editableLocalItem.beginDate || undefined}
                                onChange={(e) => setEditableLocalItem({ ...editableLocalItem, endDate: e.value as Date | null })}
                                dateFormat="dd.mm.yy"
                                locale="ru"
                                showIcon
                                showButtonBar />
                        </FloatLabel>
                        {errors?.endDate && (<small className="p-error">{errors.endDate}</small>)}
                    </div>
                    <div className={styles.dialog_field}>
                        <FloatLabel>
                            <label htmlFor="calendar-event-content">Описание события</label>
                            <InputTextarea
                                id="calendar-event-content"
                                style={{ width: "100%" }}
                                invalid={!!errors?.content}
                                value={editableLocalItem.content}
                                onChange={(e) => setEditableLocalItem({ ...editableLocalItem, content: e.target.value })}
                                autoResize />
                        </FloatLabel>
                        {errors?.content && (<small className="p-error">{errors.content}</small>)}
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default EventCalendarEditBlock;
