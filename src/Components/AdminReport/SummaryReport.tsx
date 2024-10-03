import React, {useContext} from 'react';
import {AdminReportContext} from "./AdminReportContext.tsx";
import {formattedNumber} from "../../utils/utilsFunction.tsx";

const SummaryReport = () => {
    const context = useContext(AdminReportContext)
    const {myData} = context;
    let sumTotalPrice = 0




    try {
        return (
            <div>
                <div className={"flex flex-wrap gap-1"}>
                    {myData?.titleData?.map((row: any, index: React.Key) => {

                        const {title, value, totalPrice} = row
                        sumTotalPrice += (totalPrice || 0 )
                        return <div
                            key={index}
                            // className="bg-white shadow-lg rounded-lg p-5 m-1 transform hover:scale-105 transition-transform duration-200"
                            className="bg-white shadow-lg rounded-lg p-5 m-1 transform hover:scale-105 transition-transform duration-200 border-r-2 border-b-2 border-blue-500"
                        >
                            <h2 className=" text-gray-700 mb-2">{title}</h2>
                            <p className=" text-blue-500 ltr">{value}</p>
                            <>
                                {totalPrice && <span>{formattedNumber(totalPrice)} </span>}
                            </>
                        </div>
                    })}

                    <div
                        // className="bg-white shadow-lg rounded-lg p-5 m-1 transform hover:scale-105 transition-transform duration-200"
                        className="bg-white shadow-lg rounded-lg p-5 m-1 transform hover:scale-105 transition-transform duration-200 border-r-2 border-b-2 border-green-600"
                    >
                        <h2 className="text-gray-700 mb-2 font-bold">جمع کل</h2>
                        <span className="ltr">{formattedNumber(sumTotalPrice)}</span>
                    </div>

                </div>

            </div>
        );
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default SummaryReport;
