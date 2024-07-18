import React from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import {getBillList} from "../config/api.tsx";
import {timestampToFormattedDateToSendHesabfa, timestampToTimeFromHesabfa} from "../utils/utilsFunction.tsx";
import {excelExport} from "../utils/excelExport.tsx";
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
        const normalizeData = resultOfGetFactorList.data.data.List;

        const DateToEnglish = (inputText: any) => {
            let result = timestampToTimeFromHesabfa(inputText)
            result =p2e(result);
            return result
        }

        const headers = [
            {title: "شماره فاکتور", key: "Number"},
            {title: "فروشنده", key: "Tag"},
            {title: "کد مشتری", key: "ContactCode"},
            {title: "واحد پولی", key: "Currency"},
            {title: "تاریخ ", key: "Date", task: DateToEnglish},
            {title: "سر رسید ", key: "DueDate"},
            {title: "سر رسید ", key: "DueDate"},
            {title: "جمع کل", key: "Sum"},
            {title: "وضعیت", key: "Status"},
        ]
        excelExport({data: normalizeData, fileName, headers})


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
