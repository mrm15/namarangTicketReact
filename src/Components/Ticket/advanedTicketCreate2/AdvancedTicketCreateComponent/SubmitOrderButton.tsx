import React from 'react';
import {useAdvancedTicketContext} from "../AdvancedTicketContext.tsx";
import {toast} from "react-hot-toast";
import useAxiosPrivateFormData from "../../../../hooks/useAxiosPrivateFormData.tsx";
import {AxiosResponse} from "axios";
import {uploadFileUtil} from "../../../../utils/upload.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {initialDataAdvancedTicketCreate2} from "../AdvancedTicketTypes.tsx";

const sendUrl = "/ticket/createAdvanced";

const SubmitOrderButton = () => {
    const {data, setData} = useAdvancedTicketContext();
    const myAxiosPrivateFormData = useAxiosPrivateFormData();
    const myAxios = useAxiosPrivate();

    const handleSubmit = async () => {
        console.log(data);
        const myData = {...data};

        // Validate required fields
        if (!myData.senderUserId) {
            toast.error("لطفا یک مشتری انتخاب کنید.");
            return;
        }
        if (!myData.title) {
            toast.error("عنوان را وارد کنید.");
            return;
        }
        if (!myData.description) {
            toast.error("توضیحات را وارد کنید.");
            return;
        }
        if (myData.files.length === 0) {
            toast.error("فایل نهایی را بارگزاری کنید.");
            return;
        }
        if (myData.files.length > 1) {
            toast.error("فقط یه فایل به عنوان فایل نهایی قرار دهید.");
            return;
        }
        if (myData.screenShot.length === 0) {
            toast.error("اسکرین شات سفارش را بارگزاری کنید.");
            return;
        }

        // Prepare screenshot file names for confirmation
        const shotNames = myData.screenShot.map(file => file?.name + ",");
        const confirmMessage = `
      نام مشتری: ${myData.senderUserData}        
------------------------------------------------------------------------  
      عنوان:   ${myData.title}
------------------------------------------------------------------------
      توضیحات:   ${myData.description}
------------------------------------------------------------------------
      فایل:  ${myData.files[0]?.name}
      سایز:  ${myData.files[0]?.size}
------------------------------------------------------------------------
      اسکرین شات:  ${shotNames}
------------------------------------------------------------------------
    `;
        if (!confirm(confirmMessage)) return;

        const tempScreenShotUploads: string[] = [];
        const tempFileUpload: string[] = [];
        let loadingId;

        try {
            setData({isSendingRequest: true});
            loadingId = toast.loading("در حال بارگزاری فایل ها...");

            // Upload screenshots
            for (const shotFile of myData.screenShot) {
                try {
                    const response: AxiosResponse<any> | null = await uploadFileUtil(
                        shotFile,
                        "screenShotFromAdvancedTicket",
                        myAxiosPrivateFormData
                    );
                    if (response && response.status === 200) {
                        const fileId: string | undefined = response.data?.id;
                        if (fileId) {
                            tempScreenShotUploads.push(fileId);
                        } else {
                            toast("شناسه اسکرین شات تعریف نشده");
                            return;
                        }
                    } else {
                        toast("خطا در بارگزاری شات");
                        return;
                    }
                } catch (error) {
                    toast("خطا در بارگزاری شات ----2");
                    return;
                }
            }

            // Upload main file
            try {
                const mainFile = myData.files[0];
                const response: AxiosResponse<any> | null = await uploadFileUtil(
                    mainFile,
                    "mainFileFromAdvancedTicket",
                    myAxiosPrivateFormData
                );
                if (response && response.status === 200) {
                    const fileId: string | undefined = response.data?.id;
                    if (fileId) {
                        tempFileUpload.push(fileId);
                    } else {
                        toast("شناسه فایل نهایی تعریف نشده");
                        return;
                    }
                } else {
                    toast("خطا در بارگزاری فایل نهایی");
                    return;
                }
            } catch (error) {
                toast("خطا در بارگزاری فایل نهایی----2");
                return;
            }

            toast.dismiss(loadingId);
            console.log(tempScreenShotUploads, tempFileUpload);

            // Submit order with file upload IDs
            const submitLoadingId = toast.loading("در حال ثبت سفارش...");
            myData.filesUploadId = tempFileUpload;
            myData.screenShotUploadId = tempScreenShotUploads;
            const {senderUserData, files, screenShot, ...restObject} = myData;
            const result = await myAxios.post(sendUrl, {myData: restObject});
            toast.dismiss(submitLoadingId);

            if (result.status === 200) {
                toast.success(result.data?.message || "اطلاعات ثبت شد");
                setData(initialDataAdvancedTicketCreate2);
            } else {
                toast.error(result.data?.message || "اطلاعات ثبت نشد");
            }
        } catch (error) {
            toast.error(error.toString());
            console.log(error);
        }
    };

    const handleReset = () => {

        const yes = confirm(` مطمئن هستی که میخوای کل فرم رو پاک کنی؟؟؟
        
        کل فرم پاک میشه و  باید از اول اطلاعات رو وارد کنی.
        
        `)


        if (!yes) {
            return
        }


        setData(initialDataAdvancedTicketCreate2);
    };

    return (
        <div className="flex justify-center my-3.5">
            <button className="btn-submit-mir" onClick={handleSubmit}>
                تایید و ارسال برای فاکتور
            </button>
            <button className="btn-gay-mir" onClick={handleReset}>
                حذف فرم
            </button>
        </div>
    );
};

export default SubmitOrderButton;
