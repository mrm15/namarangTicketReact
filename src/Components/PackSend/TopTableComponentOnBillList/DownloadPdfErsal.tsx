import React, {useContext} from 'react';
import {generatePDF} from "../../../utils/generatePDF/generatePDF.tsx";
import {TableGContext} from "../../TableG/TableGContext.tsx";
import {billStatusText} from "../../CONSTANTS/billStatusText.tsx";
import useAuth from "../../../hooks/useAuth.tsx";
import {FaRegFilePdf} from "react-icons/fa6";

const DownloadPdfErsal: React.FC = () => {

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    const {auth} = useAuth()
    const userName = (auth?.userInfo?.userData?.name ?? "" ) + " " + (auth?.userInfo?.userData?.familyName ?? "")


    const data= myData.tableData;

    const newData = data
        .map(row => {
            return {
                ...row,
                sn: billStatusText[row.sn],
                contactCode: row?.Contact?.Code,
            };
        })
        .sort((a, b) => {
            if (a.contactCode < b.contactCode) return -1; // مرتب‌سازی صعودی
            if (a.contactCode > b.contactCode) return 1; // مرتب‌سازی صعودی
            return 0; // اگر برابر باشند
        }).map((row,index)=>{
            return {
                ...row,
                rowNumber:index+1,
                Mobile: row.Contact.Mobile
            }
        })

    const columns = [

        { header: 'وضعیت', dataKey: 'sn' },
        { header: 'توضیحات', dataKey: 'des' },
        { header: 'شماره فاکتور', dataKey: 'Number' },
        { header: 'عنوان مشتری', dataKey: 'ContactTitle' },
        { header: 'موبایل', dataKey: 'Mobile' },
        { header: 'ردیف', dataKey: 'rowNumber'},
    ];

    const handleDownload = () => {


        const currentDate = new Date();
        const dateString = +new Date
        const formattedDate = currentDate.toLocaleDateString("fa-IR");
        const formattedTime = currentDate.toLocaleTimeString("fa-IR");
        const title = `پنل کاربری سایت نمارنگ - جدول فاکتورها  
${userName}  تاریخ: ${formattedDate}  ساعت: ${formattedTime}`;
        generatePDF(
            {
                title,
                columns:columns,
                rows:newData,
                fileName : `table-${dateString}.pdf`

            }
           );
    };

    return (
        <div>
            <button
                className={"px-2"}
                title={"دانلود پی دی اف ارسال بار pdf"}
                onClick={handleDownload}>
                <FaRegFilePdf  size={25} className={"text-orange-500"} />
            </button>
        </div>
    );
};

export default DownloadPdfErsal;
