import React from 'react';
import {useAdvancedTicketContext} from "../AdvancedTicketContext.tsx";
import {toast} from "react-hot-toast";
import useAxiosPrivateFormData from "../../../../hooks/useAxiosPrivateFormData.tsx";
import {AxiosResponse} from "axios";
import {uploadFileUtil} from "../../../../utils/upload.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {initialDataAdvancedTicketCreate2} from "../AdvancedTicketTypes.tsx";
import LittleSpinner from "../../../Loader/LittleSpinner.tsx";

const sendUrl = "/ticket/createAdvanced";

const SubmitOrderButton = () => {
    const {data, setData} = useAdvancedTicketContext();
    const myAxiosPrivateFormData = useAxiosPrivateFormData();
    const myAxios = useAxiosPrivate();


    // تبدیل سایز فایل به فرمت خوانا (KB/MB)
    const formatFileSize = (size: number) => {
        const kb = size / 1024;
        return kb < 1024 ? `${kb.toFixed(2)} KB` : `${(kb / 1024).toFixed(2)} MB`;
    };


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

        // Prepare a confirmation message to let the user review the order details
        const shotNames = myData.screenShot.map(file => file?.name).join(", ");
        const confirmMessage = `
    نام مشتری: ${myData.senderUserData}        
------------------------------------------------------------
    عنوان:   ${myData.title}
------------------------------------------------------------
    توضیحات:   ${myData.description}
------------------------------------------------------------
    فایل:  ${myData.files[0]?.name}
    
     - سایز: ${formatFileSize(myData.files[0]?.size)}
------------------------------------------------------------
    اسکرین شات:  ${shotNames}
------------------------------------------------------------
  `;
        if (!confirm(confirmMessage)) return;

        // Temporary arrays to hold uploaded file IDs
        const tempScreenShotUploads: string[] = [];
        const tempFileUpload: string[] = [];

        let loadingId: string;
        let submitLoadingId: string;

        try {
            // Set a flag to indicate the request is in progress
            setData({isSendingRequest: true});
            loadingId = toast.loading("در حال بارگزاری فایل ها...");

            // Upload screenshots in parallel using Promise.all
            const screenshotUploadPromises = myData.screenShot.map(async (shotFile) => {
                try {
                    const response: AxiosResponse<any> | null = await uploadFileUtil(
                        shotFile,
                        "screenShotFromAdvancedTicket",
                        myAxiosPrivateFormData
                    );
                    if (response && response.status === 200 && response.data?.id) {
                        return response.data.id;
                    } else {
                        throw new Error("خطا در بارگزاری شات");
                    }
                } catch (error) {
                    throw new Error("خطا در بارگزاری شات ----2");
                }
            });

            // Wait for all screenshots to upload
            const uploadedScreenShots = await Promise.all(screenshotUploadPromises);
            tempScreenShotUploads.push(...uploadedScreenShots);

            // Upload the main file
            try {
                const mainFile = myData.files[0];
                const response: AxiosResponse<any> | null = await uploadFileUtil(
                    mainFile,
                    "mainFileFromAdvancedTicket",
                    myAxiosPrivateFormData
                );
                if (response && response.status === 200 && response.data?.id) {
                    tempFileUpload.push(response.data.id);
                } else {
                    toast.error("خطا در بارگزاری فایل نهایی");
                    return;
                }
            } catch (error) {
                toast.error("خطا در بارگزاری فایل نهایی----2");
                return;
            }

            toast.dismiss(loadingId);
            console.log(tempScreenShotUploads, tempFileUpload);

            // Prepare data for order submission with the uploaded file IDs
            myData.filesUploadId = tempFileUpload;
            myData.screenShotUploadId = tempScreenShotUploads;
            const payload = {
                title: myData.title,
                description: myData.description,
                filesUploadId: myData.filesUploadId,
                senderUserId: myData.senderUserId,
                screenShotUploadId: myData.screenShotUploadId,
            };

            // Submit the order
            submitLoadingId = toast.loading("در حال ثبت سفارش...");
            const result = await myAxios.post(sendUrl, {myData: payload});
            toast.dismiss(submitLoadingId);

            // Notify user based on response status
            if (result.status === 200) {
                toast.success(result.data?.message || "اطلاعات ثبت شد");
                setData(initialDataAdvancedTicketCreate2);
            } else {
                toast.error(result.data?.message || "اطلاعات ثبت نشد");
            }
        } catch (error) {
            toast.error(error.toString());
            console.error(error);
        } finally {
            // Ensure we turn off the loading state
            toast.dismiss(loadingId)
            toast.dismiss(submitLoadingId)
            setData({isSendingRequest: false});
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
            <button className="btn-submit-mir flex gap-2" onClick={handleSubmit}
                    disabled={data.isSendingRequest}
            ><>
                <div></div>
                {data.isSendingRequest ? <div className="flex gap-2"> در حال ارسال اطلاعات<LittleSpinner/></div>:
                <>تایید و ارسال برای فاکتور</>
                }</>

            </button>
            <button className="btn-gay-mir" onClick={handleReset}
                    disabled={data.isSendingRequest}
            >
                حذف فرم
            </button>
        </div>
    );
};

export default SubmitOrderButton;
