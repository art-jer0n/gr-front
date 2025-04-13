import { PdfToolbarItem } from "./pdf-toolbar-item";

export interface PdfViewerToolbarProps {
    viewType: string;
    items?: PdfToolbarItem[],
    first: number;
    rows: number;
    totalRecords: number;
    onChangeViewType: (value: string) => void
    onPageChange: (event: any) => void;
}