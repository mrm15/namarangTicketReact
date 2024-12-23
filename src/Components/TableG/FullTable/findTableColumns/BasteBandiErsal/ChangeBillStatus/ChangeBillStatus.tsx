import React, {useState} from 'react';
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.tsx";
import useAuth from "../../../../../../hooks/useAuth.tsx";
import Modal from "../../../../../Modal/Modal.tsx";


const ChangeBillStatus = ({info, setMyData}) => {

    const stringArray = [
        {title: "بسته بندی", number: "5710", disable: false,},
        {title: "تسویه شده", number: "5711", disable: false,},
        {title: "آماده ارسال", number: "5712", disable: true,},
        {title: "ارسال شده", number: "5713", disable: true,},
    ]


    const lastSN = info?.row?.original?.sn
    const lastDES = info?.row?.original?.des
    const {auth} = useAuth();
    const myAxiosP = useAxiosPrivate();
    const [newStatus, setNewStatus] = useState(lastSN)
    const [newDescription, setNewDescription] = useState(lastDES)

    const handleChangeStatus = async (newsn) => {
        const orderName = info?.row?.original?.ContactTitle;
        // let statusNumber: number | string = "";
        // let date = getCurrentDate();

        // confirm(stringObject[newsn])
        return


        //
        // let message = "";
        // if (e.target.checked) {
        //     message = `تغییر وضعیت  ${orderName} به حالت بسته بندی شده `
        //     statusNumber = 8;
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
        //
        //
        // const isConfirm = confirm(message);
        //
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
        //         toast(result.data.message)
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
                    <div className="flex flex-col justify-end items-start gap-4">
                        {stringArray.map((row) => {


                            return <button
                                disabled={row.disable}
                                className={`disabled:cursor-not-allowed w-3/4 mx-auto border-gray-400 border px-2 py-1  rounded  ${newStatus === row.number ? " bg-gray-300 " : " "}`}
                                key={row.number}
                                title={row.title}
                                onClick={() => setNewStatus(row.number)}
                            >
                                {row.title}
                            </button>
                        })}
                    </div>
                    <div className={"div__group__input_select"}>
                        <label htmlFor="">پیام</label>
                        <input
                            type="text"
                            value={newDescription}
                            onChange={e => {
                                const newText = e.target.value
                                setNewDescription(lastDES + "" + newText)
                            }}

                        />
                    </div>

                    <div onClick={handleChangeStatus}>تایید</div>
                    <div onClick={closeModal}>کنسل</div>
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