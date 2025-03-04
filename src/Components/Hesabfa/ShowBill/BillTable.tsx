import React from 'react';
import { formattedNumber, timestampToTimeFromHesabfa } from "../../../utils/utilsFunction.tsx";
import Num2persian from 'num2persian';
import "./billTable.scss"



const BillTable = ({ hesabfaBillData }) => {
    let totalSumShow = 0;
    let sumOfNumbers = 0;
    const isVerified = hesabfaBillData?.Status;
    const dateShow = timestampToTimeFromHesabfa(hesabfaBillData?.Date)?.split(',')[0];
    const dueDateShow = timestampToTimeFromHesabfa(hesabfaBillData?.DueDate)?.split(',')[0];

    try {
        return (
            <div className="w-full max-w-4xl mx-auto font-sans text-gray-800 fontSizeMobile8">
                {/* Invoice Information */}
                <div className={`flex flex-wrap gap-4 p-4 rounded-md shadow-lg my-4 ${isVerified ? 'bg-green-100' : 'bg-red-100'}`}>
                    <div className="flex-1 min-w-[150px] ">
                        <div className="">عنوان مشتری</div>
                        <div className="font-bold">{hesabfaBillData?.ContactTitle}</div>
                    </div>
                    <div className="flex-1 ">
                        <div className=" ">شماره فاکتور</div>
                        <div className="font-bold">{hesabfaBillData?.Number}</div>
                    </div>
                    <div className="flex-1 w-fit">
                        <div className=" ">تاریخ</div>
                        <div className="font-bold">{dateShow}</div>
                    </div>
                    <div className="flex-1  ">
                        <div className=" ">کد مشتری</div>
                        <div className="font-bold">{Number(hesabfaBillData?.ContactCode)}</div>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <div className=" ">نام مشتری</div>
                        <div className="font-bold">{hesabfaBillData?.Contact?.Name}</div>
                    </div>
                    <div className="flex-1 ">
                        <div className=" ">استان</div>
                        <div className="font-bold">{hesabfaBillData?.Contact?.State}</div>
                    </div>
                </div>

                {/* Invoice Table */}
                <div className="overflow-x-auto ">
                    <table className="min-w-full bg-white rounded-md shadow-md">
                        <thead>
                        <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <th className="px-1 py-1 border-b border-gray-200 text-center">#</th>
                            <th className="px-1 py-1 border-b border-gray-200">نام</th>
                            <th className="px-1 py-1 border-b border-gray-200">تعداد</th>
                            <th className="px-1 py-1 border-b border-gray-200 ">واحد</th>
                            <th className="px-1 py-1 border-b border-gray-200 whitespace-nowrap">قیمت واحد</th>
                            <th className="px-1 py-1 border-b border-gray-200">جمع کل</th>
                        </tr>
                        </thead>
                        <tbody>
                        {hesabfaBillData?.InvoiceItems.map((row, index) => {
                            const { RowNumber, Quantity, Unit, UnitPrice, TotalAmount } = row;
                            const itemName = row?.Item?.Name;
                            const isEven = index % 2 === 0;
                            totalSumShow += TotalAmount;
                            sumOfNumbers += Quantity;
                            return (
                                <tr key={index} className={isEven ? 'bg-gray-50' : 'bg-white'}>
                                    <td className="px-1 py-1 border border-gray-200 text-center">{RowNumber + 1}</td>
                                    <td className="px-1 py-1 border border-gray-200 whitespace-nowrap">{itemName}</td>
                                    <td className="px-1 py-1 border border-gray-200">{Quantity}</td>
                                    <td className="px-1 py-1 border border-gray-200 whitespace-nowrap">{Unit}</td>
                                    <td className="px-1 py-1 border border-gray-200">{formattedNumber(UnitPrice)}</td>
                                    <td className="px-1 py-1 border border-gray-200">{formattedNumber(TotalAmount)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                        <tfoot className="font-bold">
                        <tr className="bg-gray-200">
                            <td className="px-1 py-1 border-t border-gray-300 text-center"></td>
                            <td className="px-1 py-1 border-t border-gray-300">جمع</td>
                            <td className="px-1 py-1 border-t border-gray-300">{sumOfNumbers.toFixed(2)}</td>
                            <td className="px-1 py-1 border-t border-gray-300"></td>
                            <td className="px-1 py-1 border-t border-gray-300"></td>
                            <td className="px-1 py-1 border-t border-gray-300">
                                {formattedNumber(totalSumShow)} تومان
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                    <div className="w-full text-center py-4 fontSize10 font-semibold">
                       <div> جمع کل فاکتور: {formattedNumber(totalSumShow)} تومان</div>
                        <div>{Num2persian(totalSumShow)} تومان </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return <div>{error.toString()}</div>;
    }
};

export default BillTable;
