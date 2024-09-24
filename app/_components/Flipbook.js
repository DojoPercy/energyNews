'use client';
import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page as ReactPdfPage, pdfjs } from 'react-pdf';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

const Page = React.forwardRef(({ pageNumber, width, height }, ref) => (
  <div ref={ref} className='self-center mb-10'>
    <ReactPdfPage 
      pageNumber={pageNumber} 
      width={width} 
      height={height} 
      renderAnnotationLayer={false} 
      renderTextLayer={false} 
    />
  </div>
));

Page.displayName = 'Page';

const Flipbook = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const bookRef = useRef();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading document:', error);
    setError(true);
  };

  const goToPreviousPage = () => bookRef.current.pageFlip().flipPrev();
  const goToNextPage = () => bookRef.current.pageFlip().flipNext();

  const width = 400;
  const height = 570;

  return (
    <div className='py-20 h-screen w-screen flex flex-col items-center bg-white overflow-hidden'>
      <h1 className='my-5 font-extrabold text-4xl'>PDF Flipbook</h1>
      <Document 
        file={pdfUrl} 
        onLoadSuccess={onDocumentLoadSuccess} 
        onLoadError={onDocumentLoadError} 
      >
        {numPages && !error ? (
          <HTMLFlipBook
            showCover={true}
            maxShadowOpacity={0.5}
            mobileScrollSupport={true}
            width={width}
            height={height}
            onFlip={(e) => setCurrentPage(e.data)}
            flippingTime={1000}
            ref={bookRef}
            className='mx-0 my-auto'
          >
            {[...Array(numPages)].map((_, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
                width={width}
                height={height}
              />
            ))}
          </HTMLFlipBook>
        ) : (
          error && <p className='text-red-500'>Failed to load PDF file.</p>
        )}
      </Document>
      <div className='flex flex-row justify-evenly items-center gap-5 mx-3 mt-5'>
        <button 
          onClick={goToPreviousPage} 
          disabled={error} 
          className='bg-gray-600 p-2 rounded-full'
        >
          <BsChevronLeft className='text-white text-2xl'/>
        </button>
        <span className='mx-3 text-center text-sm md:text-base'>
          Page {currentPage + 1} of {numPages || 0}
        </span>
        <button 
          onClick={goToNextPage} 
          disabled={error} 
          className='bg-gray-600 p-2 rounded-full'
        >
          <BsChevronRight className='text-white text-2xl'/>
        </button>
      </div>
    </div>
  );
};

export default Flipbook;
