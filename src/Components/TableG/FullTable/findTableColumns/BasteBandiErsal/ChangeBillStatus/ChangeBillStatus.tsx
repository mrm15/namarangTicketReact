import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.tsx";
import useAuth from "../../../../../../hooks/useAuth.tsx";
import Modal from "../../../../../Modal/Modal.tsx";
import {getCurrentDate, randomNumberGenerator} from "../../../../../../utils/utilsFunction.tsx";
import {makeInvoiceBaseOnHesabfaData} from "../../../../../Hesabfa/SubmitBill/functions.tsx";
import {toast} from "react-toastify";
import {LoaderIcon} from "react-hot-toast";


const ChangeBillStatus = ({info, setMyData}) => {

    const [isSendingRequest, setIsSendingRequest] = useState(false)
    const {auth} = useAuth();
    const canSetTextIntoBillStatus = auth?.userInfo?.roleAccessList?.includes("canSetTextIntoBillStatus")
    const canSetStatusBillToBasteBandi = auth?.userInfo?.roleAccessList?.includes("canSetStatusBillToBasteBandi")
    const canSetStatusBillToTasvieShode = auth?.userInfo?.roleAccessList?.includes("canSetStatusBillToTasvieShode")
    const canSetStatusBillToAmadeErsal = auth?.userInfo?.roleAccessList?.includes("canSetStatusBillToAmadeErsal")
    const canSetStatusBillToErsalShode = auth?.userInfo?.roleAccessList?.includes("canSetStatusBillToErsalShode")


    const stringArray = [
        {title: "بسته بندی", number: "5710", disable: !canSetStatusBillToBasteBandi,},
        {title: "تسویه شده", number: "5711", disable: !canSetStatusBillToTasvieShode,},
        {title: "آماده ارسال", number: "5712", disable: !canSetStatusBillToAmadeErsal,},
        {title: "ارسال شده", number: "5713", disable: !canSetStatusBillToErsalShode,},
    ]


    const lastSN = info?.row?.original?.sn
    const lastDES = info?.row?.original?.des
    const billTitle = info?.row?.original?.ContactTitle
    const phoneNumber = info?.row?.original?.Contact?.Mobile
    const myAxiosP = useAxiosPrivate();
    const [newStatus, setNewStatus] = useState(lastSN)
    const [newDescription, setNewDescription] = useState(lastDES)
    useEffect(() => {
        setNewStatus(info?.row?.original?.sn)
    }, [info?.row?.original?.sn]);

    const handleChangeStatus = async () => {


        const invoice = makeInvoiceBaseOnHesabfaData(info?.row?.original)
        try {
            setIsSendingRequest(true)
            const result = await myAxiosP.post("/hesabfa/changeSentStatus",
                {
                    invoice,
                    statusNumber: newStatus,
                    description: newDescription
                })

            if (result.status === 200) {
                toast.success(result.data.message)
                setMyData({reload: randomNumberGenerator()})
                closeModal()
            }
        } catch (error: any) {
            toast(error?.toString)
        } finally {
            setIsSendingRequest(false)

        }


        // let message = "";
        // if (e.target.checked) {
        //     // message = `تغییر وضعیت  ${orderName} به حالت بسته بندی شده `
        //     // statusNumber = 8;
        //
        // } else {
        //     message = `تغییر وضعیت  ${orderName} به حالت بسته بندی  «نشده» `
        //     statusNumber = 7;
        //     date = "-"
        //     // اینجا حالتیه که چک رو برداشته و اگه دسترسی به حالت قبل برگرداندن داره اجاره داره از اینجا ب بعد ادامه پیدا کنه
        //     // اگه دسترسی نداره همینجا ریترن میکنم
        //     const hasAccessToUnCheckedSendPackages = auth?.userInfo?.roleAccessList?.includes(ROLES.hasAccessToUnCheckedSendPackages[0])
        //     if (!hasAccessToUnCheckedSendPackages) {
        //         toast.dismiss()
        //         toast.error("شما مجوز تغییر سفارش به حالت ارسال نشده را ندارید.")
        //         return;
        //     }
        //
        // }


        // const isConfirm = confirm(message);

        // if (isConfirm) {
        //     const invoice = makeInvoiceBaseOnHesabfaData(info?.row?.original)
        //     const result = await myAxiosP.post("/hesabfa/updatePackStatusTo8",
        //         {
        //             invoice,
        //             date,
        //             statusNumber,
        //         })
        //
        //     if (result.status === 200) {
        //         toast.success(result.data.message)
        //         setMyData({reload: randomNumberGenerator()})
        //     }
        // }

    }

    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => {
        setIsOpenModal(false);
        setNewDescription(lastDES)
        setNewStatus(lastSN)

    }
    const openModal = () => setIsOpenModal(true);

    return (
        <div>
            {isOpenModal && (
                <Modal
                    showButtons={false}
                    closeModal={closeModal}
                    title={"تغییر وضعیت فاکتور"}
                >
                    <div className={"w-96"}>
                        <div>
                            <div className={"badge-bg-blue-text-white w-fit "}>{billTitle}</div>
                            <div className={"w-full text-center font-bold "}>{phoneNumber}</div>
                        </div>
                        <div className="flex flex-col justify-end items-start gap-4">
                            {stringArray.map((row) => {
                                return <button
                                    disabled={row.disable}
                                    className={`disabled:cursor-not-allowed w-3/4 mx-auto border-gray-400 border px-2 py-1  rounded  ${newStatus === row.number ? " bg-green-400 " : " "}`}
                                    key={row.number}
                                    title={row.title}
                                    onClick={() => setNewStatus(row.number)}
                                >
                                    {row.title}
                                </button>
                            })}
                        </div>
                        <div className={"div__group__input_select w-full"}>
                            <label htmlFor="">پیام</label>
                            <input
                                disabled={!canSetTextIntoBillStatus}
                                className={"w-full "}
                                type="text"
                                value={newDescription} // Keep lastDES as part of the state
                                onChange={(e) => {
                                    const newText = e.target.value; // Capture the full value
                                    if (!newText.startsWith(lastDES)) {
                                        // Ensure lastDES remains as the prefix
                                        setNewDescription(lastDES + " " + newText);
                                    } else {
                                        // Update newDescription while keeping lastDES intact
                                        setNewDescription(newText);
                                    }
                                }}
                            />
                        </div>
                        {isSendingRequest ?
                            <div className={"border-gray-400 border-2 p-2  rounded my-2 text-center"}>در حال
                                ارسال...
                            </div>
                            :
                            <div className={"flex justify-between w-full text-center gap-2 my-2"}>
                                <div className={"basis-1/2 px-2 py-2 btn-gay-mir"} onClick={closeModal}>کنسل</div>
                                <div className={"basis-1/2 px-2 py-2 btn-submit-mir"} onClick={handleChangeStatus}>تایید
                                </div>
                            </div>
                        }

                    </div>
                </Modal>
            )}
            <button
                onClick={openModal}
                className={"btn-small-edit"}>
                تغییر وضعیت
            </button>
        </div>
    );
};

export default ChangeBillStatus;