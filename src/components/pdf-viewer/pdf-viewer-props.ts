import React from "react";
import { PdfToolbarItem } from "./pdf-viewer-toolbar/pdf-toolbar-item";

export interface PdfViewerProps {
    fileUrl: string;
    toolbarItems?: PdfToolbarItem[]
}