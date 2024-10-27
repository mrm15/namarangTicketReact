import React, {useContext, useState} from 'react';
import {TableGContext} from "../../../TableG/TableGContext.tsx";
import Modal from "../../../Modal/Modal.tsx";

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


    return (
        <>
            {isOpenModal && (
                <Modal
                    showButtons={false}
                    closeModal={closeModal}
                    title={"خواندن همه ی پیام ها"}
                >
                    <div>
                        آیا مطمئنی که میخوای همه ی پیام ها رو به وضعیت
                        &nbsp;
                        <b> «خوانده شده»</b>
                        &nbsp;
                        تغییر بدی؟
                    </div>
                    <div className={"flex gap-2 w-full  justify-center mt-10"}>
                        <button className={"btn-green-mir"}>
                            آره
                            👍🏿
                        </button>
                        <button className={"btn-red-border-mir"}>
نه نه نه                            🙅🏿‍♀️
                        </button>
                    </div>

                </Modal>
            )}
            <button className={"btn-white-border-mir"}

                    onClick={openModal}

            >
                خواندن همه
            </button>
        </>
    );
};

export default MarkAsReadTicketAssignments;
