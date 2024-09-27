'use client';
import React, { useRef, useState, useEffect } from 'react';
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
  const [error, setError] = useState(null); // Changed to store error message
  const bookRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Set on initial load
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null); // Clear error on successful load
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading document:', error);
    setError('Failed to load PDF file.'); // Set error message
  };

  const goToPreviousPage = () => bookRef.current.pageFlip().flipPrev();
  const goToNextPage = () => bookRef.current.pageFlip().flipNext();

  // Responsive dimensions
  const width = isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.3; // 90% for mobile, 30% for desktop
  const height = isMobile ? window.innerHeight * 0.7 : 700; // 70% for mobile, 700px for desktop 

  return (
    <div className='flipbook-container h-screen w-screen flex flex-col items-center bg-white overflow-hidden'>
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
          error && <p className='text-red-500'>{error}</p> // Display error message
        )}
      </Document>
      <div className='mt-10 flex mb-32 flex-row justify-evenly items-center gap-5 mx-3 '>
        <button 
          onClick={goToPreviousPage} 
          disabled={error} 
          className='bg-gray-600 p-4 md:p-2 rounded-full'
        >
          <BsChevronLeft className='text-white text-3xl md:text-2xl'/>
        </button>
        <span className='mx-3 text-center text-sm md:text-base'>
          Page {currentPage + 1} of {numPages || 0}
        </span>
        <button 
          onClick={goToNextPage} 
          disabled={error} 
          className='bg-gray-600 p-4 md:p-2 rounded-full'
        >
          <BsChevronRight className='text-white text-3xl md:text-2xl'/>
        </button>
      </div>
    </div>
  );
};

export default Flipbook;
