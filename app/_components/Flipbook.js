// components/Flipbook.js
import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import ClipLoader from 'react-spinners/ClipLoader';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

Pages.displayName = 'Pages';

const Flipbook = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoading(false);
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden">
      <h1 className="text-3xl text-white text-center font-bold">FlipBook</h1>
      {loading && (
        <div className="flex justify-center items-center">
          <ClipLoader color="#ffffff" loading={loading} size={50} />
        </div>
      )}
      {!loading && (
        <HTMLFlipBook width={400} height={570}>
          {[...Array(numPages).keys()].map((pNum) => (
            <Pages key={pNum} number={pNum + 1}>
              <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pNum + 1} width={400} renderAnnotationLayer={false} renderTextLayer={false} />
              </Document>
              <p>
                Page {pNum + 1} of {numPages}
              </p>
            </Pages>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default Flipbook;