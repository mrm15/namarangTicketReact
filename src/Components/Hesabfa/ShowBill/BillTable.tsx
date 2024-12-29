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
            <div
                className={'flex flex-wrap my-3 justify-start gap-2 bill__info ' + `${isVerified ? "verifiedBill" : "unVerifiedBill"}`}>
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
                <div className="whitespace-nowrap0">
                    <div className="  border border-gray-200 ">
                        <ul className="">
                            <li className="border border-b-2 border-gray-300 ">رد</li>
                            <li className="border border-b-2 border-gray-300 px-4 py-2">نام</li>
                            <li className="border border-b-2 border-gray-300 px-4 py-2">تعداد</li>
                            <li className="border border-b-2 border-gray-300 px-4 py-2">واحد</li>
                            <li className="border border-b-2 border-gray-300 px-4 py-2">قیمت واحد</li>
                            <li className="border border-b-2 border-gray-300 px-4 py-2">جمع کل</li>
                        </ul>
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
                                const itemName = row?.Item?.Name
                                const isEven = (index % 2 === 0)
                                totalSumShow += TotalAmount
                                sumOfNumbers += Quantity
                                return <ul className={isEven ? 'bg-gray-100' : 'bg-white'}>
                                    <li className="border border-gray-300 text-center">{RowNumber + 1}</li>
                                    <li className="border border-gray-300  py-2 ">{itemName}</li>
                                    <li className="border border-gray-300 px-4 py-2">{Quantity}</li>
                                    <li className="border border-gray-300 px-4 py-2">{Unit}</li>
                                    <li className="border border-gray-300 px-4 py-2">{formattedNumber(UnitPrice)}</li>
                                    <li className="border border-gray-300 px-4 py-2">{formattedNumber(TotalAmount)}</li>
                                </ul>
                            })}
                            <ul className={'font-bold'}>
                                <li className="border border-t-2 border-gray-300  text-center"></li>
                                <li className="border border-t-2 border-gray-300 px-4 py-2">جمع</li>
                                <li className="border border-t-2 border-gray-300  py-2">{sumOfNumbers.toFixed(2)}</li>
                                <li className="border border-t-2 border-gray-300 px-4 py-2"></li>
                                <li className="border border-t-2 border-gray-300 px-4 py-2"></li>
                                <li className="border border-t-2 border-gray-300 px-4 py-2 ">{formattedNumber(totalSumShow)}&nbsp;تومان</li>
                            </ul>
                    </div>
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
