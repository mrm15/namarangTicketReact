import React, {useContext, useEffect, useState} from 'react';
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.tsx";
import useAuth from "../../../../../../hooks/useAuth.tsx";
import Modal from "../../../../../Modal/Modal.tsx";
import {randomNumberGenerator} from "../../../../../../utils/utilsFunction.tsx";
import {makeInvoiceBaseOnHesabfaData} from "../../../../../Hesabfa/SubmitBill/functions.tsx";
import {toast} from "react-toastify";
import ShowContactBedBes from "../ShowContactBedBes.tsx";
import {TableGContext} from "../../../../TableGContext.tsx";
import {billStatusText} from "../../../../../CONSTANTS/billStatusText.tsx";

const textListArray = [
    {id: 1, text: " بار بری وطن",},
    {id: 2, text: " باربری شاهین",},
    {id: 3, text: " باربری پیام شمس",},
    {id: 4, text: " باربری زاهدان بار",},
    {id: 5, text: " باربری جهان بار",},
    {id: 6, text: " باربری سعادت ",},
    {id: 7, text: " باربری پیک ترابر",},
    {id: 8, text: " باربری حبیبی",},
    {id: 9, text: " اتوبوس ",},
    {id: 10, text: " هوایی ",},
]

const ChangeBillStatusGroup = ({info=undefined}) => {


    const context = useContext(TableGContext);
    const {myData, setMyData} = context;

    const billsArray = myData?.checkedItems;


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


    // const lastSN = info?.row?.original?.sn
    // const lastDES = info?.row?.original?.des
    // const billTitle = info?.row?.original?.ContactTitle
    // const city = info?.row?.original?.Contact?.city ?? "";
    // const customerName = info?.row?.original?.Contact?.Name ?? "";
    // const nameFamilyNameCity = `${customerName} ${city}`;

    // const phoneNumber = info?.row?.original?.Contact?.Mobile
    const myAxiosP = useAxiosPrivate();
    const [newStatus, setNewStatus] = useState("")
    const [newDescription, setNewDescription] = useState("")
    // useEffect(() => {
    //     setNewStatus(info?.row?.original?.sn)
    // }, [info?.row?.original?.sn]);

    // useEffect(() => {
    //     setNewDescription(info?.row?.original?.des)
    // }, [info?.row?.original?.des]);

    const handleChangeStatus = async () => {
        if (!billsArray || billsArray.length === 0) {
            toast.info("هیچ فاکتوری برای ارسال وجود ندارد.");
            return;
        }

        const toastId = toast.loading("شروع پردازش فاکتورها...");

        try {
            setIsSendingRequest(true);

            for (const [index, bill] of billsArray.entries()) {
                const invoice = makeInvoiceBaseOnHesabfaData(bill);

                try {
                    // Send the request for the current invoice
                    const result = await myAxiosP.post("/hesabfa/changeSentStatus", {
                        invoice,
                        statusNumber: newStatus,
                        description: bill.des,
                    });

                    if (result.status === 200) {
                        // Update the toast for success
                        toast.update(toastId, {
                            render: `فاکتور ${index + 1} (${bill?.ContactTitle || "نامشخص"}) با موفقیت تغییر یافت.`,
                            type: "success",
                            isLoading: false,
                            autoClose: 3000,
                        });
                    }
                } catch (error: any) {
                    // Update the toast for error
                    toast.update(toastId, {
                        render: `خطا در تغییر وضعیت فاکتور ${index + 1} (${bill?.id || "نامشخص"}): ${error?.message || error.toString()}`,
                        type: "error",
                        isLoading: false,
                        autoClose: 3000,
                    });
                }
            }

            // Final success message after processing all invoices
            toast.update(toastId, {
                render: "پردازش همه فاکتورها به پایان رسید.",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            // Refresh data or state after processing
            setMyData({ reload: randomNumberGenerator() });
            closeModal();
        } catch (globalError: any) {
            // Update the toast for global error
            toast.update(toastId, {
                render: `خطای کلی: ${globalError?.message || globalError.toString()}`,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setIsSendingRequest(false);
        }
    };

    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => {
        setIsOpenModal(false);
        setNewDescription("")
        setNewStatus("")

    }
    const openModal = () => setIsOpenModal(true);
    const isMobile=  window.innerWidth <= 768
    const classNameOfModal = isMobile ? "w-full" : "w-96"

    return (
        <div>
            {isOpenModal && (
                <Modal
                    showButtons={false}
                    closeModal={closeModal}
                    title={"تغییر وضعیت فاکتور"}
                >
                    <div className={classNameOfModal}>
                        <div>
                            {/*<div className={"border-blue-500 border rounded py-2 w-full text-center"}>{billTitle}</div>*/}
                            {/*<div className={"w-full text-center font-bold flex  justify-center"}> {nameFamilyNameCity} &nbsp; {phoneNumber} &nbsp; <ShowContactBedBes info={info}/></div>*/}

                        </div>
                        <div className="flex flex-wrap justify-end items-start ">
                            {stringArray.map((row) => {
                                return <button
                                    disabled={row.disable}
                                    className={`disabled:cursor-not-allowed w-1/5 mx-auto border-gray-400 border px-2 py-1  rounded  ${newStatus === row.number ? " bg-green-400 " : " "}`}
                                    key={row.number}
                                    title={row.title}
                                    onClick={() => setNewStatus(row.number)}
                                >
                                    {row.title}
                                </button>
                            })}
                        </div>

                        <div
                            className={"w-full flex flex-wrap my-2"}
                        >
                            {canSetTextIntoBillStatus &&
                                textListArray.map(row => <div
                                    className={"w-1/5  border border- whitespace-nowrap p-1 fontSize10 cursor-pointer"}
                                    onClick={() => setNewDescription(row.text)}
                                    key={row.id}>{row.text}</div>)}
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
                                    setNewDescription(newText);
                                    // if (!newText.startsWith(lastDES)) {
                                    //     // Ensure lastDES remains as the prefix
                                    //     setNewDescription(lastDES + " " + newText);
                                    // } else {
                                    //     // Update newDescription while keeping lastDES intact
                                    //     setNewDescription(newText);
                                    // }
                                }}
                            />
                            <div className={"absolute left-2 top-3 text-red-700 cursor-pointer p-1"} onClick={()=>setNewDescription("")}>&#xd7;</div>
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
                    <div className={"h-32 overflow-y-scroll"}>
                        {billsArray.map((row,index)=>{

                            return <div key={row.Id}>
                                <ul className={"flex justify-between fontSize10 " + `${index%2===0 ? "bg-gray-200" : " "}`}>
                                    <li className={" w-4 border-gray-400 px-1 border-l "}>{index+1}</li>
                                    <li className={" w-24 border-gray-400 px-1 border-l "}>{row.ContactTitle}</li>
                                    <li className={" w-24 border-gray-400 px-1 border-l "}>{row.Number}</li>
                                    <li className={" w-24 px-1"}>{billStatusText[row.sn]}</li>
                                </ul>
                            </div>
                        })}
                    </div>
                </Modal>
            )}
            <button
                onClick={openModal}
                className={"bg-blue-500 text-white  py-1 px-3 text-xs border border-blue-600 rounded hover:cursor-pointer hover:bg-blue-700"}>
                تغییر وضعیت
            </button>
        </div>
    );
};

export default ChangeBillStatusGroup;