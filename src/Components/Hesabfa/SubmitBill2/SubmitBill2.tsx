import React, {useEffect} from 'react';
import {SubmitBillProvider} from "./submitBillContext";
import GetSubmitBillData from "./GetSubmitBillData.tsx";
import {useLocation} from "react-router-dom";
import useAuth from "../../../hooks/useAuth.tsx";
import DateObject from "react-date-object";
import {dateObjectToIso8601} from "../../../utils/utilsFunction.tsx";
import {IInvoiceItem, IOther} from "./initialDataTypes.tsx";
import ShowProductListForSelect from "./components/ShowProductListForSelect.tsx";
import TwoTopButtons from "./components/TwoTopButtons.tsx";
import InvoiceData from "./components/InvoiceData.tsx";
import InvoiceTable from "./components/InvoiceTable.tsx";
import "./InvoiceTableItems.scss"


const SubmitBill2 = () => {

    const {auth} = useAuth();

    const myLocation = useLocation();
    const myStateData = myLocation?.state?.data;
    const myTag = {
        tn: myStateData?.ticketNumber,
        n: auth?.userInfo?.userData?.name // اگه سری اول داره ثبت میکنه که تگ رو کاربر میدم  و اگه  ویرایش بود هم کاربری که این فرم رو باز کرده- اگه توی استثناها بود هم آخرین کاربر
    }

    const componentInfo = {
        billType: myStateData?.billType, // it is in ticket Or in the ticketReply
        ticketId: myStateData?.ticketId,
        id: myStateData?.id,
        billNumber: myStateData.billNumber, // if its empty  it is on Edit Mode
        ContactCode: myStateData?.contactCode, // if its empty  it is on Edit Mode
        ContactName: myStateData?.contactName, // if its empty  it is on Edit Mode
        tag: JSON.stringify(myTag), //
        backUrl: myStateData.backUrl,
    }
    const todayDate = new DateObject();
    todayDate.setHour(0)
    todayDate.setMinute(0)
    todayDate.setSecond(0)
    todayDate.setMillisecond(0)

    const todayIsoDate = dateObjectToIso8601(todayDate)
    const invoice = {
        Contact: {},
        Number: componentInfo.billNumber + "",
        ContactTitle: componentInfo.ContactName, // عنوان مشتری در فرم ثبت سفارش
        Reference: '',
        Date: todayIsoDate,//
        DueDate: todayIsoDate,//
        ContactCode: componentInfo.ContactCode,
        Note: '',
        InvoiceType: 0,
        Status: 0, // پیش نویس
        Tag: componentInfo.tag, // تگ
        InvoiceItems: [],
        Others: [],
        Currency: "IRT",
        TaxId: "",
        CurrencyRate: 1.0000000000,
        Project: "",
        Sum: 0,

    }

    const initial = {
        productList: [],
        projectList: [],
        invoice,
        billNumber: componentInfo.billNumber || undefined,
        billData: componentInfo,
    }


    return (
        <SubmitBillProvider initialData={initial}>

            <div className={"myResponsiveWidthMenuOpen bg-amber-300"}>
                <GetSubmitBillData/>
                <div className={"flex"}>
                    <ShowProductListForSelect/>
                    <TwoTopButtons/>
                </div>

                <InvoiceData/>
                <InvoiceTable />


            </div>
        </SubmitBillProvider>
    );
};

export default SubmitBill2;