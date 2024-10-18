import React, {useEffect} from 'react';
import InvoiceTableItems from "./InvoiceTableItems.tsx";
import {
    addRowIdtoTable,
    formatNumber, getCurrentDate, iso8601ToDateObject,
    persianDateToTimestamp,
    timestampToTimeFromHesabfa
} from "../../../utils/utilsFunction.tsx";
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import OtherCostsInBill from "./OtherCostsInBill.tsx";
import Num2persian from 'num2persian';
import MyDatePicker from "../../MyDatePicker";
import numeric from "../../../utils/NumericFunction.tsx";
import {IProjectList} from "./initialData.tsx";
import contactNumber from "../../TableG/FullTable/findTableColumns/BasteBandiErsal/ContactNumber.tsx";
import MyDatePicker2 from "../../myDatePicker2/MyDatePicker2.tsx";


const BillInvoice = ({
                         invoice,
                         setInvoice,
                         initialBillData,
                     }) => {

    const ContactMobile = invoice?.Contact?.Mobile;
    const onDeleteRow = (id: any) => {
        if (!id) {
            return
        }
        const currentInvoiceItems = [...invoice.InvoiceItems];
        const tempInvoiceItems = currentInvoiceItems.filter(row => row.Id !== id);
        setInvoice({InvoiceItems: addRowIdtoTable(tempInvoiceItems)})
    }


    const factorSum = {
        totalSum: 0,
    }

    // اول بریم سام های هر ردیف رو رتوی فاکتور جمع کنیم
    factorSum.totalSum = invoice.InvoiceItems.reduce((a, b) => {
        return a + b.sum
    }, 0);

    //بعدش بریم بخش آدرز رو چک کنیم ببینیم مقادیری که باید جمع بشه یا کم بشه کدوما هستن و روی جمع کل لحاظ کنیم
    factorSum.totalSum = invoice.Others.reduce((a, other) => {

        if (other.Add) {
            return a + other.Amount
        } else if (other.Add === false) {
            return a - other.Amount
        } else {
            return a;
        }

    }, factorSum.totalSum)

    {
        try {
            factorSum.totalSum = +factorSum?.totalSum?.toFixed(0)
        } catch (error) {
            console.log(error.toString())
            factorSum.totalSum = +factorSum?.totalSum
        }
    }
    const changeDateHandler = (myDate: string, myKey: string) => {
        setInvoice({[myKey]: myDate})
    }
    useEffect(() => {

        // اگه مقدار های تاریخ خالی بودند ینی داره فاکتور صادر میشه و ما باید مقدار تاریخ امروز رو بزاریم
        if (!invoice.Date && !invoice.DueDate) {
            // Get current date in timestamp format
            const formattedCurrentDate = numeric.p2e(new Date().toLocaleDateString('fa-ir'))
            const saveFormatDate = persianDateToTimestamp(formattedCurrentDate)
            const tempData: {
                Date: string | number;
                DueDate: string | number;
            } = {
                Date: '',
                DueDate: '',
            }

            tempData.Date = saveFormatDate;
            tempData.DueDate = saveFormatDate;

            setInvoice({
                Date: tempData.Date,
                DueDate: tempData.DueDate
            })
        }

    }, []);

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

    const userBedOrBesValue = invoice?.Contact?.Credits - invoice?.Contact?.Liability
    const userBedOrBesStatus = userBedOrBesValue >= 0 ? "بس" : "بد"
    const userBedOrBesColor = userBedOrBesValue >= 0 ? "blue" : "red"
    const Currency = invoice.Currency === "IRT" ? "تومان" : "ريال"

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
                            <div className={"ltr"}>{formatNumber(userBedOrBesValue)} </div>
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

                    <div className={'div__group__input_select'}>
                        <label htmlFor="">پروژه</label>
                        <select
                            onChange={(e) => handleInputChange(e.target.value, 'Project')}
                            value={invoice.Project}
                            name="" id="">
                            <option value={''}>انتخاب کنید</option>
                            {initialBillData.projectList.filter((row: IProjectList) => row.Active === true)
                                .map((row: IProjectList, index: React.Key) =>
                                    <option key={index}
                                            value={row.Title}>{row.Title}</option>)}
                        </select>
                    </div>
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
                <div>
                    <div className={'my-3 w-full overflow-scroll'}>
                        <div>
                            <InvoiceTableItems
                                invoice={invoice}
                                setInvoice={setInvoice}
                                invoiceItems={invoice.InvoiceItems}
                                onDeleteRow={onDeleteRow}
                            />
                        </div>
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
                                    <span className={'p-2'}>{formatNumber(factorSum.totalSum?.toFixed(0))} تومان</span>
                                </div>
                                <div>
                                    مبلغ به حروف:
                                    <span className={'p-2'}>{Num2persian(factorSum.totalSum?.toFixed(0))} تومان </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default BillInvoice;
