import React, {useState} from 'react';
import {useSubmitBillContext} from "../../submitBillContext";
import Modal from "../../../../Modal/Modal.tsx";

const RowNumber = ({text, Id}) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [newRowNumber, setNewRowNumber] = useState(text)
    const closeModal = () => setIsOpenModal(false);

    const {data, setData} = useSubmitBillContext()
    const invoice = data.invoice

    const setNewOrderItems = () => {

        const currentState = {...data}
        const currentItems = [...data.invoice.InvoiceItems]

    }

    const submitChangeRow = () => {
        
    }


    return (<>
            <>
                {isOpenModal && (
                    <Modal
                        showButtons={false}
                        closeModal={closeModal}
                        title={"شماره ردیف را وارد کنید"}
                    >
                        <div className="div__group__input_select">
                            <input
                                type={"number"}
                                onChange={(e) => setNewRowNumber(e.target.value)}
                                value={newRowNumber}
                            />
                        </div>
                        <div
                            className={"text-center mt-2"}
                        >
                            <button
                                onClick={submitChangeRow}
                                className={"btn-green-mir"}
                            >
                                تایید
                            </button>
                        </div>
                    </Modal>
                )}
            </>
            <div
                onClick={() => setIsOpenModal(true)}
                className={"px-3"}
            >
                {text}
            </div>
        </>
    );
};

export default RowNumber;
