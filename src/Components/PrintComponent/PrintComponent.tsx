import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintComponent = ({ children, printButtonLabel = "Print" }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <button
                onClick={handlePrint}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
                {printButtonLabel}
            </button>
            <div ref={componentRef}>
                {children}
            </div>
        </div>
    );
};

export default PrintComponent;
