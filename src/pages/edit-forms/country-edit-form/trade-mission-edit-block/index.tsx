import React, { useState } from "react";
import * as styles from "styles/country-edit-form.module.css";
import { TradeMissionEditBlockProps } from "./trade-mission-edit-block-props";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { TradeMission } from "interfaces/trade-mission";
import { DEFAULT_TRADE_MISSION, EMPTY_MESSAGE } from "app-consts";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

const TradeMissionEditBlock: React.FC<TradeMissionEditBlockProps> = ({
    tradeMissions,
    tradeMissionLoading,
    onChangeTradeMissions,
}) => {

    const [visibleMissionEditDialog, setVisibleMissionEditDialog] = useState<boolean>(false);
    const [editableMission, setEditableMission] = useState<TradeMission>(DEFAULT_TRADE_MISSION);
    const [selectedMission, setSelectedMission] = useState<TradeMission | null>(null);

    const openCreateMissionDialog = (): void => {
        setEditableMission({ ...DEFAULT_TRADE_MISSION });
        setVisibleMissionEditDialog(true);
    };

    const openEditMissionDialog = (): void => {
        if (!selectedMission) return;
        setEditableMission({ ...selectedMission });
        setVisibleMissionEditDialog(true);
    };

    const handleSaveMissionn = (): void => {
        let _tradeMissions: TradeMission[];
        if (editableMission.id) {
            _tradeMissions = tradeMissions.map(mission => mission.id === editableMission.id ? editableMission : mission);
        }
        else {
            _tradeMissions = [...tradeMissions, { ...editableMission }];
        }

        onChangeTradeMissions(_tradeMissions);
        setVisibleMissionEditDialog(false);
    };

    const handleDeleteMission = (): void => {
        if (!selectedMission) return;
        const _tradeMissions = tradeMissions.filter(_ => _.id !== selectedMission.id);
        onChangeTradeMissions(_tradeMissions);
        setSelectedMission(null);
    };

    return (
        <Card
            header="Торговые представительства"
            className={styles.card}>
            <DataTable
                loading={tradeMissionLoading}
                header={
                    <div className={styles.card_header_container}>
                        {/* <span className={styles.card_header_text}>Торговые представительства</span> */}
                        <div className={styles.card_header_button_container}>
                            <Button
                                icon="pi pi-plus"
                                label="Добавить"
                                className={styles.card_header_button}
                                onClick={openCreateMissionDialog} />
                            <Button
                                icon="pi pi-pencil"
                                label="Редактировать"
                                className={styles.card_header_button}
                                disabled={!selectedMission}
                                onClick={openEditMissionDialog} />
                            <Button
                                icon="pi pi-trash"
                                label="Удалить"
                                className={styles.card_header_button}
                                disabled={!selectedMission}
                                onClick={handleDeleteMission} />
                        </div>
                    </div>
                }
                dataKey="id"
                value={tradeMissions}
                selection={selectedMission}
                onSelectionChange={(e) => setSelectedMission(e.value as TradeMission | null)}
                selectionMode="single"
                stripedRows
                showGridlines
                scrollable
                emptyMessage={EMPTY_MESSAGE}
                className={styles.table}
                paginatorClassName={styles.paginator}
                scrollHeight="400px"
                removableSort
                sortMode="multiple">
                <Column
                    field="name"
                    header="Наименование"
                    align="left"
                    alignHeader="left"
                    sortable
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "20%" }} />
                <Column
                    field="representative"
                    header="Представитель"
                    align="left"
                    alignHeader="center"
                    sortable
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "10%" }} />
                <Column
                    field="address"
                    header="Адрес"
                    align="left"
                    alignHeader="center"
                    sortable
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "10%" }} />
                <Column
                    field="phone"
                    header="Телефон"
                    align="center"
                    alignHeader="center"
                    sortable
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "15%" }} />
                <Column
                    field="fax"
                    header="Факс"
                    align="center"
                    alignHeader="center"
                    sortable
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "15%" }} />
                <Column
                    field="website"
                    header="Web"
                    align="left"
                    alignHeader="center"
                    sortable
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "15%" }} />
                <Column
                    field="email"
                    header="E-mail"
                    align="left"
                    alignHeader="center"
                    sortable
                    bodyClassName={styles.table_body}
                    headerClassName={styles.table_header}
                    style={{ width: "15%" }} />
            </DataTable>

            <Dialog
                style={{ width: "50vw" }}
                header={editableMission.id ? "Редактирование торгового представительства" : "Добавление торгового представительства"}
                footer={
                    <div className={styles.dialog_footer}>
                        <Button icon="pi pi-check" label="Подтвердить" onClick={() => handleSaveMissionn()} />
                        <Button icon="pi pi-times" label="Отменить" onClick={() => setVisibleMissionEditDialog(false)} />
                    </div>
                }
                visible={visibleMissionEditDialog}
                onHide={() => setVisibleMissionEditDialog(false)}>
                <div className={styles.form}>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="trade-mission-name">Наименование представительства (отдела)</label>
                            <InputText
                                id="trade-mission-name"
                                value={editableMission.name || ""}
                                onChange={e => setEditableMission(prev => ({ ...prev, name: e.target.value }))}
                                style={{ width: "100%" }} />
                        </FloatLabel>
                    </div>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="trade-mission-representative">Представитель</label>
                            <InputText
                                id="trade-mission-representative"
                                value={editableMission.representative || ""}
                                onChange={e => setEditableMission(prev => ({ ...prev, representative: e.target.value }))}
                                style={{ width: "100%" }} />
                        </FloatLabel>
                    </div>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="trade-mission-address">Адрес</label>
                            <InputText
                                id="trade-mission-address"
                                value={editableMission.address || ""}
                                onChange={e => setEditableMission(prev => ({ ...prev, address: e.target.value }))}
                                style={{ width: "100%" }} />
                        </FloatLabel>
                    </div>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="trade-mission-phone">Телефон</label>
                            <InputText
                                id="trade-mission-phone"
                                value={editableMission.phone || ""}
                                onChange={e => setEditableMission(prev => ({ ...prev, phone: e.target.value }))}
                                style={{ width: "100%" }} />
                        </FloatLabel>
                    </div>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="trade-mission-fax">Факс</label>
                            <InputText
                                id="trade-mission-fax"
                                value={editableMission.fax || ""}
                                onChange={e => setEditableMission(prev => ({ ...prev, fax: e.target.value }))}
                                style={{ width: "100%" }} />
                        </FloatLabel>
                    </div>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="trade-mission-website">Web</label>
                            <InputText
                                id="trade-mission-website"
                                value={editableMission.website || ""}
                                onChange={e => setEditableMission(prev => ({ ...prev, website: e.target.value }))}
                                style={{ width: "100%" }} />
                        </FloatLabel>
                    </div>
                    <div className={styles.field}>
                        <FloatLabel>
                            <label htmlFor="trade-mission-email">E-mail</label>
                            <InputText
                                id="trade-mission-email"
                                value={editableMission.email || ""}
                                onChange={e => setEditableMission(prev => ({ ...prev, email: e.target.value }))}
                                style={{ width: "100%" }} />
                        </FloatLabel>
                    </div>
                </div>
            </Dialog>
        </Card >
    );
};

export default TradeMissionEditBlock;