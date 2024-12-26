import {randomNumberGenerator, timestampToTimeFromHesabfa} from "../utils/utilsFunction.tsx";
import {p2e} from "../utils/NumericFunction.tsx";
import {toast} from "react-toastify";
import {getBillList} from "../config/api.tsx";
import {billStatusText} from "../Components/CONSTANTS/billStatusText.tsx";

interface inputTypes {
    tableData: any[];
    currentPageNumber: number;
    totalRowsInPage: number;
}

export const DateToEnglish = (inputText: any) => {
    let result = timestampToTimeFromHesabfa(inputText)
    result = p2e(result);
    return result
}

export const changeTextTo = (inputNumber: any) => {

    return inputNumber === 0 ? "پیشنویس" : "تایید شده"
}
export const changeTextToTagSn = (inputNumber: any) => {

    return billStatusText[inputNumber]
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

export const getHeaderAndRows = (incomeData: any) => {

    const dataSheet1 = incomeData.map((rr: any) => {

        const {City, State, Name, Mobile, Phone,} = rr.Contact

        const row = {...rr, City, State, Name, Mobile, Phone}


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

    //

    //

    const headersSheet1 = [
        ////////////////////////////////
        {title: "عنوان مشتری", key: "ContactTitle"},
        {title: "نام مشتری", key: "Name"},
        {title: "شهر مشتری", key: "City"},
        {title: "استان مشتری", key: "State"},
        {title: "شماره تماس مشتری", key: "Mobile"},
        {title: "شماره تلفن مشتری", key: "Phone"},

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
        const myTotalAmount = row?.TotalAmount

        row?.InvoiceItems.forEach((rowItem: any) => {
            dataSheet2.push({
                // ...row,
                // ...rowItem,
                myNumber: row.Number,
                myDate: row.Date,
                myContactCode,
                myContactName,
                myContactTitle,
                myItemCode: rowItem?.Item?.Code,
                myItemName: rowItem?.Item?.Name,
                myDescription: rowItem?.Description,
                myUnit: rowItem?.Unit,
                myQuantity: rowItem?.Quantity,
                myUnitPrice: rowItem?.UnitPrice,
                myDiscount: rowItem?.Discount,
                mySeller,
                myTicketNumber,
                myTax: rowItem?.Tax,
                myTotalAmount: rowItem?.TotalAmount, // اینحا ما جمع مربوط به همون آیتم رو فقط لازم داریم. نه جمع کل
                myStatus: row.Status,
                myCurrency: row.Currency,
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
        {title: "شرح", key: "myDescription"},
        {title: "واحد", key: "myUnit"},
        {title: "تعداد", key: "myQuantity"},
        {title: "مبلغ واحد", key: "myUnitPrice"},
        {title: "تخفیف", key: "myDiscount"},
        {title: "فروشنده", key: "mySeller"},
        {title: "شماره سفارش", key: "myTicketNumber"},
        {title: "مالیات", key: "Tax"},
        {title: "مبلغ کل", key: "TotalAmount"},
        {title: "واحد پول", key: "myCurrency"},
        {title: "وضعیت", key: "myStatus"},
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

export const getDataFromHesabfaBasedOnFilterState = async (filterItems, myAxios) => {

    const queryInfo = {
        SortBy: 'Date',
        SortDesc: true,
        Take: 1500,
        Skip: 0,
        filters: filterItems
    }


    const data = {queryInfo}
    const tId = toast.loading("در حال دریافت اطلاعات...")
    const resultOfGetFactorList = await myAxios.post(getBillList, data)
    toast.dismiss(tId)
    return resultOfGetFactorList
}
