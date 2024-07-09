import React from 'react';
import {FaExclamationTriangle} from 'react-icons/fa';

const ErrorInBill = ({errorMessage}) => {
    try {
        return (
            <div>
                <div className={'font-mono ltr'}>
                    {errorMessage}
                </div>
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="bg-white p-8 rounded shadow-md text-center">
                        <FaExclamationTriangle className="text-red-500 text-6xl mb-4"/>
                        <p className="text-xl font-semibold text-gray-800">فاکتور مورد نظر یافت نشد</p>
                    </div>
                </div>

            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default ErrorInBill;
