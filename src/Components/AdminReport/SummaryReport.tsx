import React, {useContext} from 'react';
import {AdminReportContext} from "./AdminReportContext.tsx";

const SummaryReport = () => {
    const context = useContext(AdminReportContext)
    const {myData} = context;


    try {
        return (
            <div className={"flex flex-wrap gap-1"}>
                {myData?.titleData?.map((row: any, index: React.Key) => {
                    const {title, value} = row
                    return <div
                        key={index}
                        // className="bg-white shadow-lg rounded-lg p-5 m-1 transform hover:scale-105 transition-transform duration-200"
                        className="bg-white shadow-lg rounded-lg p-5 m-1 transform hover:scale-105 transition-transform duration-200 border-r-2 border-b-2 border-blue-500"
                    >
                        <h2 className=" text-gray-700 mb-2">{title}</h2>
                        <p className=" text-blue-500 ltr">{value}</p>
                    </div>
                })}
            </div>
        );
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default SummaryReport;
