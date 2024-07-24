import React from 'react';
import {calculatePivot} from "./pivotFunction.tsx";
import {formatNumber} from "../../utils/utilsFunction.tsx";

const SinglePivotData = ({filterTextForPivot , totalData, myKey , sumKey,countKey}) => {




    const resultArray = calculatePivot({filterTextForPivot , totalData, myKey , sumKey,countKey})


    const mySum ={
        sumKey:0,
        countKey:0
    };

    return (
        <div>
            <table className={"border mt-2"}>
                <caption className={"font-bold border fontSize12 "}>
                    {filterTextForPivot[0]}
                </caption>
                <thead>
                <tr>
                    <th scope="col" className={"fontSize10 border "}>ردیف</th>
                    <th scope="col" className={"fontSize10 border "}>نام</th>
                    <th scope="col" className={"fontSize10 border "}>جمع </th>
                    <th scope="col" className={"fontSize10 border "}> تعداد </th>
                </tr>
                </thead>
                <tbody>
                {resultArray.map((row, index)=> {
                    mySum.sumKey +=row[sumKey]
                    mySum.countKey +=row[countKey]


                    return <tr key={index}>

                        <td className={' border px-1   whitespace-nowrap  fontSize10 font-medium text-gray-900'}>{index+1}</td>
                        <td className={' border px-1   whitespace-nowrap fontSize10 font-medium text-gray-900'}>{row[myKey]}</td>
                        <td className={' border px-1   whitespace-nowrap fontSize10 font-medium text-gray-900'}>{formatNumber(row[sumKey])}</td>
                        <td className={' border px-1   whitespace-nowrap fontSize10 font-medium text-gray-900'}>{row[countKey].toFixed(2)}</td>

                    </tr>
                })}

                </tbody>
                <tfoot>
                <tr>
                    <td  className={' border px-6   whitespace-nowrap fontSize10 font-bold text-gray-900'} ></td>
                    <td  className={' border px-6   whitespace-nowrap fontSize10 font-bold text-gray-900'} >جمع</td>
                    <td  className={' border px-6   whitespace-nowrap fontSize10 font-bold text-gray-900'} >{formatNumber( mySum.sumKey)}</td>
                    <td  className={' border px-6   whitespace-nowrap fontSize10 font-bold text-gray-900'} >{formatNumber(mySum.countKey)}</td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default SinglePivotData;
