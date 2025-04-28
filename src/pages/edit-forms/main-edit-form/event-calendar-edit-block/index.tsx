import React, { useState } from "react";
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
import { dateTemplate, textTemplate } from "./event-calendar-edit-block-templates";
import { generateEventId } from "services/calendar-event-service";

const EventCalendarEditBlock: React.FC<EventCalendarEditBlockProps> = ({ items, loading, onChangeItems }) => {

    const [visibleEditDialog, setVisibleEditDialog] = useState<boolean>(false);
    const [editableItem, setEditableItem] = useState<CalendarEvent>(DEFAULT_EVENT);
    const [selectedItem, setSelectedItem] = useState<CalendarEvent | null>(null);

    const openCreateDialog = (): void => {
        setEditableItem({ ...DEFAULT_EVENT });
        setVisibleEditDialog(true);
    };

    const openEditDialog = (): void => {
        if (!selectedItem) return;
        setEditableItem({ ...selectedItem });
        setVisibleEditDialog(true);
    };

    const handleSave = (): void => {
        let _items: CalendarEvent[];
        if (editableItem.id) {
            _items = items.map(_ => _.id === editableItem.id ? editableItem : _);
        }
        else {
            const newItem = { ...editableItem, id: generateEventId() };
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
                onSelectionChange={(e) => setSelectedItem(e.value as CalendarEvent | null)}
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
                    header="Описание"
                    field="text"
                    sortable
                    body={(rowData) => textTemplate(rowData)}
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "90%" }} />
            </DataTable>

            <Dialog
                style={{ width: "50vw" }}
                header={editableItem.id ? "Редактирование события" : "Добавление события"}
                footer={dialogFooterTemplate}
                visible={visibleEditDialog}
                onHide={() => setVisibleEditDialog(false)}>
                <div className={styles.form}>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="calendar-event-date">Дата</label>
                            <Calendar
                                id="calendar-event-date"
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
                            <label htmlFor="calendar-event-text">Описание</label>
                            <InputTextarea
                                id="calendar-event-text"
                                style={{ width: "100%" }}
                                value={editableItem.text}
                                onChange={(e) => setEditableItem({ ...editableItem, text: e.target.value })}
                                autoResize />
                        </FloatLabel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default EventCalendarEditBlock;