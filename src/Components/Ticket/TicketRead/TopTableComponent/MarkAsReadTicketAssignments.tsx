import React, {useContext, useState} from 'react';
import {TableGContext} from "../../../TableG/TableGContext.tsx";
import Modal from "../../../Modal/Modal.tsx";
import toast from 'react-hot-toast';
import {showErrorToast, showLoadingToast, showSimpleToast, updateToast} from "../../../../utils/toastUtils.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {nanoid} from "@reduxjs/toolkit";
import useChangeTicketReadStatus from "../../../../hooks/useChangeTicketReadStatus.tsx";

const MarkAsReadTicketAssignments = () => {
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    // myData.tableData
    // myData.checkedItems
    // console.log(myData.columns)
    console.log(myData.checkedItems)


    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false)
    const openModal = () => setIsOpenModal(true)

    const checkIsThereAnyDataAndOpenModal = () => {
        if (myData.checkedItems.length === 0) {
            showErrorToast('حداقل یه پیام رو انتخاب کن.')
            return
        }
        openModal()
    }

    const myAxios = useAxiosPrivate();
    const changeReadStatus = useChangeTicketReadStatus()
    const ticketAssignmentIdsArray = myData.checkedItems.map(row => row.ticketAssignedId)
    const sendReadMessage = async () => {
        let toastId: any;
        try {
            toastId = toast.loading("در حال تغییر وضعیت پیام‌ها...")
            const resultMessage = await changeReadStatus({
                ticketType: "assignment",
                idArray: ticketAssignmentIdsArray,
                newStatus: true
            })
            debugger
            if (resultMessage) {
                updateToast(toastId, "خوانده شده تغییر یافت", true);
                closeModal();
                setMyData({reload: nanoid(3)});
            }else {
                updateToast(toastId, "عملیات شکست خورد", false);
            }
        } catch (error) {
            updateToast(toastId, "عملیات شکست خورد", false);
        }
    };
    return (
        <>
            {isOpenModal && (
                <Modal
                    showButtons={false}
                    closeModal={closeModal}
                    title={"خواندن همه ی پیام ها"}
                >
                    <div>
                        آیا مطمئنی که میخوای پیام های انتخابی رو به حالت
                        &nbsp;
                        <b> «خوانده شده»</b>
                        &nbsp;
                        تغییر بدی؟
                    </div>
                    <div className={"flex gap-2 w-full  justify-center mt-10"}>
                        <button
                            onClick={sendReadMessage}
                            className={"btn-green-mir"}>
                            آره
                            👍🏿
                        </button>
                        <button
                            onClick={closeModal}
                            className={"btn-red-border-mir"}>
                            نه نه نه 🙅🏿‍♀️
                        </button>
                    </div>

                </Modal>
            )}
            <button className={"btn-white-border-mir"}
                    onClick={checkIsThereAnyDataAndOpenModal}
            >خواندن
            </button>
        </>
    );
};

export default MarkAsReadTicketAssignments;
