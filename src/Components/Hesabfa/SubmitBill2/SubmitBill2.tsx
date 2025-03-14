import React, {useEffect} from 'react';
import {SubmitBillProvider} from "./submitBillContext";
import GetSubmitBillData from "./GetSubmitBillData.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth.tsx";
import DateObject from "react-date-object";
import {dateObjectToIso8601} from "../../../utils/utilsFunction.tsx";
import ShowProductListForSelect from "./components/ShowProductListForSelect.tsx";
import TwoTopButtons from "./components/TwoTopButtons.tsx";
import InvoiceData from "./components/InvoiceData.tsx";
import InvoiceTable from "./components/InvoiceTable.tsx";
import "./InvoiceTableItems.scss"
import {ROLES} from "../../../Pages/ROLES.tsx";


const SubmitBill2 = () => {

    const {auth} = useAuth();

    const myLocation = useLocation();
    const myStateData = myLocation?.state?.data;


    const componentInfo = {
        billType: myStateData?.billType, // it is in ticket Or in the ticketReply
        ticketId: myStateData?.ticketId,
        id: myStateData?.id,
        billNumber: myStateData?.billNumber || "", // if its empty  it is on Edit Mode
        ContactCode: myStateData?.contactCode, // if its empty  it is on Edit Mode
        ContactName: myStateData?.contactName || "", // if its empty  it is on Edit Mode
        backUrl: myStateData?.backUrl|| -1,
        ticketNumber:myStateData?.ticketNumber ?? "ندارد",
        titleOfOrder:myStateData?.title ?? "ندارد",
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
        ContactTitle: componentInfo.titleOfOrder, // عنوان مشتری در فرم ثبت سفارش
        Reference: '',
        Date: todayIsoDate,//
        DueDate: todayIsoDate,//
        ContactCode: componentInfo.ContactCode,
        Note: '',
        InvoiceType: 0,
        Status: 0, // پیش نویس
        Tag: "", // تگ
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
        invoice,
        billNumber: componentInfo.billNumber || undefined,
        billData: componentInfo,
    }

    const roleAccessList = auth.userInfo?.roleAccessList
    const canSaveFactorAsDraft = roleAccessList.includes(ROLES.saveBillAsDraft[0])
    const canSaveFactorAsDone = roleAccessList.includes(ROLES.saveBillAsDone[0])
    const canShowProductList = canSaveFactorAsDone || canSaveFactorAsDraft

    return (
        <SubmitBillProvider initialData={initial}>

            <GetSubmitBillData>
                <div className={`myResponsiveWidthMenuOpen `}>
                    {canShowProductList && <div className={"flex flex-wrap  w-full mb-3"}>
                        <div className={"flex-grow min__width__200"}>
                            {/*<ShowProductListForSelect/>*/}
                        </div>
                        <div className={"flex items-center"}>
                            <div className={"sm:mx-2"}>
                                <TwoTopButtons/>
                            </div>
                        </div>
                    </div>}
                    <InvoiceData/>
                    <InvoiceTable/>



                </div>
            </GetSubmitBillData>
        </SubmitBillProvider>
    );
};

export default SubmitBill2;