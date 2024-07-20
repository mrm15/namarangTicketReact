import React from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import {getBillList} from "../config/api.tsx";
import {timestampToFormattedDateToSendHesabfa, timestampToTimeFromHesabfa} from "../utils/utilsFunction.tsx";
import {excelExport, excelExportForHesabfa} from "../utils/excelExport.tsx";
import {toast} from "react-toastify";
import {p2e} from "../utils/NumericFunction.tsx";

type times = "today" | "thisMonth" | "all"
const ReportBill = () => {


    const myAxios = useAxiosPrivate()
    const getFactorList = async (times: times) => {

        let queryInfo = {}

        if (times === "today") {
            queryInfo = {
                SortBy: 'Date',
                SortDesc: true,
                Take: 500,
                Skip: 0,
                "filters": [
                    {
                        "property": "Date",
                        "operator": "=",
                        "value": timestampToFormattedDateToSendHesabfa(new Date())
                    }
                ]
            }

        }


        const data = {queryInfo}
        const tId = toast.loading("در حال تهیه اکسل")
        const resultOfGetFactorList = await myAxios.post(getBillList, data);
        toast.dismiss(tId)
        const fileName = new Date() + "";
        const incomeData: [] = resultOfGetFactorList.data.data.List;
        const normalizeData = incomeData.map((row: { [key: string]: string }) => {

            try {
                const tag = JSON.parse(row.Tag)
                return {
                    ...row,
                    ticketNumber: tag.tn,
                    seller: tag.n
                }
            } catch (error) {
                return row
            }
        });


        const DateToEnglish = (inputText: any) => {
            let result = timestampToTimeFromHesabfa(inputText)
            result = p2e(result);
            return result
        }
        //

        const changeTextTo = (inputNumber: any) => {

            return inputNumber === 0 ? "پیشنویس" : "تایید شده"
        }
        //

        const headersSheet1 = [
            ////////////////////////////////
            {title: "شماره فاکتور", key: "Number"},
            {title: "فروشنده", key: "Tag"},
            {title: "کد مشتری", key: "ContactCode"},
            {title: "واحد پولی", key: "Currency"},
            {title: "تاریخ ", key: "Date", task: DateToEnglish},
            {title: "سر رسید ", key: "DueDate"},
            {title: "جمع کل", key: "Sum"},
            {title: "وضعیت", key: "Status", task: changeTextTo},
        ]

        const dataSheet2 = []

        incomeData.forEach((row: any) => {
            let myTicketNumber = ""
            let mySeller = ""
            try {
                myTicketNumber = JSON.parse(row?.Tag)?.tn || "";
                mySeller = JSON.parse(row?.Tag)?.n || "";
            } catch (error) {
                myTicketNumber = ""
                mySeller = ""
            }

            row?.InvoiceItems.forEach(rowItem => {
                dataSheet2.push({
                    ...rowItem,
                    myItemCode: rowItem.Item.Code,
                    myItemName: rowItem.Item.Name,
                    myNumber: row.Number,
                    myDate: row.Date,
                    myStatus: row.Status,
                    myCurrency: row.Currency,
                    myContactCode: row.ContactCode,
                    myContactTitle: row.ContactTitle,
                    myTicketNumber,
                    mySeller,
                })
            })
        })


        const headersSheet2 = [
            {title: "شماره فاکتور", key: "myNumber"},
            {title: "شماره سفارش", key: "myTicketNumber"},
            {title: "فروشنده", key: "mySeller"},
            {title: "تاریخ", key: "myDate", task: DateToEnglish},
            {title: "کد شخص", key: "myContactCode"},
            {title: "نام شخص", key: "myContactTitle"},
            {title: "کد کالا", key: "myItemCode"},
            {title: "کالا", key: "myItemName"},
            {title: "شرح", key: "Description"},
            {title: "واحد", key: "Unit"},
            {title: "تعداد", key: "Quantity"},
            {title: "مبلغ واحد", key: "UnitPrice"},
            {title: "تخفیف", key: "Discount"},
            {title: "مالیات", key: "Tax"},
            {title: "مبلغ کل", key: "TotalAmount"},
            {title: "واحد پول", key: "myCurrency"},
        ]


        excelExportForHesabfa({
            fileName,
            dataSheet1: normalizeData,
            headersSheet1,
            headersSheet2,
            dataSheet2
        })


    }
    try {
        return (
            <div>
                <div className={'text-center bg-gray-300 block rounded p-5 m-1'}> خروجی اکسل از فایل ها</div>

                <div className={'flex flex-wrap gap-2 m-5'}>
                    <button
                        onClick={() => getFactorList("today")}
                        className={'btn-submit-mir'}>
                        دریافت اکسل فاکتور های امروز
                    </button>
                    <button
                        onClick={() => getFactorList("thisMonth")}

                        className={'btn-gay-mir'}>
                        دریافت اکسل فاکتور های این ماه
                    </button>
                    <button
                        onClick={() => getFactorList("all")}

                        className={'btn-submit-mir'}>
                        دریافت اکسل کل فاکتورهای امسال
                    </button>
                </div>

            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default ReportBill;
