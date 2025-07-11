export interface PdfViewerPanelProps {
    fileUrl?: string;
    pageCount: number;
    onPageClick: (page: number) => void;
}