import React from 'react';
import {calculatePivot} from "./pivotFunction.tsx";
import {formatFloat, formatNumber} from "../../utils/utilsFunction.tsx";

const SinglePivotData = ({
                             caption,
                             filterTextForPivot,
                             totalData,
                             myKey,
                             sumKey,
                             countKey,
                             showSubitems = false,
                             subRowKey = "myContactTitle",
                             subRowValue = "myQuantity"
                         }) => {


    const resultArray = calculatePivot({filterTextForPivot, totalData, myKey, sumKey, countKey})


    const mySum = {
        sumKey: 0,
        countKey: 0
    };




    return (
        <div>
            <table className={"border  "}>
                <caption className={"font-bold border fontSize12 "}>
                    {caption}
                </caption>
                <thead>
                <tr>
                    <th scope="col" className={"fontSize10 border "}>ردیف</th>
                    <th scope="col" className={"fontSize10 border "}>نام</th>
                    <th scope="col" className={"fontSize10 border "}>جمع</th>
                    <th scope="col" className={"fontSize10 border "}> تعداد</th>
                </tr>
                </thead>
                <tbody>
                {resultArray.map((row: any, index) => {
                    mySum.sumKey += row[sumKey]
                    mySum.countKey += row[countKey]



                    if (showSubitems) {
                        return <>
                            <tr key={index}>

                                <td className={' border px-1  whitespace-nowrap  fontSize10 font-medium text-gray-900'}>{index + 1}</td>
                                <td className={' border px-1  whitespace-nowrap fontSize10 font-medium text-gray-900'}>{row[myKey]}</td>
                                <td className={' border px-1  whitespace-nowrap fontSize10 font-medium text-gray-900'}>{formatNumber(row[sumKey])}</td>
                                <td className={' border px-1  whitespace-nowrap fontSize10 font-medium text-gray-900'}>{formatFloat(row[countKey])}</td>
                            </tr>
                            {row.rowData.map((subRow:any,index2) => <tr  key={index2}>
                                <td className={' border px-1 ps-2  whitespace-nowrap  fontSize8 font-medium text-gray-900'}>
                                    <div className={"rtl"}>
                                        {(index+1) + ". "+ (index2 + 1)}
                                    </div>
                                </td>
                                <td className={' border px-1  whitespace-nowrap fontSize8 font-medium text-gray-900'}>{subRow[subRowKey]}</td>
                                <td className={' border px-1  whitespace-nowrap fontSize8 font-medium text-gray-900'}>{formatNumber(subRow[sumKey])}</td>
                                <td className={' border px-1  whitespace-nowrap fontSize8 font-medium text-gray-900'}>{formatFloat(subRow[subRowValue])}</td>
                            </tr>)}
                        </>
                    } else {
                        return <tr key={index}>

                            <td className={' border px-1  whitespace-nowrap  fontSize10 font-medium text-gray-900'}>{index + 1}</td>
                            <td className={' border px-1  whitespace-nowrap fontSize10 font-medium text-gray-900'}>{row[myKey]}</td>
                            <td className={' border px-1  whitespace-nowrap fontSize10 font-medium text-gray-900'}>{formatNumber(row[sumKey])}</td>
                            <td className={' border px-1  whitespace-nowrap fontSize10 font-medium text-gray-900'}>{formatFloat(row[countKey])}</td>

                        </tr>
                    }

                })}

                </tbody>
                <tfoot>
                <tr>
                    <td className={' border px-6   whitespace-nowrap fontSize10 font-bold text-gray-900'}></td>
                    <td className={' border px-6   whitespace-nowrap fontSize10 font-bold text-gray-900'}>جمع</td>
                    <td className={' border px-6   whitespace-nowrap fontSize10 font-bold text-gray-900'}>{formatNumber(mySum.sumKey)}</td>
                    <td className={' border px-6   whitespace-nowrap fontSize10 font-bold text-gray-900'}>{formatNumber(mySum.countKey)}</td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default SinglePivotData;
