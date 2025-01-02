import React from 'react';
import EmptyRow from "./EmptyRow.tsx";
import InputDotToSlash from "../../SubmitBill/InputDotToSlash.tsx";
import {addRowIdtoTable, formatNumber} from "../../../../utils/utilsFunction.tsx";
import DeleteButton from "../../../../assets/icons/DeleteButton.tsx";
import {useSubmitBillContext} from "../submitBillContext.tsx";
import {calculateSumOfEachRow} from "../../SubmitBill/functions.tsx";
import Num2persian from 'num2persian';
import OtherCostsInBill from "./OtherCostsInBill.tsx";
import calculateTotalSumOfAll from "./calculateTotalSumOfAll.tsx";
import {FaSortAlphaDown, FaSortAlphaUp} from "react-icons/fa";
import ShowProductListForSelect from "./ShowProductListForSelect.tsx";
import RowNumber from "./RowNumber/RowNumber.tsx";


const InvoiceTable = () => {

    const {data, setData} = useSubmitBillContext()
    const invoice = data.invoice

    const totalSumBill = calculateTotalSumOfAll(data.invoice)

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


    const changeHandler = (invoiceItemsRowId, e) => {
        const unitText = e.target.options[e.target.selectedIndex].text
        const value = e.target.value

        // بضعی از آیتم ها هستن که  باید نحوه محاسبه قیمتشون باید اینجوری باشه که قیمت تقسیم به یه عدد بشه و محاسبه بشه
        // ینی اینجا اگه تغییری داد باید برم قیمت واحد رو عوض کنم

        setInvoice({
            InvoiceItems: calculateSumOfEachRow(invoice.InvoiceItems.map(row => {
                const temp = {...row};
                if (temp.Id === invoiceItemsRowId) {
                    // temp.selectedUnit = value;
                    temp.dividedBy = value;
                    temp.UnitPrice = Number((row.fixedPrice / value).toFixed(0));
                    temp.unit= unitText
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
    const sortItems = ({sortKey, reverseItems}) => {
        let sortedItems = [...invoice.InvoiceItems].sort((a, b) => {
            const valueA = a[sortKey];
            const valueB = b[sortKey];

            // Check if values are strings for localeCompare, otherwise use numeric comparison
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return valueA.localeCompare(valueB);
            }
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return valueA - valueB;
            }

            // Handle undefined values
            return 0;
        });

        if (reverseItems) {
            sortedItems = sortedItems.reverse()
        }

        setInvoice({InvoiceItems: addRowIdtoTable(sortedItems)});
    };


    try {

        const totalSum = {
            totalSumNumber: 0,
            totalQuantity: 0
        }


        return (
            <div className={"my-3"}>
                <div className={"w-full flex justify-end gap-2 mb-2"}>
                    <div className={"btn-white-border-mir"}
                         onClick={() => sortItems({sortKey:"Name", reverseItems:false})}
                    >
                        <FaSortAlphaDown size={16}/>

                    </div>
                    <div className={"btn-white-border-mir"}
                         onClick={() => sortItems({sortKey:"Name", reverseItems:true})}
                    >
                        <FaSortAlphaUp  size={16}/>

                    </div>
                </div>

                <div className={'InvoiceTableItems'}>
                    <table className={"tableUlWrapper table-auto w-full"}>
                        <thead>
                        <tr className={'table__header'}>
                            <th>
                                <div>&nbsp;</div>
                            </th>
                            <th>
                                <div>کالا</div>
                            </th>
                            <th>
                                <div>شرح</div>
                            </th>
                            <th>
                                <div>واحد</div>
                            </th>
                            <th>
                                <div>تعداد</div>
                            </th>
                            <th>
                                <div>مبلغ واحد</div>
                            </th>
                            {/*<th>*/}
                            {/*    <div>تخفیف</div>*/}
                            {/*</th>*/}
                            <th>
                                <div>مبلغ کل</div>
                            </th>
                            <th>
                                <div>حذف</div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{invoice?.InvoiceItems?.length === 0 && <EmptyRow/>}*/}

                        {
                            invoice?.InvoiceItems?.map((row, index) => {
                                totalSum.totalSumNumber += row.sum;
                                totalSum.totalQuantity += +row.Quantity;

                                return <tr key={index}>
                                    <td>
                                        <div>
                                            <RowNumber text={row.RowId} Id={row.Id} /> </div>
                                    </td>
                                    <td>
                                        <div>{row.Name ?? <section><ShowProductListForSelect/></section>}</div>
                                    </td>
                                    <td>
                                        <div>{row.Description}</div>
                                    </td>
                                    <td>
                                        {(row.SubUnit && row.SubUnit !== '') ? <select
                                            onChange={e => changeHandler(row.Id, e)}
                                            className={'select__in__table'}
                                            name={row.SubUnit}
                                            id={row.RowId}
                                            value={row.dividedBy}
                                        >
                                            {row?.Units?.map((unitRow, index) => <option key={index}
                                                                                         value={unitRow.divideNumber}>{unitRow.value}</option>)}
                                        </select> : row.Unit}
                                    </td>
                                    <td>
                                        <InputDotToSlash
                                            onClick={(e) => (e.target as HTMLInputElement).select()}
                                            onChange={(myNewString) => handleQuantityChange(row.Id, myNewString)}
                                            className={'input__text__full ltr'}
                                            type={'text'}
                                            value={(row.Quantity)}
                                        />
                                        {/*<input*/}
                                        {/*    onCtdck={(e) => (e.target as HTMLInputElement).select()}*/}
                                        {/*    onChange={(e) => handleQuantityChange(row.Id, e.target.value)}*/}
                                        {/*    className={'input__text__ftrl'}*/}
                                        {/*    type={'text'}*/}
                                        {/*    value={(row.Quantity)}*/}
                                        {/*/>*/}
                                    </td>
                                    <td>
                                        <div>{formatNumber(row.UnitPrice)}</div>
                                    </td>
                                    {/*<td>*/}
                                    {/*    <div>{formatNumber(row.Discount)}</div>*/}
                                    {/*</td>*/}
                                    <td>
                                        <div>{formatNumber(row.sum)}</div>
                                    </td>
                                    <td className={'p-5'}>
                                <span className={'cursor-pointer text-red-700'}
                                      onClick={() => onDeleteRow(row.Id)}>
                                    <DeleteButton/>
                                </span>
                                    </td>
                                    {/*<td><div>ConversionFactor : {row.dividedBy}</div></td>*/}
                                </tr>

                            })
                        }
                        <EmptyRow/>
                        <tr className={'table__header'}>
                            <td>
                                <div>&nbsp;</div>
                            </td>
                            <td>
                                <div>جمع</div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div></div>
                            </td>
                            <td className={'text-center'}> تعداد: {formatNumber(totalSum.totalQuantity)}</td>
                            <td>
                                <div></div>
                            </td>
                            <td>
                                <div> {formatNumber(totalSum.totalSumNumber?.toFixed(0))}
                                    <span>&nbsp; تومان</span>
                                </div>
                            </td>
                            <td>
                                <div></div>
                            </td>

                        </tr>
                        </tbody>
                    </table>
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