import React from 'react';
import SummaryTable from "../../AdminReport/SummaryTable/SummaryTable.tsx";

const ShowBillUsersReport = ({ data }) => {
    try {
        return (
            <div className="flex flex-wrap w-full p-4">
                {data?.map((row, index) => (
                    <div
                        key={index}
                        className="border rounded-lg border-gray-300 shadow-md p-4 w-full md:w-1/3 bg-white hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="text-lg font-semibold text-gray-800 mb-2">{row.name}</div>
                        <div className="text-sm font-medium text-gray-500 mb-4">{row.code}</div>
                        <SummaryTable myData={row.data} />
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        return <div className="text-red-500 font-semibold">{error.toString()}</div>;
    }
};

export default ShowBillUsersReport;
