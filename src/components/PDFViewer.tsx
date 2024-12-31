import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  file: File | null;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = React.useState<number>(0);

  if (!file) return null;

  return (
    <div className="w-full overflow-auto bg-white rounded-lg shadow-lg p-4">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        className="mx-auto"
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            className="mb-4"
            width={600}
          />
        ))}
      </Document>
    </div>
  );
};