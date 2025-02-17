import React, {useContext} from 'react';
import {excelExport, excelExportForHesabfa} from "../../../utils/excelExport.tsx";
import {TableGContext} from "../../TableG/TableGContext.tsx";
import useAuth from "../../../hooks/useAuth.tsx";
import {changeTextTo, changeTextToTagSn, DateToEnglish} from "../../../ReportBill/functions.tsx";
import {timestampToTimeFromHesabfa} from "../../../utils/utilsFunction.tsx";
import {p2e} from "../../../utils/NumericFunction.tsx";
import {RiFileExcel2Line} from "react-icons/ri";

const DownloadExcelTable = () => {
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    const {auth} = useAuth()
    const userName = (auth?.userInfo?.userData?.name ?? "") + " " + (auth?.userInfo?.userData?.familyName ?? "")


    const data = myData.tableData;
    const newData = data.map(row=>{


        return {
            ...row,
            Name:row?.Contact?.Name,
            City:row?.Contact?.City,
            State:row?.Contact?.State,
            Mobile:row?.Contact?.Mobile,



        }
    })

    const handleDownload = () => {

        const headers = [
            {title: "عنوان مشتری", key: "ContactTitle"},
            {title: "نام مشتری", key: "Name"},
            {title: "شهر مشتری", key: "City"},
            {title: "استان مشتری", key: "State"},
            {title: "شماره تماس مشتری", key: "Mobile"},
            {title: "شماره فاکتور", key: "Number"},
            {title: "فروشنده", key: "n"},
            {title: "کد مشتری", key: "ContactCode"},
            {title: "واحد پولی", key: "Currency"},
            {title: "تاریخ ", key: "Date", task: DateToEnglish},
            {title: "سر رسید ", key: "DueDate", task: DateToEnglish},
            {title: "جمع کل", key: "Sum"},
            {title: "وضعیت", key: "Status", task: changeTextTo},
            {title: "وضعیت سفارش", key: "Status", task: changeTextToTagSn},
            {title: "توضیحات", key: "des",},
            {title: "تاریخ بسته بندی", key: "db",},
        ]

        excelExport({
            data: newData,
            headers,
            fileName: "file.xlsx",
        })
    }
    return (
        <div>
            <div>
                <button
                    className={"px-2"}
                    onClick={handleDownload}
                    title={"دانلود اکسل Excel"}
                >
                    <RiFileExcel2Line className={"text-green-600"} size={25} />
                </button>
            </div>
        </div>
    );
};

export default DownloadExcelTable;