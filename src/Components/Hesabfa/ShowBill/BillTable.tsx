import React from 'react';
import {formattedNumber, timestampToTimeFromHesabfa} from "../../../utils/utilsFunction.tsx";
import "./billTable.scss"

const BillTable = ({hesabfaBillData}) => {

    let totalSumShow = 0
    let sumOfNumbers = 0
    const isVerified = hesabfaBillData?.Status

    const dateShow = timestampToTimeFromHesabfa(hesabfaBillData?.Date)?.split(',')[0]
    const dueDateShow = timestampToTimeFromHesabfa(hesabfaBillData?.DueDate)?.split(',')[0]
    try {
        return <div className={'bill__table__css '}>
            <div className={'flex flex-wrap my-3 justify-between bill__info ' + `${isVerified ? "verifiedBill" : "unVerifiedBill"}` }>
                <div className={'bill__info__item'}>
                    <div className={'bill__info__item_title'}>عنوان مشتری</div>
                    <div className={'bill__info__item__description'}>{hesabfaBillData?.ContactTitle}</div>
                </div>
                <div className={'bill__info__item'}>
                    <div className={'bill__info__item_title'}> شماره فاکتور</div>
                    <div className={'bill__info__item__description'}>{hesabfaBillData?.Number}</div>
                </div>
                <div className={'bill__info__item'}>
                    <div className={'bill__info__item_title'}> تاریخ</div>
                    <div className={'bill__info__item__description'}>{dateShow}</div>
                </div>

                {/*<div className={'bill__info__item'}>*/}
                {/*    <div className={'bill__info__item_title'}> تاریخ سر رسید</div>*/}
                {/*    <div className={'bill__info__item__description'}>{dueDateShow}</div>*/}
                {/*</div>*/}

                <div className={'bill__info__item'}>
                    <div className={'bill__info__item_title'}> کد مشتری</div>
                    <div className={'bill__info__item__description'}>{Number(hesabfaBillData?.ContactCode)}</div>
                </div>

                <div className={'bill__info__item'}>
                    <div className={'bill__info__item_title'}> نام مشتری</div>
                    <div className={'bill__info__item__description'}>{hesabfaBillData?.Contact?.Name}</div>
                </div>

                <div className={'bill__info__item'}>
                    <div className={'bill__info__item_title'}> استان</div>
                    <div className={'bill__info__item__description'}>{hesabfaBillData?.Contact?.State}</div>
                </div>


                {/*<div> شهر مشتری:*/}
                {/*    {hesabfaBillData?.Contact?.City}*/}
                {/*</div>*/}

                {/*<div className={'bill__info__item'}>*/}
                {/*    <div className={'bill__info__item_title'}> عنوان پروژه</div>*/}
                {/*    <div className={'bill__info__item__description'}>{hesabfaBillData?.Project}</div>*/}
                {/*</div>*/}

                {/*<div className={'bill__info__item'}>*/}
                {/*    <div className={'bill__info__item_title'}> برچسب</div>*/}
                {/*    <div className={'bill__info__item__description'}>{hesabfaBillData?.Tag}</div>*/}
                {/*</div>*/}

            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-200 w-full">
                        <thead>
                        <tr className="">
                            <th className="border border-b-2 border-gray-300 px-4 py-2">ردیف</th>
                            <th className="border border-b-2 border-gray-300 px-4 py-2">نام</th>
                            <th className="border border-b-2 border-gray-300 px-4 py-2">تعداد</th>
                            <th className="border border-b-2 border-gray-300 px-4 py-2">واحد</th>
                            <th className="border border-b-2 border-gray-300 px-4 py-2">قیمت واحد</th>
                            <th className="border border-b-2 border-gray-300 px-4 py-2">جمع کل</th>
                        </tr>
                        </thead>
                        <tbody>
                        {hesabfaBillData?.InvoiceItems.map((row, index) => {
                            const {
                                RowNumber,
                                Description,
                                Quantity,
                                Unit,
                                UnitPrice,
                                Sum,
                                TotalAmount,
                            } = row;
                            const itemName= row?.Item?.Name
                            const isEven = (index % 2 === 0)
                            totalSumShow += TotalAmount
                            sumOfNumbers += Quantity
                            return <tr className={isEven ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{RowNumber + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{itemName}</td>
                                <td className="border border-gray-300 px-4 py-2">{Quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">{Unit}</td>
                                <td className="border border-gray-300 px-4 py-2">{formattedNumber(UnitPrice)}</td>
                                <td className="border border-gray-300 px-4 py-2">{formattedNumber(TotalAmount)}</td>
                            </tr>
                        })}

                        <tr className={'font-bold'}>
                            <td className="border border-t-2 border-gray-300 px-4 py-2 text-center">جمع</td>
                            <th className="border border-t-2 border-gray-300 px-4 py-2"></th>
                            <th className="border border-t-2 border-gray-300 px-4 py-2">{sumOfNumbers.toFixed(2)}</th>
                            <th className="border border-t-2 border-gray-300 px-4 py-2"></th>
                            <th className="border border-t-2 border-gray-300 px-4 py-2"> </th>
                            <th className="border border-t-2 border-gray-300 px-4 py-2 text-right">
                                {formattedNumber(totalSumShow)}
                                &nbsp;
                                تومان
                            </th>
                        </tr>
                        </tbody>

                    </table>

                    <div className={'w-full text-center p-3'}>
                        جمع کل فاکتور:
                        &nbsp;
                        {formattedNumber(totalSumShow)}
                        &nbsp;
                        تومان
                    </div>
                </div>
            </div>


        </div>
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default BillTable;
