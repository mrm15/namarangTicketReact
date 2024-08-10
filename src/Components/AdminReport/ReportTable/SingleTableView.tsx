import React, {Fragment} from 'react';
import {formatNumber} from "../../../utils/utilsFunction.tsx";

const SingleTableView = (props) => {

    const {caption, index, pivotResult} = props

    const sums={
        myQuantity:0,
        counter:0,
        myTotalAmount:0,


    }
try{
    return (
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className={"py-2 bg-fuchsia-50"}>{caption}</caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">
                            ردیف
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            نام
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            تعداد
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            تعداد آیتم
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            جمع
                        </th>
                    </tr>
                    </thead>
                    <tbody>

                    {pivotResult?.map((row: any, indexTRow: number) => {


                        sums.myTotalAmount += row.myTotalAmount
                        sums.counter += row.counter
                        sums.myQuantity += row.myQuantity

                        return <Fragment key={indexTRow}>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td scope="row"
                                    className=" text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {indexTRow + 1}
                                </td>
                                <td className="text-center px-6 py-4 break-words  ">
                                    {row?.myItemName}
                                </td>
                                <td className=" text-center px-6 py-4">
                                    {formatNumber(row?.myQuantity)}
                                </td>
                                <td className=" text-center px-6 py-4">
                                    {row?.counter}
                                </td>
                                <td className="text-center px-6 py-4">
                                    {formatNumber(row?.myTotalAmount)}
                                </td>
                            </tr>
                        </Fragment>
                    })}
                    <tr className="font-bold odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td scope="row"
                            className=" text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
جمع
                        </td>
                        <td className="text-center px-6 py-4">

                        </td>
                        <td className="text-center px-6 py-4">
                            {formatNumber(sums?.myQuantity)}
                        </td>
                        <td className="text-center px-6 py-4">
                            {formatNumber(sums?.counter)}
                        </td>
                        <td className="text-center px-6 py-4">
                            {formatNumber(sums?.myTotalAmount)}
                        </td>
                    </tr>


                    </tbody>
                </table>
            </div>

        </div>
    );
}catch (error){
        return  <>{error.toString()}</>
}
};

export default SingleTableView;
