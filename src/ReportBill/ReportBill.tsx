import React, {useEffect} from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import {getBillList} from "../config/api.tsx";
import {
    timestampToFormattedDateToSendHesabfa,
    timestampToTimeFromHesabfa
} from "../utils/utilsFunction.tsx";
import {excelExportForHesabfa} from "../utils/excelExport.tsx";
import {toast} from "react-toastify";
import {p2e} from "../utils/NumericFunction.tsx";
import TableSection from "./TableSection.tsx";
import {ReportBillContext} from "./ReportBillContext.tsx"
import useObjectDataHolder from "../hooks/UseObjectDataHolder.tsx";
import {IAwesomeData} from "./myTypes.tsx";
import {columns, data as tableDataForTest} from "../Components/ReactTableDataShow/SampleTableData.tsx"
import Num2persian from 'num2persian';
import ToggleSwitch from "../Components/UI/ToggleSwitch/ToggleSwitch.tsx";
import { makeRowIdBasedOnPageNumber} from "./functions.tsx";


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



    const [awesomeData, setAwesomeData] = useObjectDataHolder<IAwesomeData>({
        columns: columns,
        numberOfRowsShowInTable: 5,
        totalPages: 0,
        tableHeaders: [],
        tableData: [],
        totalData: [],
        reload: "",
        TotalCount: 10000000,
        FilteredCount: 10000,
        currentSelectedPage: 1,
        filterItems:[],
    });

    // useEffect(() => {
    //     void updateTableData();
    // }, []);

    const updateTableData = async () => {
        const skipFromTheFirst = (awesomeData.currentSelectedPage - 1) * awesomeData.numberOfRowsShowInTable;
        const TakeNumberOfData = awesomeData.numberOfRowsShowInTable
        const queryInfo = {
            SortBy: 'Date',
            SortDesc: true,
            Take: TakeNumberOfData,
            Skip: skipFromTheFirst,
            filters: awesomeData.filterItems
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
            const TotalCount = resultOfGetFactorList.data.data.TotalCount
            const FilteredCount = resultOfGetFactorList.data.data.FilteredCount
            const temp = listOfData.map((row:any) => {
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
                // totalData: temp,
                tableData: temp,
                TotalCount,
                FilteredCount
            }
        } else {
            return undefined
        }
    }




    useEffect(() => {

        void updateTableData().then(result => {

            if (!result) {
                return
            }

            setAwesomeData({
                tableData: makeRowIdBasedOnPageNumber({
                    tableData: result.tableData,
                    currentPageNumber: awesomeData.currentSelectedPage,
                    totalRowsInPage: awesomeData.numberOfRowsShowInTable,
                }),
                TotalCount: result.TotalCount,
                FilteredCount: result.FilteredCount,
            })

            // Calculate the start and end indices for the current page
            // const startIndex = (awesomeData.currentSelectedPage - 1) * awesomeData.numberOfRowsShowInTable;
            // const endIndex = startIndex + awesomeData.numberOfRowsShowInTable;
            // const tableData = result.slice(startIndex, endIndex);
            // if (tableData.length >= endIndex - startIndex) {
            //     setAwesomeData({tableData})
            // }


        })
    }, [ awesomeData.numberOfRowsShowInTable, awesomeData.currentSelectedPage, awesomeData.reload,
    awesomeData.filterItems]);


    const handleCheckToggle = (checkStatus: boolean) => {
        let newFilter: any[];

        if (checkStatus) {
            // Add the "Status" filter with value "1"
            newFilter = [
                ...awesomeData.filterItems,
                {
                    "property": "Status",
                    "operator": "=",
                    "value": 1
                }
            ];
        } else {
            // Remove the "Status" filter
            newFilter = awesomeData.filterItems.filter((filter: any) => filter.property !== "Status");
        }

        setAwesomeData({
            filterItems: newFilter,
            currentSelectedPage: 1,
        });
    };


    try {
        return (
            <div>
                <ReportBillContext.Provider value={{awesomeData, setAwesomeData}}>
                    <ToggleSwitch checkedText={"      تایید"}
                                  unCheckedText={"همه"}
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
                    <TableSection/>
                </ReportBillContext.Provider>
            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default ReportBill;
