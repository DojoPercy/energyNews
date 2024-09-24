import React from 'react'
import HTMLFlipBook from 'react-pageflip';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

const Pages = React.forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref} >
            <p>{props.children}</p>
            <p>Page number: {props.number}</p>
        </div>
    );
});

Pages.displayName = 'Pages';

function Flipbook({pdfUrl}) {
  console.log(pdfUrl);
    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (
        <>

            <div className='h-screen w-screen flex flex-col gap-5 justify-center items-center bg-white overflow-hidden'>
               
                <HTMLFlipBook width={400} height={570}>
                    {
                        [...Array(numPages).keys()].map((pNum) => (
                            <Pages key={pNum} number={pNum}>
                                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pNum} width={400} renderAnnotationLayer={false} renderTextLayer={false} />
                                </Document>
                                <p>
                                    Page {pNum} of {numPages}
                                </p>
                            </Pages>
                        ))
                    }
                </HTMLFlipBook>
            </div>
        </>

    );
}

export default Flipbook