import React from 'react';
import "./InvoiceTableItems.scss"
import DeleteButton from "../../../assets/icons/DeleteButton.tsx";
import {formatNumber} from "../../../utils/utilsFunction.tsx";
import {calculateSumOfEachRow} from "./functions.tsx";
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import EmptyRow from "./EmptyRow.tsx";


const InvoiceTableItems = ({invoiceItems, onDeleteRow, setInvoice, invoice}) => {


    const changeHandler = (invoiceItemsRowId, value) => {
        // بضعی از آیتم ها هستن که  باید نحوه محاسبه قیمتشون باید اینجوری باشه که قیمت تقسیم به یه عدد بشه و محاسبه بشه
        // ینی اینجا اگه تغییری داد باید برم قیمت واحد رو عوض کنم
        const currentInvoice = [...invoice.InvoiceItems];
        const newInvoiceItems = currentInvoice.map(row => {

            const temp = {...row};
            if (temp.Id === invoiceItemsRowId) {

                temp.selectedUnit = value;
                row.dividedBy = value;
                row.UnitPrice = Number((row.fixedPrice / row.dividedBy).toFixed(0));

            }

            return temp
        });
        const newInvoiceItemsWithRowSum = calculateSumOfEachRow(newInvoiceItems)
        setInvoice({invoiceItems: newInvoiceItemsWithRowSum})
    }
    const totalSum = {
        totalSumNumber: 0,
        totalQuantity: 0
    }

    const handleQuantityChange = (id: number, valueHolder: string) => {

        // just let enter numbers and dot and numbers after dot
        if (!(/^[0-9]*\.?[0-9]*$/.test(valueHolder))) {
            return
        }
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

    try {
        return (
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
                {invoiceItems.length === 0 && <EmptyRow/>}

                {
                    invoiceItems.map((row, index) => {
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
                                <input
                                    onClick={(e) => (e.target as HTMLInputElement).select()}
                                    onChange={(e) => handleQuantityChange(row.Id, e.target.value)}
                                    className={'input__text__full'}
                                    type={'text'}
                                    value={(row.Quantity)}
                                /></li>
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
                    <li> تومان{formatNumber(totalSum.totalSumNumber)}</li>
                    <li></li>
                </ul>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default InvoiceTableItems;
