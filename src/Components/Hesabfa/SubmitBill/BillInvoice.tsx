import React from 'react';
import InvoiceTableItems from "./InvoiceTableItems.tsx";
import {addRowIdtoTable, formatNumber} from "../../../utils/utilsFunction.tsx";
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import OtherCostsInBill from "./OtherCostsInBill.tsx";


const BillInvoice = ({
                         invoice,
                         setInvoice,
                         initialBillData,
                     }) => {


    const onDeleteRow = (id: any) => {
        if (!id) {
            return
        }
        const currentInvoiceItems = [...invoice.InvoiceItems];
        const tempInvoiceItems = currentInvoiceItems.filter(row => row.Id !== id);
        setInvoice({InvoiceItems: addRowIdtoTable(tempInvoiceItems)})
    }


    try {
        return (
            <div>
                <div className={'flex flex-wrap gap-2'}>

                    <div className={'div__group__input_select'}>
                        <label htmlFor=""> شماره فاکتور </label>
                        <input type="text" value={invoice.Number} disabled={true}/>
                    </div>
                    <div className={'div__group__input_select'}>
                        <label htmlFor=""> کد مشتری </label>
                        <input type="text" value={invoice.ContactCode} disabled={true}/>
                    </div>
                    <div className={'div__group__input_select'}>
                        <label htmlFor=""> نام مشتری </label>
                        <input type="text" value={invoice.ContactCode} disabled={true}/>
                    </div>
                    <div className={'div__group__input_select'}>
                        <label htmlFor=""> تاریخ </label>
                        <input type="text" value={invoice.ContactCode} disabled={true}/>
                    </div>
                    <div className={'div__group__input_select'}>
                        <label htmlFor=""> تاریخ سر رسید </label>
                        <input type="text" value={invoice.ContactCode} disabled={true}/>
                    </div>

                </div>
                <InvoiceTableItems
                    invoice={invoice}
                    setInvoice={setInvoice}
                    invoiceItems={invoice.InvoiceItems}
                    onDeleteRow={onDeleteRow}
                />
                <div>
                    <OtherCostsInBill
                        setInvoice={setInvoice}
                        invoice={invoice}
                    />
                </div>
                <div className={'flex flex-col items-end'}>
                    {invoice.Others.map((row: any, index: any) => {
                        return <div key={index}>{row?.Title} : {formatNumber(row?.Amount)}</div>
                    })}
                </div>

            </div>
        );
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default BillInvoice;
