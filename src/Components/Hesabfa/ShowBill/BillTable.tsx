import React from 'react';
import {formattedNumber, timestampToTime, timestampToTimeFromHesabfa} from "../../../utils/utilsFunction.tsx";

const BillTable = ({hesabfaBillData}) => {

    let totalSumShow = 0

    try {
        return <div>

            <div className={'flex flex-wrap gap-6 my-3 mx-6'}>
                <div> شماره فاکتور:
                    {hesabfaBillData?.Number}
                </div>
                <div> تاریخ:
                    {timestampToTimeFromHesabfa(hesabfaBillData?.Date)}
                </div>
                <div> تاریخ سر رسید:
                    {timestampToTimeFromHesabfa(hesabfaBillData?.DueDate)}
                </div>
                <div> کد مشتری:
                    {Number(hesabfaBillData?.ContactCode)}
                </div>
                <div> نام مشتری:
                    {hesabfaBillData?.Contact?.Name}
                </div>
                <div> نام مشتری:
                    {hesabfaBillData?.Contact?.Name}
                </div>
                <div> استان مشتری:
                    {hesabfaBillData?.Contact?.State}
                </div>
                <div> شهر مشتری:
                    {hesabfaBillData?.Contact?.City}
                </div>
                <div> عنوان مشتری:
                    {hesabfaBillData?.ContactTitle}
                </div>
                <div> عنوان پروژه:
                    {hesabfaBillData?.Project}
                </div>
                <div> برچسب:
                    {hesabfaBillData?.Tag}
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-200">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">ردیف</th>
                            <th className="border border-gray-300 px-4 py-2">توضیح</th>
                            <th className="border border-gray-300 px-4 py-2">مقدار</th>
                            <th className="border border-gray-300 px-4 py-2">واحد</th>
                            <th className="border border-gray-300 px-4 py-2">قیمت واحد</th>
                            <th className="border border-gray-300 px-4 py-2">جمع</th>
                            <th className="border border-gray-300 px-4 py-2">جمع کل</th>
                        </tr>
                        </thead>
                        <tbody>
                        {hesabfaBillData?.InvoiceItems.map(row => {
                            const {
                                RowNumber,
                                Description,
                                Quantity,
                                Unit,
                                UnitPrice,
                                Sum,
                                TotalAmount,
                            } = row;
                            totalSumShow += TotalAmount
                            return <tr className="bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-center">{RowNumber + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{Description}</td>
                                <td className="border border-gray-300 px-4 py-2">{Quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">{Unit}</td>
                                <td className="border border-gray-300 px-4 py-2">{formattedNumber(UnitPrice)}</td>
                                <td className="border border-gray-300 px-4 py-2">{formattedNumber(Sum)}</td>
                                <td className="border border-gray-300 px-4 py-2">{formattedNumber(TotalAmount)}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>

                    <div className={'w-full text-center p-3'}>
                        جمع کل فاکتور:
                        {formattedNumber(totalSumShow)}
                    </div>
                </div>
            </div>


        </div>
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default BillTable;
