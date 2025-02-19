import React from 'react';
import {useAdvancedTicketContext} from "../AdvancedTicketContext.tsx";
import {toast} from "react-hot-toast";
import useAxiosPrivateFormData from "../../../../hooks/useAxiosPrivateFormData.tsx";
import {AxiosResponse} from "axios";
import {uploadFileUtil} from "../../../../utils/upload.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";

const sendUrl = "/ticket/createAdvanced"
const SubmitOrderButton = () => {
    const {data, setData} = useAdvancedTicketContext()
    const myAxiosPrivateFormData = useAxiosPrivateFormData()
    const myAxios = useAxiosPrivate()

    const handleSubmit = async () => {
        console.log(data);
        const myData = {...data}


        if (!myData.senderUserId) {
            toast.error("لطفا یک مشتری انتخاب کنید.")
            return
        }
        if (!myData.title) {
            toast.error("عنوان را وارد کنید.")
            return
        }
        if (!myData.description) {
            toast.error("عنوان را وارد کنید.")
            return
        }
        if (myData.files.length === 0) {
            toast.error("فایل نهایی را بارگزاری کنید.")
            return
        }
        if (myData.files.length > 1) {
            toast.error("فقط یه فایل به عنوان فایل نهایی قرار دهید.")
            return
        }
        if (myData.screenShot.length === 0) {
            toast.error("اسکرین شات سفارش را بارگزاری کنید.")
            return
        }
        const shotNames = myData.screenShot.map(file => {
            return file?.name + ","
        })

        const yes = confirm(`
          نام مشتری: ${myData.senderUserData}        
------------------------------------------------------------------------  
        عنوان:   ${myData?.title}
------------------------------------------------------------------------
        توضیحات:   ${myData?.description}
------------------------------------------------------------------------

        فایل:  ${myData.files[0]?.name}
        سایز:  ${myData.files[0]?.size}
------------------------------------------------------------------------

        اسکرین شات:  ${shotNames}
------------------------------------------------------------------------
        `)
        if (!yes) return;
        const tempScreenShotUploads = []
        const tempFileUpload = []
        let tId;
        try {
            setData({isSendingRequest: true})
            // بریم واسه آپلود فایل ها
            // در این مرحله میریم واسه آپلود فایل ها
            tId = toast.loading("در حال بارگزاری فایل ها...")
            for (const myFile of myData.screenShot) {
                try {
                    const responseOfRequest: AxiosResponse<any> | null = await uploadFileUtil(myFile, "screenShotFromAdvancedTicket", myAxiosPrivateFormData);
                    if (responseOfRequest && responseOfRequest.status === 200) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                        const fileId: string | undefined = responseOfRequest?.data?.id;
                        if (fileId) {
                            tempScreenShotUploads.push(fileId);
                        } else {
                            toast(" شناسه اسکرین شات تعریف نشده")
                            return;
                        }
                    } else {
                        toast(" خطا در بارگزاری شات")
                        return;
                    }
                } catch (error) {
                    toast(" خطا در بارگزاری شات ----2")
                    return;
                }
            }
            try {
                const singleMainFile = myData.files[0]
                const responseOfRequest: AxiosResponse<any> | null = await uploadFileUtil(singleMainFile, "mainFileFromAdvancedTicket", myAxiosPrivateFormData);
                if (responseOfRequest && responseOfRequest.status === 200) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                    const fileId: string | undefined = responseOfRequest?.data?.id;
                    if (fileId) {
                        tempFileUpload.push(fileId);
                    } else {
                        toast(" شناسه فایل نهایی تعریف نشده")
                        return;
                    }
                } else {
                    toast(" خطا در بارگزاری فایل نهایی")
                    return;
                }
            } catch (error) {
                toast(" خطا در بارگزاری فایل نهایی----2")
                return;
            }

            toast.dismiss(tId)
            console.log(tempScreenShotUploads)
            console.log(tempFileUpload)

            // بعدش آیدی رو میگیرم میزاریم توی متغیر و سایر اطلاعات رو میفرستیم سمت بک ااند
            const tIdSubmitOrder = toast.loading("در حال ثبت سفارش...")
            myData.filesUploadId = tempFileUpload;
            myData.screenShotUploadId = tempScreenShotUploads;
            const result = await myAxios.post(sendUrl, myData);
            toast.dismiss(tIdSubmitOrder)
            if (result.status === 200) {
                toast.success(result?.data?.message || "اطلاعات ثبت شد")
            } else {
                toast.error(result?.data?.message || "اطلاعات ثبت نشد")
            }
        } catch (error) {
            toast.error(error.toString())
            console.log(error)
        }


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