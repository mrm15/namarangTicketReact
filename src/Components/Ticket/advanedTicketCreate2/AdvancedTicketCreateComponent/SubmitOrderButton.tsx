import React from 'react';
import {useAdvancedTicketContext} from "../AdvancedTicketContext.tsx";
import {toast} from "react-hot-toast";

const SubmitOrderButton = () => {
    const {data, setData} = useAdvancedTicketContext()

    const handleSubmit = () => {
        console.log(data)

        if (!data.senderUserId) {
            toast.error("لطفا یک مشتری انتخاب کنید.")
            return
        }
        if (!data.title) {
            toast.error("عنوان را وارد کنید.")
            return
        }
        if (!data.description) {
            toast.error("عنوان را وارد کنید.")
            return
        }
        if (data.files.length === 0) {
            toast.error("فایل نهایی را بارگزاری کنید.")
            return
        }
        if (data.screenShot.length === 0) {
            toast.error("اسکرین شات شفارش را بارگزاری کنید.")
            return
        }
        const shotNames = data.screenShot.map(file => {
            return file?.name + ","
        })

        const yes = confirm(`
          نام مشتری: ${data.senderUserData}        
------------------------------------------------------------------------  
        عنوان:   ${data?.title}
------------------------------------------------------------------------
        توضیحات:   ${data?.description}
------------------------------------------------------------------------

        فایل:  ${data.files[0]?.name}
        سایز:  ${data.files[0]?.size}
------------------------------------------------------------------------

        اسکرین شات:  ${shotNames}
------------------------------------------------------------------------
        `)
        if (!yes) return;

        try {
            setData({isSendingRequest: true})
        } catch (error) {
            console.log(error)
        }
        // در این مرحله میریم واسه آپلود فایل ها

        // بعدش آیدی رو میگیرم میزاریم توی متغیر و سایر اطلاعات رو میفرستیم سمت بک ااند
    }
    return (
        <div className={" flex justify-center my-3.5"}>
            <button className={"btn-submit-mir"} onClick={handleSubmit}>
                تایید و ارسال برای فاکتور
            </button>
        </div>
    );
};

export default SubmitOrderButton;