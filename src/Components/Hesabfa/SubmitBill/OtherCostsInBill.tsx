import React, {useState} from 'react';
import Modal from "../../Modal/Modal.tsx";
import useObjectDataHolder from "../../../hooks/UseObjectDataHolder.tsx";

const OtherCostsInBill = ({setInvoice, invoice}) => {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const [myData, setMyData] = useObjectDataHolder({
        discountModal: false,
        discountValue: "",
        transfer: false,
        transferValue: "",
    })

    const handleOthers = (myObject: { Title: any; Amount?: any; Add?: boolean; }) => {
        let currentOtherItems = [...invoice.Others];
        let didYouFileATitleLikeThat = false


        if (invoice.Others.length === 0) {
            currentOtherItems.push(myObject)
        } else {
            currentOtherItems = currentOtherItems.map(t => {
                let row = {...t}
                if (row.Title === myObject.Title) {
                    row = {...myObject}
                    didYouFileATitleLikeThat = true
                }
                return row
            });

            if (!didYouFileATitleLikeThat) {
                currentOtherItems.push(myObject)

            }
        }


        //اگه مقدار تخفیف یا حمل و نقل رو صفر زده بود که کلا حذفش کن بره
        currentOtherItems = currentOtherItems.filter(row => (+row.Amount !== 0 || row.Amount !== ""))
        setInvoice({Others: currentOtherItems})
        closeModal()

    }
    const submitDiscountHandler = () => {
        const myObject = {
            "Title": "تخفیف",
            "Amount": myData.discountValue,
            "Add": false
        }
        handleOthers(myObject)
    }
    const submitTransferHandler = () => {
        const myObject = {
            "Title": "حمل و نقل",
            "Amount": myData.transferValue,
            "Add": true
        }
        handleOthers(myObject)
    }
    const closeModal = () => {
        setIsOpenModal(false)
    }
    return (
        <>
            {isOpenModal && <Modal
              showButtons={false}
              closeModal={closeModal}
              title={"افزودن"}
                // onSubmit={submitAddGroupKala}
            >

                {myData.discountModal && <div>
                  <div className={'div__group__input_select'}>
                    <label htmlFor="">تخفیف روی فاکتور</label>
                    <input
                      type={'text'}
                      onChange={e => setMyData({discountValue: e.target.value})}
                      value={myData.discountValue}/>
                  </div>

                  <button
                    className={'btn-submit-mir mt-5'}
                    onClick={submitDiscountHandler}> ثبت تخفیف
                  </button>
                </div>}
                {myData.transfer && <div>
                  <div className={'div__group__input_select'}>
                    <label htmlFor="">حمل و نقل روی فاکتور</label>
                    <input
                      type={'text'}
                      onChange={e => setMyData({transferValue: e.target.value})}
                      value={myData.transferValue}/>
                  </div>

                  <button
                    className={'btn-submit-mir mt-5'}
                    onClick={submitTransferHandler}> ثبت حمل و نقل
                  </button>
                </div>}

            </Modal>}
            <div className={'flex flex-wrap gap-2 mt-3'}>
                <button onClick={() => {
                    setMyData({
                        discountModal: true,
                        transfer: false,
                    })
                    setIsOpenModal(true)

                }}
                        className={'btn-submit-mir'}>تخفیف
                </button>
                <button onClick={() => {
                    setMyData({
                        discountModal: false,
                        transfer: true,
                    })
                    setIsOpenModal(true)


                }}
                        className={'btn-submit-mir'}>حمل و نقل
                </button>


            </div>
        </>);
};

export default OtherCostsInBill;
