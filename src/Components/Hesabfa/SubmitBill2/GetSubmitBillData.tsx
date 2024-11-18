import React, {useEffect} from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";
import {getBillData, getProductList, getProjectList} from "../../../config/api.tsx";

import {useSubmitBillContext} from "./submitBillContext.tsx";
import {detectTag, makeInvoiceBaseOnHesabfaData} from "../SubmitBill/functions.tsx";
import {toast} from "react-toastify";
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";

const GetSubmitBillData = ({children}) => {

    const {auth} = useAuth()
    const {data, setData} = useSubmitBillContext();
    const myAxiosGetCurrentBillData = useAxiosPrivate();
    const queryFnGetBillData = async (url) => {
        const temp = await myAxiosGetCurrentBillData.get(url)
        return temp.data;
    }
    const billDetailsData = useQuery({
        queryKey: ["billDetailsData"],
        queryFn: () => queryFnGetBillData(getBillData + data.billNumber),
        staleTime: 100,  // === 60*60*24*1000
        enabled: Boolean(data.billNumber),
    })

    const myAxios = useAxiosPrivate()
    useEffect(() => {
        const getData = async () => {
            try {
                // اگه بیل نامبر رو فرستاده بود ینی داره ادیت میکنه
                if (data.billNumber) {
                    // const result = await myAxios.get(getBillData + componentInfo.billNumber);


                    const incomingData = billDetailsData?.data
                    if (incomingData) {

                        const myInvoice = makeInvoiceBaseOnHesabfaData(incomingData.data)

                        // اینجا چک کنم ببینم  کاربر من توی دپارتمان های استثنا هست یا نه؟ و تگی که باید بخوره رو پیدا کنم و بزارم
                        const newTag = detectTag({
                            exceptionArray: incomingData?.exceptionArray,
                            auth,
                            lastTag: myInvoice.Tag,
                            ticketNumber: data.billData.ticketNumber
                        })

                        setData({
                            invoice: {...myInvoice, Tag: newTag}
                        })
                    }
                } else {
                    // اینجا باید درخواست بزنم اطلاعات مشتری رو بگیرم که کد داره.
                    // و اونو توی بخش مخاطب بزارم
                    if(data.billData.ContactCode) {
                        const ContactRequest = await myAxios.get("/hesabfa/getContactData/" + data.billData.ContactCode);
                        data.invoice.Contact = ContactRequest.data.data
                    }
                    // اینجا چک کنم ببینم  کاربر من توی دپارتمان های استثنا هست یا نه؟ و تگی که باید بخوره رو پیدا کنم و بزارم
                    const newTag11 = detectTag({
                        exceptionArray: [],
                        auth,
                        lastTag: data.invoice.Tag,
                        ticketNumber: data.billData.ticketNumber
                    })

                    setData({
                        invoice: {...data.invoice, Tag: newTag11}
                    })
                }
            } catch (error) {
                // navigateTo(-1)
                toast.error(" خطا در دریافت فاکتور")
                console.log("خطا در دریافت فاکتور")
                console.log(error?.toString())

            }
        }


        void getData()
    }, [data.billNumber, billDetailsData?.data]);


    let topAlert=<></>
    const roleAccessList = auth.userInfo?.roleAccessList;
    const hasAccessToTestFactor = roleAccessList?.includes(ROLES.submitBillInSubmitOrderForm[0])

    // اگه هیچکدوم از این مقادیر رو نداده بود میتونم براش فاکتور تستی رو باز کنم.
    if(!data.billNumber && !data.invoice.ContactCode){
        topAlert= <div className={"w-full text-center"}>
            <div className={"badge-bg-blue-text-white  "}>
                 محاسبه قیمت فاکتور ویژه مشتری VIP
            </div>
        </div>
    }

    return (
        <div
            className={`bg-white rounded mb-36 ${data?.invoice?.Status === 1 ? " border border-green-600 shadow shadow-green-500" : "border border-red-200"}`}>
            {hasAccessToTestFactor && topAlert}
            {children}
        </div>
    );
};

export default GetSubmitBillData;