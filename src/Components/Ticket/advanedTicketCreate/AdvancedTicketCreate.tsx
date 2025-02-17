import React, {ChangeEvent, useEffect, useState} from 'react';
import './style.scss';
import {FaPlus, FaTrash} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {uploadFileUtil} from "../../../utils/upload.tsx";
import useAxiosPrivateFormData from "../../../hooks/useAxiosPrivateFormData.tsx";
import {AxiosResponse} from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {bytesToMegabytes, handleDragOver} from "../../../utils/utilsFunction.tsx";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import {useNavigate} from "react-router-dom";
import {PAGES} from "../../../Pages/Route-string.tsx";
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder.tsx";
import LittleSpinner from "../../Loader/LittleSpinner.tsx";
import SelectSenderUser from "./SelectSenderUser.tsx";
import FormInputs from "./FormInputs/FormInputs.tsx";

const getSettingsRequestUrl = 'adminSettings/getSafeAdminSettings';
const getDestinationRequestUrl = '/department/userList';
const AdvancedTicketCreate: React.FC = () => {

    const [ticketData, setTicketData] = useObjectDataHolder<any>({
        // عنوان سفارش
        title: '',
        // توضیحات سفارش
        description: '',
        // فایل نهایی یا فایل های نهایی
        files: [new File([], 'کلیک کنید +   بکشید و رها کنید')],
        // فایل رو کی فرستاده و قراره توی پنل کی نشون بدیم که این فایل مال تو بوده ینی فرستنده فایل
        senderUserId: '',
        senderUserData:"",
        // لیست کاربران
        userList: [],
        // ماکزیمم فایل سایزی که میشه آپلود کرد.
        maxFileSize: 0,
        // فایل های شات
        screenShot:[],
        // آیا پروسه داره آپلود میشه؟

        isSendingRequest: false,
    });









    const myAxiosPrivate = useAxiosPrivate()


    const getSettingsQueryFn = () => {
        return myAxiosPrivate.get(getSettingsRequestUrl)
    }
    const adminSettingsQuery = useQuery({
        queryKey: ['getSettingsCreateTicket'],
        queryFn: getSettingsQueryFn,
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: true,
    })

    const isShowSendTicketToUserSection = adminSettingsQuery?.data?.data?.adminSettingData?.showUsersListInSendTicketForm;

    // Update the state when data is fetched successfully
    useEffect(() => {
        if (!adminSettingsQuery.isLoading && !adminSettingsQuery.error) {
            const destinationDepartmentId = adminSettingsQuery?.data?.data?.adminSettingData?.firstDestinationForTickets;
            const maxFileSize = adminSettingsQuery?.data?.data?.adminSettingData?.maxFileSize;


            //setTicketData({...ticketData, destinationDepartmentId: destinationDepartmentId});
            //const result = await myAxiosPrivate.get(getDestinationRequestUrl + `/${destinationDepartmentId}`)
            const isShowSendTicketToUserSection = adminSettingsQuery?.data?.data?.adminSettingData?.showUsersListInSendTicketForm;
            if (isShowSendTicketToUserSection) {
                void myAxiosPrivate.get(getDestinationRequestUrl + `/${destinationDepartmentId}`).then(res => {
                    const userList = res?.data?.userList || [];
                    setTicketData({...ticketData, userList, destinationDepartmentId, maxFileSize})
                })
            } else {
                setTicketData({...ticketData, destinationDepartmentId, maxFileSize})
            }


        }
    }, [adminSettingsQuery.isLoading, adminSettingsQuery.error, adminSettingsQuery?.data?.data?.adminSettingData?.firstDestinationForTickets]);

    // @ts-ignore
    const {auth} = useAuth();
    const hasAccessToSubmitFactorInSubmitOrderForm = auth?.userInfo?.roleAccessList?.includes(ROLES.submitBillInSubmitOrderForm[0])
    try {
        return (
            <div>
                <div>
                    -----------------------------------------------------------
                    <FormInputs
                        ticketData={ticketData}
                        setTicketData={setTicketData}
                    />
                    -----------------------------------------------------------

                </div>
                <pre className={" w-full fontFamilyIranSans shadow p-6 text-center"}>
                    باید برای هر تیکت وضعیت  بزارم  _ که بچه ها توی چت لیست تغییرش بدن
                    <br/>
                    بعدش باید برای هر چت لیست وضعیت پیام رو بزارم که هر پیام بتونه یه وضعیت بگیره که سیستم شات رو خودکار کنم.
                    <br/>
                    بعدش هم میام اینجا
                    هنگام  ثبت سفارش اسکرین شات رو میگیرم.  وضعیت رو میزارم اسکرین شات
                    توضیحات رو میگیرم وضعیت رو میزارم توضیحات
                    و بعدش میفرستم واسه فاکتور که اونجا بره فاکتورش رو بزننن
                </pre>

            </div>
        );
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default AdvancedTicketCreate;
