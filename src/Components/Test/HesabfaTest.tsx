import React from 'react';
import axios from "axios";
import {
    getBillData,
    getContactData,
    getCustomerList,
    getProductList,
    getProjectList,
    submitBill
} from "../../config/api.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {toast} from "react-toastify";
import UpdateLocalBills from "./UpdateLocalBills.tsx";

const HesabfaTest = () => {


    const myAxiosPrivate = useAxiosPrivate()

    const showToast = (result) => {
        if (result?.data?.message) {
            toast.success(result?.data?.message)
        } else {
            toast.info("نتیجه بازگشت!")

        }
    }
    const handleGetProduct = async () => {
        const result = await myAxiosPrivate.get(getProductList)
        showToast(result)
    }

    const handleGetProjects = async () => {
        const result = await myAxiosPrivate.get(getProjectList)
        showToast(result)
    }
    const handleGetBillData = async (billNumber: string) => {
        const result = await myAxiosPrivate.get(getBillData + billNumber)
        showToast(result)
    }
    const handleGetCustomerList = async () => {
        const result = await myAxiosPrivate.get(getCustomerList)
        showToast(result)
    }
    const testSubmitFactor = async () => {
        const data = {}
        const result = await myAxiosPrivate.post(submitBill, data)
        showToast(result)
    }
    const testGetContactData = async () => {
        const result = await myAxiosPrivate.get(getContactData + 1003)
        showToast(result)
    }

    const syncContactsFromHesabfa = async () => {

        const result111 = confirm("این کار خیلی خطر ناکه مطمئنی میخوای انجام بدی؟")
        if (result111) {
            const result = await myAxiosPrivate.get('hesabfaOpen/saveAllContactsWithPhoneNumber')
            showToast(result)
        }

    }
    const updateProductsFromHesabfaToSite = async () => {

        const result112 = confirm("این کار یه فایلو جا به جا میکنه حواست هست؟")
        if (result112) {
            const result = await myAxiosPrivate.get('hesabfa/saveProductsAsFile')
            showToast(result)
        }


    }
    const sendSmsCurrentReport = async () => {

        const result112 = confirm("این کار یه پیامک میده اوکی؟؟؟")
        if (result112) {
            const result = await myAxiosPrivate.get('reports/todayReportSms')

            showToast(result)
        }


    }

    const sendNotificationTest = async () => {
        //
        const result = await myAxiosPrivate.post('subscribe/test', {data:"15"})
        showToast(result)
    }


    return (

        <div className={"bg-black  rounded overflow-hidden h-screen"}>

            <div className={"bg-black text-red-600 text-center fontSize22 ltr "}>
                دسترسی فقط مدیر کل سایت
            </div>
            <div className={'p-32 font-light flex flex-wrap gap-2 animate-pulse'}>
                <UpdateLocalBills/>
                <div>
                    <button
                        onClick={handleGetProduct}
                        className={'btn-submit-mir'}>
                        تست دریافت کالا
                    </button>
                </div>
                <div>
                    <button
                        onClick={handleGetProjects}
                        className={'btn-submit-mir'}

                    >
                        تست دریافت پروژه ها
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => handleGetBillData("1003")}
                        className={'btn-submit-mir'}

                    >
                        تست دریافت اطلاعات یک فاکتور
                    </button>
                </div>
                <div>
                    <button
                        onClick={handleGetCustomerList}
                        className={'btn-submit-mir'}

                    >
                        تست دریافت لیست مخاطبین
                    </button>
                </div>
                <div>
                    <button
                        onClick={testSubmitFactor}
                        className={'btn-submit-mir'}

                    >
                        ثبت فاکتور تستی
                    </button>
                </div>

                <div>
                    <button
                        onClick={testGetContactData}
                        className={'btn-submit-mir'}

                    >
                        گرفتن دیتای یک مخاطب
                    </button>
                </div>

                <div>
                    <button
                        onClick={syncContactsFromHesabfa}
                        className={'btn-submit-mir'}

                    >
                        همگام سازی مخاطبین
                    </button>
                </div>

                <div>
                    <button
                        onClick={updateProductsFromHesabfaToSite}
                        className={'btn-submit-mir bg-red-900'}

                    >
                        به روز رسانی کالاهای حسابفا و سایت
                    </button>
                </div>


                <div>
                    <button
                        onClick={sendSmsCurrentReport}
                        className={'btn-submit-mir bg-red-900'}
                    >
                        ارسال گزارش مدیریتی
                    </button>
                </div>

                <br/>
                <br/>
                <div>
                    <button
                        onClick={sendNotificationTest}
                        className={'btn-submit-mir bg-red-900'}
                    >
                        تست نوتیفیکشن سایت برای شماره خودم!!
                    </button>
                </div>


            </div>
        </div>
    );
};

export default HesabfaTest;
