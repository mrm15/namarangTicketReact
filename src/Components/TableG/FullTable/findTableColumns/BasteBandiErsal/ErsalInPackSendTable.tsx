import React, {useState} from 'react';
import Modal from "../../../../Modal/Modal.tsx";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.tsx";
import {makeInvoiceBaseOnHesabfaData} from "../../../../Hesabfa/SubmitBill/functions.tsx";
import {getCurrentDate, randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";

const ErsalInPackSendTable = ({sendStatus, info, setMyData}) => {

    const url = "/hesabfa/changeSentStatus"
    const [textBoxValue, setTextBoxValue] = useState(info?.row?.original?.des || "")

    const [isOpenModal, setIsOpenModal] = useState(false);
    const openModalHandler = () => setIsOpenModal(true)
    const closeModal = () => setIsOpenModal(false)


    const isSent = sendStatus >= 9
    const handleInputChange = (e: { target: { value: any; }; }) => {
        const text = e.target.value
        if (text.length >= 20) {
            return
        }
        setTextBoxValue(text)
    }
    const myAxios = useAxiosPrivate();
    const submitErsalChange = async (status) => {


        const invoice = makeInvoiceBaseOnHesabfaData(info?.row?.original)

        const sentDate = getCurrentDate();
        const result = await myAxios.post(url, {
            invoice,
            ersalDescription: textBoxValue,
            statusNumber: status,
            sentDate,
        })

        if (result.status === 200) {
            setMyData({reload: randomNumberGenerator()})
        }


    }

    return (
        <div>
            {isOpenModal && <Modal
              showButtons={false}
              closeModal={closeModal}
              title={"تغییر وضعیت ارسال"}
                // onSubmit={() => submitErsalChange(1)}
            >
              <>
                <div className="flex flex-col justify-end items-start gap-4">

                  <div className={"div__group__input_select my-5"}>
                    <label htmlFor="">توضیحات ارسال</label>
                    <input
                      type="text"
                      value={textBoxValue}
                      onChange={handleInputChange}
                    />

                  </div>
                </div>
                <div className={"flex gap-1"}>
                  <button className={"btn-submit-mir"} onClick={() => submitErsalChange(9)}>ارسال شده</button>
                  <button className={"btn-submit-mir"} onClick={() => submitErsalChange(8)}>ارسال نشده</button>
                  <button className={"btn-submit-mir"}
                          onClick={closeModal}
                  >بستن
                  </button>
                </div>
              </>
            </Modal>}
            <div className={"flex flex-wrap gap-1 w-32"}>
                <input type="button"
                       onClick={openModalHandler}
                       className={isSent ? " bg-green-700 text-white px-3" : "btn-white-border-mir"}
                       value={isSent ? " ارسال شده" : "ارسال "}
                />
            </div>
        </div>
    );
};

export default ErsalInPackSendTable;
