import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import "./myStyle.scss"
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {submitBill} from "../../../config/api.tsx";
import axios from "axios"; // Import axios to use axios.isCancel

import {
    formatNumber,
    timestampToFormattedDateToSendHesabfa,
    timestampToTimeFromHesabfa
} from "../../../utils/utilsFunction.tsx";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";


const ShowProductListForSelect = ({productList, onSelect, invoice, billData}) => {

    const {auth} = useAuth()
    const navigateTo = useNavigate()
    const roleAccessList = auth.userInfo?.roleAccessList
    const canSaveFactorAsDraft = roleAccessList.includes(ROLES.saveBillAsDraft[0])
    const canSaveFactorAsDone = roleAccessList.includes(ROLES.saveBillAsDone[0])

    const [myOptions, setMyOptions] = useState([]);
    useEffect(() => {
        const temp = productList.map((row: any) => {
            const label = row.Description + " " + row.Name + " " + row.ItemCode + " ";
            const value = row.Id;
            return {value, label, ...row};
        });
        setMyOptions(temp)
    }, [productList])

    const myAxiosPrivate = useAxiosPrivate()


    interface RetryToastProps {
        message: string;
        onRetry: () => void;
    }

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


    // Refactored function
    const sendFactorForSave1 = async (newStatus: 0 | 1) => {

        const Date = invoice.Date
        const DueDate = invoice.DueDate
        const customInvoice = {...invoice, Date, DueDate};

        // Define data payload
        const data = {
            billData,
            invoice: {
                ...customInvoice,
                Status: newStatus,
            },
        };

        let tId: string | undefined; // Type for toast ID
        try {
            // Show loading toast
            tId = toast.loading("در حال ارسال اطلاعات...");

            // Send data to the API
            const result = await myAxiosPrivate.post(submitBill, data);

            // Dismiss loading toast
            toast.dismiss(tId);

            // Check response status and show success message
            if (result.status === 200) {
                const successMessage = newStatus === 0 ? "فاکتور پیش‌نویس شد." : "فاکتور تأیید شد.";
                toast.success(result.data.message || successMessage);
                navigateTo(-1); // Redirect after success
            }
        } catch (error) {
            // Dismiss loading toast and show error toast
            toast.dismiss(tId);
            toast.error("ارسال اطلاعات با خطا مواجه شد.");
            console.error("Error sending data:", error);
        }
    };
    const ToastMessage = () => {
        const [timer, setTimer] = useState(0);
        setTimeout(() => setTimer(timer + 1), 1000)
        return (<div
            className="flex items-center justify-between p-4 bg-white rounded shadow-md">
            {timer}
            &nbsp;
            &nbsp;
            ثانیه

            در حال ارسال اطلاعات...
        </div>)
    }


    const sendFactorForSave = async (newStatus: 0 | 1) => {
        const TIMEOUT_DURATION = 3000; // 10 seconds

        const Date = invoice.Date;
        const DueDate = invoice.DueDate;
        const customInvoice = {...invoice, Date, DueDate};
        const data = {
            billData,
            invoice: {
                ...customInvoice,
                Status: newStatus,
            },
        };

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
                const result = await myAxiosPrivate.post(submitBill, data);

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
        };

        await sendRequest();
    };


    try {
        return (
            <div className={'w-full flex flex-wrap justify-between'}>
                <div className="min-w-640">
                    <label htmlFor={"name"}>نام کالا</label>
                    <Select
                        onChange={onSelect}
                        options={myOptions}
                        placeholder={'انتخاب کالا'}
                        className="z__index2"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={true}
                        isRtl={true}
                        // styles={customStyles}
                        isSearchable={true}


                    />
                </div>
                <div className={''}>
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

            </div>
        )

    } catch (error) {
        return (
            <div>
                {error.toString()}
            </div>
        );
    }
};

export default ShowProductListForSelect;
