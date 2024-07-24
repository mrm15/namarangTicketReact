import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintComponent = ({ children, printButtonLabel = "Print" , orientation = "a4" }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // Define the print styles, including orientation
    const myStyle = `
        @page {
            size: ${orientation};
        }
    `;

    return (
        <div>
            <button
                onClick={handlePrint}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                {printButtonLabel}
            </button>
            <style>
                {myStyle}
            </style>
            <div

                ref={componentRef}>
                {children}
            </div>
        </div>
    );
};

export default PrintComponent;
