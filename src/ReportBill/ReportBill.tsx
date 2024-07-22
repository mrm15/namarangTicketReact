import React, {useEffect} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import {getBillList} from "../config/api.tsx";
import {
    addRowIdtoTable,
    timestampToFormattedDateToSendHesabfa,
    timestampToTimeFromHesabfa
} from "../utils/utilsFunction.tsx";
import {excelExportForHesabfa} from "../utils/excelExport.tsx";
import {toast} from "react-toastify";
import {p2e} from "../utils/NumericFunction.tsx";
import FilterSection from "./FilterSection.tsx";
import TableSection from "./TableSection.tsx";
import {ReportBillContext} from "./ReportBillContext.tsx"
import useObjectDataHolder from "../hooks/UseObjectDataHolder.tsx";
import {IAwesomeData} from "./myTypes.tsx";
import {columns, data as tableDataForTest} from "../Components/ReactTableDataShow/SampleTableData.tsx"
import Num2persian from 'num2persian';
import ToggleSwitch from "../Components/UI/ToggleSwitch/ToggleSwitch.tsx";
import {makeRowIdBasedOnPageNumber} from "./functions.tsx";


type times = "today" | "thisMonth" | "all"
const ReportBill = () => {


    const myAxios = useAxiosPrivate();
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
                    },
                    {
                        "property": "Status",
                        "operator": "=",
                        "value": "1"
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


    const filterStatus = [
        {
            "property": "Date",
            "operator": "=",
            "value": timestampToFormattedDateToSendHesabfa(new Date())
        },
        {
            "property": "Status",
            "operator": "=",
            "value": "0"
        }

    ]
    const [awesomeData, setAwesomeData] = useObjectDataHolder<IAwesomeData>({
        filterStatus,
        columns: columns,
        numberOfRowsShowInTable: 5,
        totalPages: 0,
        tableHeaders: [],
        tableData: [],
        totalData: [],
        reload: "",
        TotalCount: 504,
        FilteredCount: 135,
        currentSelectedPage: 1,
    });

    // useEffect(() => {
    //     void UpdateTableData();
    // }, []);
    const UpdateTableData = async () => {
        const skipFromTheFirst = (awesomeData.currentSelectedPage - 1) * awesomeData.numberOfRowsShowInTable;
        const TakeNumberOfData = awesomeData.numberOfRowsShowInTable
        const queryInfo = {
            SortBy: 'Date',
            SortDesc: true,
            Take: TakeNumberOfData,
            Skip: skipFromTheFirst,
            filters: awesomeData.filterStatus
        }


        const data = {queryInfo}
        const tId = toast.loading("در حال به روز رسانی جدول")
        const resultOfGetFactorList = await myAxios.post(getBillList, data)
        toast.dismiss(tId)
        if (resultOfGetFactorList.status === 200) {
            console.log("hi");
            setAwesomeData({totalData: tableDataForTest})


            const List: [{ Sum: number }] = resultOfGetFactorList.data.data.List;
            const totalSum = List.reduce(((accumulator, currentValue) => accumulator + currentValue.Sum), 0)
            console.log("totalSum: ")
            console.log(totalSum.toLocaleString())
            console.log(Num2persian(totalSum));
            // setAwesomeData({totalData:resultOfGetFactorList.data.data.List})
            const listOfData = resultOfGetFactorList.data.data.List
            const temp = listOfData.map(row => {
                try {
                    const myTag = JSON.parse(row.Tag)
                    if (myTag) {
                        return {
                            ...row,
                            sellerName: myTag.n,
                            orderNumber: myTag.tn
                        }
                    }
                } catch (error) {
                    return row
                }


            })
            return {
                totalData: temp,
                tableData: temp,
            }
        } else {
            return undefined
        }
    }

    useEffect(() => {


        // toast.info("افکت در حال بارگزاری...")
        //
        //
        // // Calculate the start and end indices for the current page
        // const startIndex = (awesomeData.currentSelectedPage - 1) * awesomeData.numberOfRowsShowInTable;
        // const endIndex = startIndex + awesomeData.numberOfRowsShowInTable;
        // const tableData = awesomeData.totalData.slice(startIndex, endIndex);
        // if (tableData.length >= endIndex - startIndex) {
        //     setAwesomeData({tableData})
        // } else {
        //     void UpdateTableData()
        // }


        void UpdateTableData().then(result => {

            if (!result) {
                return
            }

            setAwesomeData({tableData: makeRowIdBasedOnPageNumber({
                    tableData:result.tableData,
                    currentPageNumber:awesomeData.currentSelectedPage,
                    totalRowsInPage:awesomeData.numberOfRowsShowInTable,
                })})

            // Calculate the start and end indices for the current page
            const startIndex = (awesomeData.currentSelectedPage - 1) * awesomeData.numberOfRowsShowInTable;
            // const endIndex = startIndex + awesomeData.numberOfRowsShowInTable;
            // const tableData = result.slice(startIndex, endIndex);
            // if (tableData.length >= endIndex - startIndex) {
            //     setAwesomeData({tableData})
            // }

        })
    }, [awesomeData.numberOfRowsShowInTable, awesomeData.currentSelectedPage, setAwesomeData, awesomeData.filterStatus, myAxios]);


    const handleCheckToggle = (checkStatus: boolean) => {
        // {
        //     "property": "Status",
        //     "operator": "=",
        //     "value": 1
        // }
        const newValue = checkStatus ? 1 : 0;
        const newFilter = awesomeData.filterStatus.map((filter: any) =>
            filter.property === "Status" ? {...filter, value: newValue} : filter
        );
        setAwesomeData({filterStatus: newFilter})

    }
    try {
        return (
            <div>
                <ReportBillContext.Provider value={{awesomeData, setAwesomeData}}>
                    <ToggleSwitch checkedText={"      تایید"}
                                  unCheckedText={"پیش"}
                                  onChange={handleCheckToggle}
                    />
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
                    <FilterSection/>
                    <TableSection/>
                </ReportBillContext.Provider>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default ReportBill;
