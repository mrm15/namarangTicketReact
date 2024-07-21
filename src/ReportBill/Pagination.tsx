import React, { useContext } from 'react';
import { ReportBillContext } from './ReportBillContext';

const Pagination = () => {
    const context = useContext(ReportBillContext);

    if (!context) {
        return <div>Error: Context is undefined</div>;
    }

    const { awesomeData, setAwesomeData } = context;

    const numberOfButtons = Math.ceil(awesomeData.TotalCount / awesomeData.numberOfRowsShowInTable);
    const currentPage = awesomeData.currentSelectedPage;

    // Define how many pages to show before and after the current page
    const pageRange = 3;

    // Generate an array of page numbers to display
    const arrayOfPageNumbers = [];

    // Add the first page if not in the range
    if (currentPage > pageRange + 1) {
        arrayOfPageNumbers.push(1);
        if (currentPage > pageRange + 2) {
            arrayOfPageNumbers.push('...');
        }
    }

    // Add pages around the current page
    for (let i = Math.max(1, currentPage - pageRange); i <= Math.min(numberOfButtons, currentPage + pageRange); i++) {
        arrayOfPageNumbers.push(i);
    }

    // Add the last page if not in the range
    if (currentPage < numberOfButtons - pageRange) {
        if (currentPage < numberOfButtons - pageRange - 1) {
            arrayOfPageNumbers.push('...');
        }
        arrayOfPageNumbers.push(numberOfButtons);
    }

    return (
        <div>
            <div className="pagination-container">
                {/* Previous Page Button */}
                <button
                    className={`mx-3  ${currentPage === 1 ? 'btn-disabled' : 'btn-enabled'}`}
                    onClick={() => setAwesomeData({ currentSelectedPage: Math.max(1, currentPage - 1) })}
                    disabled={currentPage === 1}
                >
                   صفحه قبل
                </button>

                {/* Page Number Buttons */}
                {arrayOfPageNumbers.map((number, index) => (
                    number === '...' ? (
                        <span key={index} className="btn btn-disabled mx-3">...</span>
                    ) : (
                        <button
                            key={index}
                            className={`btn ${currentPage === number ? 'btn-gay-mir' : 'btn-white-border-mir'}`}
                            onClick={() => setAwesomeData({ currentSelectedPage: number })}
                        >
                            {number}
                        </button>
                    )
                ))}

                {/* Next Page Button */}
                <button
                    className={`mx-3 ${currentPage === numberOfButtons ? 'btn-disabled' : 'btn-enabled'}`}
                    onClick={() => setAwesomeData({ currentSelectedPage: Math.min(numberOfButtons, currentPage + 1) })}
                    disabled={currentPage === numberOfButtons}
                >
                    صفحه بعدی
                </button>
            </div>
        </div>
    );
};

export default Pagination;
