import {randomNumberGenerator, timestampToTimeFromHesabfa} from "../utils/utilsFunction.tsx";
import {p2e} from "../utils/NumericFunction.tsx";
import {toast} from "react-toastify";
import {getBillList} from "../config/api.tsx";

interface inputTypes {
    tableData: any[];
    currentPageNumber: number;
    totalRowsInPage: number;
}

export const makeRowIdBasedOnPageNumber = ({
                                               tableData, currentPageNumber,
                                               totalRowsInPage
                                           }) => {
    const table = [...tableData]
    // const startIndex = (totalRowsInPage * currentPageNumber) - totalRowsInPage
    const startIndex = totalRowsInPage * (currentPageNumber - 1)
    table.forEach((row, index) => {
        row.RowId = startIndex + index + 1
    })
    return table
}

export const getHeaderAndRows = (incomeData:any) => {

    const dataSheet1 = incomeData.map((row: { [key: string]: string }) => {

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
        {title: "سر رسید ", key: "DueDate", task: DateToEnglish},
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

        const myContactName = row?.Contact?.Name
        const myContactCode = row.ContactCode
        const myContactTitle = row.ContactTitle

        row?.InvoiceItems.forEach((rowItem: any) => {
            dataSheet2.push({
                ...row,
                ...rowItem,
                myItemCode: rowItem?.Item?.Code,
                myItemName: rowItem?.Item?.Name,
                myTotalAmount : rowItem.TotalAmount,
                myContactName,
                myNumber: row.Number,
                myDate: row.Date,
                myStatus: row.Status,
                myCurrency: row.Currency,
                myContactCode,
                myContactTitle,
                myTicketNumber,
                mySeller,
            })
        })
    })


    const headersSheet2 = [
        {title: "شماره فاکتور", key: "myNumber"},
        {title: "تاریخ", key: "myDate", task: DateToEnglish},
        {title: "کد شخص", key: "myContactCode"},
        {title: "نام شخص", key: "myContactName"},
        {title: "عنوان", key: "myContactTitle"},
        {title: "کد کالا", key: "myItemCode"},
        {title: "کالا", key: "myItemName"},
        {title: "شرح", key: "Description"},
        {title: "واحد", key: "Unit"},
        {title: "تعداد", key: "Quantity"},
        {title: "مبلغ واحد", key: "UnitPrice"},
        {title: "تخفیف", key: "Discount"},
        {title: "فروشنده", key: "mySeller"},
        {title: "شماره سفارش", key: "myTicketNumber"},
        {title: "مالیات", key: "Tax"},
        {title: "مبلغ کل", key: "TotalAmount"},
        {title: "واحد پول", key: "myCurrency"},
    ]

    const fileName = new Date() + "";

    return {
        headersSheet1,
        dataSheet1,
        headersSheet2,
        dataSheet2,
        fileName
    }

}

export const getDataFromHesabfaBasedOnFilterState = async (filterItems,myAxios)=>{

    const queryInfo = {
        SortBy: 'Date',
        SortDesc: true,
        Take: 1000,
        Skip: 0,
        filters: filterItems
    }


    const data = {queryInfo}
    const tId = toast.loading("در حال دریافت اطلاعات...")
    const resultOfGetFactorList = await myAxios.post(getBillList, data)
    toast.dismiss(tId)
    return resultOfGetFactorList
}
