import React, { useEffect, useState, useRef } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import * as styles from "styles/pdf-viewer.module.css";
import { PdfViewerProps } from "./pdf-viewer-props";
import PdfViewerPanel from "./pdf-viewer-panel";
import PdfViewerToolbar from "./pdf-viewer-toolbar";
import { loadingTemplate, noDataTemplate } from "./pdf-viewer-templates";
import { VIEW_TYPES } from "./pdf-viewer-consts";
import { PDFDocumentProxy, } from "pdfjs-dist/types/src/display/api";

const PdfViewer: React.FC<PdfViewerProps> = (props: PdfViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/assets/scripts/pdf.worker.mjs`;
  }, []);

  const [pageNumber, setPageNumber] = useState<number>(0);

  const [pageRefs, setPageRefs] = useState<React.RefObject<HTMLDivElement | null>[]>([]);

  const [viewType, setViewType] = useState<string>(VIEW_TYPES[0]);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const onLoadSuccess = (pdf: PDFDocumentProxy): void => {
    setPageNumber(pdf.numPages);
    setCurrentPage(1);
    setPageRefs(Array.from({ length: pdf.numPages }, () => React.createRef<HTMLDivElement>()));
  };

  const scrollToPage = (pageNum: number): void => {
    if (viewType === "Scroll") {
      const ref = pageRefs[pageNum - 1];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }

      return;
    }

    setCurrentPage(pageNum);
  };

  const onChangeViewType = (value: string): void => {
    setViewType(value);
    setCurrentPage(1);
  };

  const onPageChange = (event: any) => {
    setCurrentPage(event.page + 1);
    scrollToPage(event.page + 1);
  };

  if (viewType === "Scroll") {
    return (
      <div className={styles.pdf_viewer_container}>
        <PdfViewerPanel
          pageCount={pageNumber}
          onPageClick={scrollToPage}
          fileUrl={props.fileUrl} />
        <div className={styles.pdf_viewer}>
          <PdfViewerToolbar
            viewType={viewType}
            onChangeViewType={onChangeViewType}
            items={props.toolbarItems}
            first={currentPage - 1}
            rows={1}
            totalRecords={pageNumber}
            onPageChange={onPageChange} />
          <div className={styles.pdf_viewer_document} ref={viewerRef}>
            <Document
              file={props.fileUrl}
              onLoadSuccess={onLoadSuccess}
              noData={noDataTemplate}
              loading={loadingTemplate}
              error={null}>
              {Array.from({ length: pageNumber }, (_, index) => (
                <div
                  key={`pdf_viewer_page_container_${index}`}
                  ref={pageRefs[index]}
                  className={styles.pdf_viewer_page_container}>
                  <Page
                    key={`pdf_viewer_page${index}`}
                    noData={null}
                    loading={null}
                    error={null}
                    scale={1.3}
                    pageNumber={index + 1}
                    className={styles.pdf_viewer_page} />
                </div>
              ))}
            </Document>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.pdf_viewer_container}>
      <PdfViewerPanel
        pageCount={pageNumber}
        onPageClick={scrollToPage}
        fileUrl={props.fileUrl} />
      <div className={styles.pdf_viewer}>
        <PdfViewerToolbar
          viewType={viewType}
          onChangeViewType={onChangeViewType}
          items={props.toolbarItems}
          first={currentPage - 1}
          rows={1}
          totalRecords={pageNumber}
          onPageChange={onPageChange} />
        <div className={styles.pdf_viewer_document} ref={viewerRef}>
          <Document
            file={props.fileUrl}
            onLoadSuccess={onLoadSuccess}
            noData={noDataTemplate}
            loading={loadingTemplate}
            error={null}>
            <div className={styles.pdf_viewer_page_container} ref={pageRefs[currentPage - 1]}>
              <Page
                noData={null}
                loading={null}
                error={null}
                className={styles.pdf_viewer_page}
                scale={1.3}
                pageNumber={currentPage} />
            </div>
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
