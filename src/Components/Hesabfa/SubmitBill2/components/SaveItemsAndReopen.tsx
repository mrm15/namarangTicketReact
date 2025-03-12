import React, {useState} from 'react';
import {FaSave, FaSortAlphaUp} from "react-icons/fa";
import {useSubmitBillContext} from "../submitBillContext.tsx";
import {deleteBillsFromStorage, getSavedBills, localStorageSaver} from "../localStorageSaver.tsx";
import {toast} from "react-hot-toast";
import {MdHistory} from "react-icons/md";
import Modal from "../../../Modal/Modal.tsx";
import {convertTimestampToPersianDate, getCurrentDate} from "../../../../utils/utilsFunction.tsx";

const SaveItemsAndReopen = () => {


    const [isOpenModal, setIsOpenModal] = useState(false);
    const closeModal = () => setIsOpenModal(false)
    const openModal = () => setIsOpenModal(true)

    const {data, setData} = useSubmitBillContext()
    let tId: string
    const handleBillSave = () => {


        const {
            invoice: {ContactTitle: title, InvoiceItems: invoiceItems},
            // billNumber: billId
        } = data;
        const billId = title
        const saveResult = localStorageSaver({title, billId, invoiceItems})
        toast.dismiss(tId)
        if (saveResult) {
            toast.success(`${title}  ذخیره شد `)
        } else {
            toast.error('ذخیره نشد.')
        }

    }
    const savedItems = getSavedBills()
    const handleRecoverBill = (InvoiceItems: any) => {
        setData({...data, invoice: {...data.invoice, InvoiceItems}});
        closeModal();
    };

    const handleDeleteAllSavedItems = () => {

        if (savedItems.length === 0) {
            return
        }
        const yes = window.confirm('آیا از حذف همه ی فاکتور های ذخیره شده مطمئن هستی؟')
        if (yes) {
            deleteBillsFromStorage()
            closeModal()
        }

    }
    return (
        <>
            <div className={"btn-white-border-mir"}
                 onClick={handleBillSave}
            >
                <FaSave size={16}/>
            </div>
            <div
                title={"بازیابی فاکتورهای ذخیره شده"}
                className={"btn-white-border-mir relative"}
                 onClick={openModal}
            >
                <MdHistory size={16}/>
            </div>
            {isOpenModal && (
                <Modal
                    showButtons={false}
                    closeModal={closeModal}
                    title={" لیست آیتم های ذخیره شده فاکتور"}
                >
                    {savedItems.length===0 && <div className={"bg-red-200 p-4"}>هیچ فاکتور ذخیره شده ای موجود نیست.</div>}
                    {savedItems.length!==0 && <button
                        onClick={handleDeleteAllSavedItems}
                        className={" rounded btn-small-delete"}>
                        حذف همه
                        </button>}
                    <div className={"flex gap-2 w-full  justify-center "}>
                        <table className={"min-w-full divide-y divide-gray-200 border"}>
                            <thead>
                            <tr>
                                <td className={"text-center p-2"}>#</td>
                                <td className={"text-center p-2"}>نام</td>
                                <td className={"text-center p-2"}>تعداد آیتم فاکتور</td>
                                <td className={"text-center p-2"}>زمان</td>
                                <td className={"text-center p-2"}>عملیات</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                savedItems.map((item, index) => {

                                    const savedDate = convertTimestampToPersianDate(item.timeStamp)
                                    return <tr className={"hover:bg-gray-200 border-b-2"}>
                                        <td className={"text-center p-2"}>{index + 1}</td>
                                        <td className={"text-center p-2"}>{item?.title}</td>
                                        <td className={"text-center p-2"}>{item?.invoiceItems?.length} </td>
                                        <td className={"text-center p-2"}>
                                            <div className={"ltr"}>
                                                {savedDate}
                                            </div>
                                        </td>
                                        <td className={"text-center p-2 text-blue-800 cursor-pointer "}
                                            onClick={() => handleRecoverBill(item?.invoiceItems)}
                                        >
                                            بازگرداندن
                                        </td>
                                    </tr>
                                })

                            }

                            </tbody>

                        </table>
                    </div>

                </Modal>
            )}
        </>
    );
};

export default SaveItemsAndReopen;