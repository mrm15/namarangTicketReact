import React from 'react';
import EmptyRow from "../../SubmitBill/EmptyRow.tsx";
import InputDotToSlash from "../../SubmitBill/InputDotToSlash.tsx";
import {addRowIdtoTable, formatNumber} from "../../../../utils/utilsFunction.tsx";
import DeleteButton from "../../../../assets/icons/DeleteButton.tsx";
import {useSubmitBillContext} from "../submitBillContext.tsx";
import {calculateSumOfEachRow} from "../../SubmitBill/functions.tsx";
import Num2persian from 'num2persian';
import OtherCostsInBill from "./OtherCostsInBill.tsx";
import {IInvoice} from "../initialDataTypes.tsx";
import calculateTotalSumOfAll from "./calculateTotalSumOfAll.tsx";


const InvoiceTable = () => {

    const {data, setData} = useSubmitBillContext()
    const invoice = data.invoice

    const setInvoice = (keyValuePairForInvoice) => {
        setData({invoice: {...data.invoice, ...keyValuePairForInvoice}})
    }


    const onDeleteRow = (id: any) => {
        if (!id) {
            return
        }
        const currentInvoiceItems = [...invoice.InvoiceItems];
        const tempInvoiceItems = currentInvoiceItems.filter(row => row.Id !== id);
        setData({
            invoice: {
                ...invoice,
                InvoiceItems: addRowIdtoTable(tempInvoiceItems)
            }
        })
    }







    const changeHandler = (invoiceItemsRowId, value) => {
        // بضعی از آیتم ها هستن که  باید نحوه محاسبه قیمتشون باید اینجوری باشه که قیمت تقسیم به یه عدد بشه و محاسبه بشه
        // ینی اینجا اگه تغییری داد باید برم قیمت واحد رو عوض کنم
        setInvoice({
            InvoiceItems: calculateSumOfEachRow(invoice.InvoiceItems.map(row => {
                const temp = {...row};
                if (temp.Id === invoiceItemsRowId) {
                    // temp.selectedUnit = value;
                    temp.dividedBy = value;
                    temp.UnitPrice = Number((row.fixedPrice / value).toFixed(0));
                }
                return temp
            }))
        })
    }

    /***********************************************/
    const handleQuantityChange = (id: number, valueHolder: string) => {

        // just let enter numbers and dot and numbers after dot
        // if (!(/^[0-9]*\.?[0-9]*$/.test(valueHolder))) {
        //     return
        // }
        setInvoice({
            InvoiceItems: calculateSumOfEachRow(invoice.InvoiceItems.map((t: any) => {
                const row = {...t}
                if (row.Id === id) {
                    row.Quantity = valueHolder
                }
                return row;
            }))
        })
    }

    /***********************************************/


    try {

        const totalSum = {
            totalSumNumber: 0,
            totalQuantity: 0
        }

        const totalSumBill = calculateTotalSumOfAll(data.invoice)

        return (
            <div>
                <div className={'InvoiceTableItems'}>
                    <ul className={'table__header'}>
                        <li>&nbsp;</li>
                        <li>کالا</li>
                        <li>شرح</li>
                        <li>واحد</li>
                        <li>تعداد</li>
                        <li>مبلغ واحد</li>
                        <li>تخفیف</li>
                        <li>مبلغ کل</li>
                        <li>حذف</li>
                    </ul>
                    {invoice?.InvoiceItems?.length === 0 && <EmptyRow/>}

                    {
                        invoice?.InvoiceItems?.map((row, index) => {
                            totalSum.totalSumNumber += row.sum;
                            totalSum.totalQuantity += +row.Quantity;

                            return <ul key={index}>
                                <li>{row.RowId}</li>
                                <li>{row.Name}</li>
                                <li>{row.Description}</li>
                                <li>
                                    {(row.SubUnit && row.SubUnit !== '') ? <select
                                        onChange={e => changeHandler(row.Id, e.target.value)}
                                        className={'select__in__table'}
                                        name={row.SubUnit} id={row.RowId}
                                        value={row.dividedBy}
                                    >
                                        {row?.Units?.map((unitRow, index) => <option key={index}
                                                                                     value={unitRow.divideNumber}>{unitRow.value}</option>)}
                                    </select> : row.Unit}
                                </li>
                                <li>
                                    <InputDotToSlash
                                        onClick={(e) => (e.target as HTMLInputElement).select()}
                                        onChange={(myNewString) => handleQuantityChange(row.Id, myNewString)}
                                        className={'input__text__full'}
                                        type={'text'}
                                        value={(row.Quantity)}
                                    />
                                    {/*<input*/}
                                    {/*    onClick={(e) => (e.target as HTMLInputElement).select()}*/}
                                    {/*    onChange={(e) => handleQuantityChange(row.Id, e.target.value)}*/}
                                    {/*    className={'input__text__full'}*/}
                                    {/*    type={'text'}*/}
                                    {/*    value={(row.Quantity)}*/}
                                    {/*/>*/}
                                </li>
                                <li>{formatNumber(row.UnitPrice)}</li>
                                <li>{formatNumber(row.Discount)}</li>
                                <li>{formatNumber(row.sum)}</li>
                                <li className={'p-5'}>
                                <span className={'cursor-pointer text-red-700'}
                                      onClick={() => onDeleteRow(row.Id)}>
                                    <DeleteButton/>
                                </span>
                                </li>
                                {/*<li>ConversionFactor : {row.dividedBy}</li>*/}
                            </ul>

                        })
                    }
                    <ul className={'table__header'}>
                        <li>&nbsp;</li>
                        <li>جمع</li>
                        <li></li>
                        <li></li>
                        <li className={'text-center'}> تعداد: {formatNumber(totalSum.totalQuantity)}</li>
                        <li></li>
                        <li></li>
                        <li> تومان{formatNumber(totalSum.totalSumNumber?.toFixed(0))}</li>
                        <li></li>
                    </ul>
                </div>
                <div className={'mx-5'}>
                    <div>
                        <OtherCostsInBill
                            setInvoice={setInvoice}
                            invoice={invoice}
                        />
                    </div>
                    <div className={'flex flex-col items-end'}>
                        {invoice.Others.map((row: any, index: any) => {

                            const addClassName = (row.Add ? ' ' : ' text-red-700 ')
                            return <div key={index}
                                        className={addClassName}>{row?.Title} : {formatNumber(row?.Amount)}</div>
                        })}

                        <div className={'font-bold ltr'}>
                            <div>

                                جمع کل فاکتور:
                                <span className={'p-2'}>{formatNumber(totalSumBill?.toFixed(0))} تومان</span>
                            </div>
                            <div>
                                مبلغ به حروف:
                                <span className={'p-2'}>{Num2persian(totalSumBill?.toFixed(0))} تومان </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    } catch (error) {
        return <>{error.toString()}</>
    }
}


export default InvoiceTable