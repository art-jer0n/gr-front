import React, { useState, useEffect } from "react";
import * as styles from "styles/trade-mission.module.css";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { EMPTY_MESSAGE } from "app-consts";
import { TradeMissionDocument } from "interfaces/trade-mission-document";
import {
    dateTemplate,
    nameTemplate,
} from "./trade-mission-document-table-templates";
import { SelectItem } from "primereact/selectitem";

interface TableItem extends TradeMissionDocument {
    year: number;
}

const TradeMissionDocumentTable: React.FC<{ documents: TradeMissionDocument[] }> = ({ documents }) => {
    const [tableItems, setTableItems] = useState<TableItem[]>([]);
    const [yearOptions, setYearOptions] = useState<SelectItem[]>([]);

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        year: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const [nameFilterValue, setNameFilterValue] = useState<string>("");
    const [yearFilterValue, setYearFilterValue] = useState<number | null>(null);

    useEffect(() => {
        const items: TableItem[] = documents
            .filter(document => document.date !== null)
            .map(document => ({ ...document, year: document.date!.getFullYear() }));

        const years = items
            .map(item => item.year)
            .filter((year, index, array) => array.indexOf(year) === index);

        const yearOptions: SelectItem[] = years.map(year => ({
            label: year.toString(),
            value: year
        }));

        setTableItems(items);
        setYearOptions(yearOptions);
    }, [documents]);

    const nameFilterElement = (
        <InputText
            placeholder="Наименование"
            className="p-column-filter"
            value={nameFilterValue}
            onChange={e => {
                const value = e.target.value;
                setNameFilterValue(value);
                setFilters({ ...filters, name: { value: value, matchMode: FilterMatchMode.CONTAINS } });
            }} />
    );

    const yearFilterElement = (
        <Dropdown
            showClear
            placeholder="Год"
            className="p-column-filter"
            value={yearFilterValue}
            options={yearOptions}
            onChange={(e: DropdownChangeEvent) => {
                const value = e.value;
                setYearFilterValue(value);
                setFilters({ ...filters, year: { value: value, matchMode: FilterMatchMode.EQUALS } });
            }} />
    );

    return (
        <DataTable
            dataKey="id"
            value={tableItems}
            stripedRows
            showGridlines
            scrollable
            sortMode="multiple"
            removableSort
            emptyMessage={EMPTY_MESSAGE}
            className={styles.table}
            paginatorClassName={styles.paginator}
            scrollHeight="400px"
            filters={filters}
            filterIcon={false}
            onFilter={e => setFilters(e.filters)}
            filterDisplay="row">
            <Column
                field="name"
                header="Наименование"
                align="center"
                alignHeader="center"
                sortable
                filter
                filterElement={nameFilterElement}
                showFilterMenu={false}
                showClearButton={false}
                filterClear={null}
                body={nameTemplate}
                bodyClassName={styles.table_body}
                filterHeaderClassName={styles.table_filter_header}
                headerClassName={styles.table_header}
                style={{ width: "70%" }} />
            <Column
                field="date"
                filterField="year"
                header="Дата"
                align="center"
                alignHeader="center"
                sortable
                filter
                filterElement={yearFilterElement}
                showFilterMenu={false}
                showClearButton={false}
                body={dateTemplate}
                bodyClassName={styles.table_body}
                filterHeaderClassName={styles.table_filter_header}
                headerClassName={styles.table_header}
                style={{ width: "30%" }} />
        </DataTable>
    );
};

export default TradeMissionDocumentTable;
