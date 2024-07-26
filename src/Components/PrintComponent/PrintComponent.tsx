import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintComponent = ({ children, printButtonLabel = "Print", orientation = "portrait", showHeaderFooter = false }) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const myStyle = `
        @page {
            size: ${orientation};
            margin: 20mm;
        }

        @media print {
            body {
                margin: 0;
                -webkit-print-color-adjust: exact;
            }

            .print-header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 20mm;
                background: #f8f9fa;
                text-align: center;
                border-bottom: 1px solid #ddd;
            }

            .print-footer {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 20mm;
                background: #f8f9fa;
                text-align: center;
                border-top: 1px solid #ddd;
            }

            .printable-content {
                margin-top: 25mm; /* space for header */
                margin-bottom: 25mm; /* space for footer */
            }
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
            <style>{myStyle}</style>
            <div ref={componentRef}>
                {showHeaderFooter && (
                    <>
                        <div className="print-header">
                            <h1>Header Content</h1>
                        </div>
                        <div className="print-footer">
                            <p>Footer Content</p>
                        </div>
                    </>
                )}
                <div className="printable-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PrintComponent;
