import React from 'react';
import {addRowIdtoTable, formatNumber, iso8601ToDateObject} from "../../../../utils/utilsFunction.tsx";
import MyDatePicker2 from "../../../myDatePicker2/MyDatePicker2.tsx";
import {IProjectList} from "../../SubmitBill/initialData.tsx";
import {useSubmitBillContext} from "../submitBillContext.tsx";
import ProjectListInBillData from "./ProjectListInBillData.tsx";

const InvoiceData = () => {

    const {data, setData} = useSubmitBillContext()
    const invoice = data.invoice


    /*********************************************/
    const setInvoice = (keyValuePairForInvoice) => {
        setData({invoice: {...data.invoice, ...keyValuePairForInvoice}})
    }


    const ContactMobile = invoice?.Contact?.Mobile;
    const changeDateHandler = (myDate: string, myKey: string) => {
        setInvoice({[myKey]: myDate})
    }

    const handleInputChange = (value: string, myKey: any) => {
        setInvoice({[myKey]: value})
    }

    let showTagName = ""
    let showTicketNumber = ""
    try {
        showTagName = JSON?.parse(invoice?.Tag)?.n
        showTicketNumber = JSON?.parse(invoice?.Tag)?.tn
    } catch (error) {
        console.log(error)
    }

    // const userBedOrBesValue = invoice?.Contact?.Credits - invoice?.Contact?.Liability
    const userBedOrBesValue = +10
    const userBedOrBesStatus = userBedOrBesValue > 0 ? "بس 😂" : userBedOrBesValue < 0 ? "بد ☹️" : "تسویه 😊"
    // const userBedOrBesColor1 = userBedOrBesValue >= 0 ? "blue" : "red"
    const userBedOrBesColor = userBedOrBesValue > 0 ? "blue" : userBedOrBesValue < 0 ? "red" : "green"
    const Currency = invoice.Currency === "IRT" ? "تومان" : "ريال"
    /*********************************************/


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
                        <input

                            type="text" value={invoice.ContactTitle} disabled={true}/>
                        <span style={{color: userBedOrBesColor, fontWeight: "bold"}}
                              className={"flex"}
                        >
                            <div>تراز:</div>
                            <div className={"ltr"}>&nbsp;{formatNumber(userBedOrBesValue)} &nbsp;</div>
                             <div> {Currency} {userBedOrBesStatus}</div>

                        </span>
                    </div>
                    <div className={'div__group__input_select'}>
                        <label htmlFor="">عنوان مشتری </label>
                        <input
                            onChange={(e) => handleInputChange(e.target.value, 'ContactTitle')}
                            type="text"
                            value={invoice.ContactTitle}
                        />
                    </div>
                    <div className={'div__group__input_select'}>
                        <label htmlFor=""> تاریخ </label>
                        {/*<input className={'ltr'} type="text" value={timestampToTimeFromHesabfa(invoice.Date)} disabled={true}/>*/}

                        <MyDatePicker2
                            value={iso8601ToDateObject(invoice.Date)}
                            onChange={(selectedDate) => changeDateHandler(selectedDate.hesabfaFormatDate, 'Date')}
                        />
                    </div>
                    <div className={'div__group__input_select'}>
                        <label htmlFor=""> تاریخ سر رسید </label>
                        <MyDatePicker2
                            value={iso8601ToDateObject(invoice.DueDate)}
                            onChange={(selectedDate) => changeDateHandler(selectedDate.hesabfaFormatDate, 'DueDate')}
                        />
                    </div>

                    <ProjectListInBillData/>
                    <div className={'div__group__input_select'}>
                        <label htmlFor="">تگ </label>
                        <input
                            type="text"
                            value={showTagName}
                            disabled={true}
                        />
                    </div>
                    <div className={'div__group__input_select'}>
                        <label htmlFor="">شماره سفارش </label>
                        <input
                            type="text"
                            value={showTicketNumber}
                            disabled={true}
                        />
                    </div>
                    <div className={'div__group__input_select fontSize075rem'}>
                        <a href={`tel:${ContactMobile}`}>
                            <div>شماره تماس مشتری</div>
                            <div>{ContactMobile}</div>
                        </a>

                    </div>

                </div>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default InvoiceData;