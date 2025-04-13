import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

export interface PdfViewerPanelProps {
    fileUrl?: string;
    pageCount: number;
    onPageClick: (page: number) => void;
}