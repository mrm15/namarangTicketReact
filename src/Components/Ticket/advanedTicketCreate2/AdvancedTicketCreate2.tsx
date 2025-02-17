import React from 'react';
import {AdvancedTicketContextProvider} from "./AdvancedTicketContext";
import AdvancedTicketCreateComponent from "./AdvancedTicketCreateComponent/AdvancedTicketCreateComponent";

const AdvancedTicketCreate2 = () => {


    const initialDataAdvancedTicketCreate2 = {
        // عنوان سفارش
        title: '',
        // توضیحات سفارش
        description: '',
        // فایل نهایی یا فایل های نهایی
        files: [],
        // فایل رو کی فرستاده و قراره توی پنل کی نشون بدیم که این فایل مال تو بوده ینی فرستنده فایل
        senderUserId: '',
        senderUserData: "",
        // لیست کاربران
        userList: [],
        // ماکزیمم فایل سایزی که میشه آپلود کرد.
        maxFileSize: 0,
        // فایل های شات
        screenShot: [],
        // آیا پروسه داره آپلود میشه؟
        isSendingRequest: false,
    }


    return (
        <AdvancedTicketContextProvider initialData={initialDataAdvancedTicketCreate2}>
            <AdvancedTicketCreateComponent/>
        </AdvancedTicketContextProvider>
    );


};

export default AdvancedTicketCreate2;