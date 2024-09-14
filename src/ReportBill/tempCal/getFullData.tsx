import {changeTextTo, DateToEnglish, getDataFromHesabfaBasedOnFilterState} from "../functions";
import {callData} from "./callData.tsx";
import * as XLSX from 'xlsx';
import {saveAs} from 'file-saver';


export const getFullData = async (
    {myAxios, filterItems}
) => {
    const resultOfGetFactorList = await getDataFromHesabfaBasedOnFilterState(filterItems, myAxios);


    const resultData: any[] = resultOfGetFactorList.data.data.List;

    const temp = []

    resultData.forEach(rrr => {


        const contactLastName = rrr.Contact.LastName
        const contactName = rrr.Contact.Name
        const contactMobile = rrr.Contact.Mobile

        const row = {...rrr, contactMobile, contactName, contactLastName}
        const contactTitle = row.ContactTitle;

        callData.forEach(singleRowOfCallData => {
            const callDataLastName = singleRowOfCallData.lastName
            const callDataMobile = singleRowOfCallData.mobile
            const cityNameInCall = singleRowOfCallData.city

            const contactLastNameCheck = contactLastName.includes(callDataLastName)
            // const contactNameCheck = contactName.includes(singleRowOfCallData.name)
            const contactMobileCheck = contactMobile.includes(callDataMobile)
            const isCityInContactName = contactName.includes(cityNameInCall)
            if (contactLastNameCheck && isCityInContactName /*&& callDataLastName !== "" && contactLastName !== ""*/) {
                temp.push({
                    contactLastName,
                    sameAs: "نام خانوادگی",
                    ...row,
                    contactName,
                    callDataLastName,
                    callDataMobile,
                    contactTitle,
                    cityNameInCall
                })
            }


            if (contactMobileCheck && isCityInContactName) {
                temp.push({
                    sameAs: "شماره تماس",
                    ...row,
                    contactName,
                    contactLastName,
                    callDataLastName,
                    callDataMobile,
                    contactTitle,
                })
            }


        })
    })
    const headersSheet = [
        {title: "اشتراک از", key: "sameAs"},
        {title: "شماره فاکتور", key: "Number"},
        {title: "تاریخ", key: "Date", task: DateToEnglish},
        {title: "شماره مشتری", key: "contactMobile"},
        {title: "شماره در تماس ها", key: "callDataMobile"},
        {title: "شهر در تماس ها", key: "cityNameInCall"},
        {title: "نام مشتری", key: "contactName"},
        {title: "نام خانوادگی شخص", key: "contactLastName"},
        {title: "نام خانوادگی در تماس ها", key: "callDataLastName"},
        {title: "کد شخص", key: "ContactCode"},
        {title: "عنوان سفارش", key: "ContactTitle"},
        // {title: "کد کالا", key: "ItemCode"},
        // {title: "کالا", key: "ItemName"},
        // {title: "شرح", key: "Description"},
        // {title: "واحد", key: "Unit"},
        // {title: "تعداد", key: "Quantity"},
        // {title: "مبلغ واحد", key: "UnitPrice"},
        // {title: "تخفیف", key: "Discount"},
        // {title: "مالیات", key: "Tax"},
        // {title: "مبلغ کل", key: "TotalAmount"},
        // {title: "واحد پول", key: "myCurrency"},
        {title: "وضعیت", key: "myStatus", task: changeTextTo},
    ]


    const formattedData = temp.map((item) => {
        const newItem: { [key: string]: any } = {};
        headersSheet.forEach((header) => {
            newItem[header.title] = header.task ? header.task((item)[header.key]) : (item)[header.key];
        });
        return newItem;
    });


    // Convert the matched data (temp) to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Matched Data");

    // Generate a Blob object from the workbook
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});

    // Use FileSaver to save the Blob as a file
    saveAs(blob, 'Matched_Data.xlsx');


}