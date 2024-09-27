import React, {useContext} from 'react';
import {TableGContext} from "../TableGContext.tsx";
import {randomNumberGenerator} from "../../../utils/utilsFunction.tsx";

const Pagination = () => {

    const reload = randomNumberGenerator()
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;


    if (!context) {
        return <div>Error: Context is undefined</div>;
    }

    const numberOfButtons = Math.ceil(myData.totalRows / myData.numberOfRows);

    const currentPage = myData.pageNumber;

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
        <div className={'flex flex-wrap gap-1 justify-between fontSize8'}>
            <div className={'flex flex-wrap gap-1'}>
                {[5, 10, 15, 20, 30, 50, 100, 200, 500].map((singleNumber, index) => {


                    return <button
                        key={index}
                        className={` ${myData.numberOfRows === singleNumber ? 'btn-gay-mir ' : 'btn-white-border-mir'}`}

                        onClick={() => {
                            if (myData.numberOfRows === singleNumber) {
                                // i am not a senior Developer Don't Expect me act like Pro!!
                            } else {
                                setMyData({numberOfRows: singleNumber, pageNumber: 1, reload})
                            }

                        }}
                    >{singleNumber}</button>
                })}

            </div>
            <div className="flex flex-wrap gap-1">
                {/* Previous Page Button */}
                <button
                    className={`mx-3  ${currentPage === 1 ? 'btn-disabled' : 'btn-enabled'}`}
                    onClick={() => setMyData({pageNumber: Math.max(1, currentPage - 1), reload})}
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
                            onClick={() => {
                                if (currentPage === number) {
                                    // as I Told you I am not Pro
                                } else {
                                    setMyData({pageNumber: number, reload})
                                }
                            }
                            }
                        >
                            {number}
                        </button>
                    )
                ))}

                {/* Next Page Button */}
                <button
                    className={`mx-3 ${currentPage === numberOfButtons ? 'btn-disabled' : 'btn-enabled'}`}
                    onClick={() => setMyData({pageNumber: Math.min(numberOfButtons, currentPage + 1), reload})}
                    disabled={currentPage === numberOfButtons}
                >
                    صفحه بعدی
                </button>
            </div>
        </div>
    );
};
const areEqual = (prevProps, nextProps) => {
    return prevProps.myData === nextProps.myData;
};

export default React.memo(Pagination, areEqual);
