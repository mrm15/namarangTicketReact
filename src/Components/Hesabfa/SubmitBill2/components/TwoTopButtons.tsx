import React from 'react';
import {formatNumber} from "../../../../utils/utilsFunction.tsx";
import {useSubmitBillContext} from "../submitBillContext.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {ROLES} from "../../../../Pages/ROLES.tsx";
import toast from "react-hot-toast";
import {submitBill} from "../../../../config/api.tsx";
import axios from "axios";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";

interface RetryToastProps {
    message: string;
    onRetry: () => void;
}

const TwoTopButtons = () => {

    const {data, setData} = useSubmitBillContext();
    const invoice = data.invoice
    const {auth} = useAuth()
    const navigateTo = useNavigate()
    const roleAccessList = auth.userInfo?.roleAccessList
    const canSaveFactorAsDraft = roleAccessList.includes(ROLES.saveBillAsDraft[0])
    const canSaveFactorAsDone = roleAccessList.includes(ROLES.saveBillAsDone[0])

    const myAxiosPrivate = useAxiosPrivate()
    const RetryToast: React.FC<RetryToastProps> = ({message, onRetry}) => (
        <div className="flex items-center justify-between p-4 bg-red-600 text-white rounded-md shadow-md">
            <span>{message}</span>
            <button
                onClick={() => {
                    toast.dismiss();
                    onRetry();
                }}
                className="ml-4 bg-white text-red-600 px-3 py-1 rounded-md font-semibold"
            >
                تلاش مجدد
            </button>
        </div>
    );

    const sendFactorForSave = async (newStatus: 0 | 1) => {
        const TIMEOUT_DURATION = 10000; // 10 seconds

        const Date = invoice.Date
        const DueDate = invoice.DueDate
        const customInvoice = {...invoice, Date, DueDate}


        const dataToSendBackEnd = {
            billData: data.billData,
            invoice: {
                ...customInvoice,
                Status: newStatus,
            },
        }


        const sendRequest = async () => {
            const tId: string | undefined = toast.loading("در حال ارسال اطلاعات...");

            // Set up a timeout to cancel the request after TIMEOUT_DURATION
            const timeout = setTimeout(() => {
                toast.dismiss(tId)
                toast.custom(
                    <RetryToast
                        message="درخواست زمان زیادی برد! دوباره تلاش کنید."
                        onRetry={() => sendFactorForSave(newStatus)} // Retry the request on button click
                    />
                );
            }, TIMEOUT_DURATION);

            try {


                const result = await myAxiosPrivate.post(submitBill, dataToSendBackEnd);

                // Clear the timeout if request completes successfully before TIMEOUT_DURATION
                clearTimeout(timeout);
                toast.dismiss(tId);

                if (result.status === 200) {
                    const successMessage = newStatus === 0 ? "فاکتور پیش‌نویس شد." : "فاکتور تأیید شد.";
                    toast.success(result.data.message || successMessage);
                    navigateTo(-1); // Redirect after success
                }
            } catch (error: any) {
                clearTimeout(timeout); // Clear timeout in case of any error
                toast.dismiss(tId);

                if (axios.isCancel(error)) {
                    console.log("Request was canceled:", error.message);
                } else {
                    toast.error("ارسال اطلاعات با خطا مواجه شد.");
                    console.error("Error sending data:", error);
                }
            }
        }

        await sendRequest();
    }


    return (
        <div className={'flex flex-wrap w-52'}>
            <button disabled={true}>

                {canSaveFactorAsDone &&
                    invoice?.Sum && <b>{formatNumber(invoice.Sum)} تومان</b>
                }
            </button>

            {canSaveFactorAsDraft &&
                <button onClick={() => sendFactorForSave(0)} className={'btn-submit-mir mx-1'}>ذخیره</button>}
            {canSaveFactorAsDone &&
                <button onClick={() => sendFactorForSave(1)} className={'btn-green-mir'}>تایید </button>}
        </div>
    );
};

export default TwoTopButtons;